import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Use the project's TypeScript compiler so tests also run on Node versions
// without built-in TypeScript support. No generated files are written.
const source = await readFile(new URL("./shell.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { COMMANDS, completeInput, createSession, finishInput, runCommand, suggestInput } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const output = (session) => session.entries.at(-1)?.output;
const failed = (session) => session.entries.at(-1)?.error;

test("quoted arguments preserve spaces, empty strings, and literal Windows backslashes", () => {
  let session = runCommand(createSession(), String.raw`echo "C:\Users\you" "" 'hello world'`);
  assert.equal(output(session), String.raw`C:\Users\you  hello world`);
  session = runCommand(session, 'echo "unfinished');
  assert.equal(failed(session), true);
  assert.match(output(session), /Close the/);
});

test("file commands share a mutable workspace without mutating prior sessions", () => {
  const initial = createSession();
  let session = runCommand(initial, 'mkdir -p "my notes/drafts"');
  session = runCommand(session, 'write "my notes/drafts/hello.txt" "first line"');
  session = runCommand(session, 'append "my notes/drafts/hello.txt" "second line"');
  session = runCommand(session, 'touch "my notes/drafts/hello.txt"');
  session = runCommand(session, 'cat "my notes/drafts/hello.txt"');
  assert.equal(output(session), "first line\nsecond line");
  assert.equal(initial.files["C:/Playground/k-shell/my notes"], undefined);
  assert.equal(failed(runCommand(session, "write src forbidden")), true);
  assert.equal(failed(runCommand(session, "write missing/child.txt text")), true);
});

test("navigation updates pwd, supports Windows paths, and stays in the virtual workspace", () => {
  let session = runCommand(createSession(), "cd src");
  session = runCommand(session, "pwd");
  assert.equal(output(session), "C:\\Playground\\k-shell\\src");
  session = runCommand(session, String.raw`cd C:\Playground\K-SHELL`);
  assert.equal(session.cwd, "C:/Playground/k-shell");
  session = runCommand(session, "cd ..");
  session = runCommand(session, "cd ..");
  assert.equal(failed(session), true);
  assert.equal(session.cwd, "C:/Playground");
  session = runCommand(session, String.raw`cd C:\Windows`);
  assert.equal(failed(session), true);
  session = runCommand(session, "cd ~");
  assert.equal(session.cwd, "C:/Playground/k-shell");
});

test("tree respects depth and listing flags do not hide files unexpectedly", () => {
  const session = createSession();
  assert.match(output(runCommand(session, "tree -L 2")), /main\.rs/);
  assert.doesNotMatch(output(runCommand(session, "tree -L 1")), /main\.rs/);
  assert.match(output(runCommand(session, "ls -la")), /dir   src/);
  assert.match(output(runCommand(session, "ls -la")), /file  README\.md/);
  assert.equal(failed(runCommand(session, "tree -L 0")), true);
});

test("history includes the current command and clear only clears the transcript", () => {
  let session = runCommand(createSession(), "echo one");
  session = runCommand(session, "write note.txt saved");
  session = runCommand(session, "history 2");
  assert.equal(output(session), "2  write note.txt saved\n3  history 2");
  session = runCommand(session, "clear");
  assert.equal(session.entries.length, 0);
  assert.equal(session.history.at(-1), "clear");
  session = runCommand(session, "cat note.txt");
  assert.equal(output(session), "saved");
  assert.equal(createSession().files["C:/Playground/k-shell/note.txt"], undefined);
});

test("theme changes validate choices and reset restores Ocean", () => {
  let session = runCommand(createSession(), "theme dusk");
  assert.equal(session.theme, "dusk");
  session = runCommand(session, "theme invalid");
  assert.equal(failed(session), true);
  assert.equal(session.theme, "dusk");
  assert.equal(createSession().theme, "ocean");
});

test("Tab completion handles commands, ambiguous matches, folders, and quoted paths", () => {
  let session = createSession();
  assert.equal(completeInput(session, "he").input, "help ");
  assert.deepEqual(completeInput(session, "t").candidates.sort(), ["theme", "touch", "tree"]);
  assert.equal(completeInput(session, "cat RE").input, "cat README.md ");
  assert.equal(completeInput(session, "cd s").input, "cd src\\");
  assert.equal(completeInput(session, "theme du").input, "theme dusk ");
  session = runCommand(session, 'mkdir "my notes"');
  assert.equal(completeInput(session, 'cd "my n').input, 'cd "my notes\\"');
});

test("external commands and operators are rejected while quoted text stays literal", () => {
  const session = createSession();
  assert.equal(failed(runCommand(session, "npm run dev")), true);
  assert.match(output(runCommand(session, "echo hello | cat")), /one command at a time/);
  assert.equal(output(runCommand(session, 'echo "<script>alert(1)</script>"')), "<script>alert(1)</script>");
});

test("the workspace and transcript remain bounded; failed writes are atomic", () => {
  let session = createSession();
  for (let index = 0; index < 160; index++) session = runCommand(session, `touch file-${index}.txt`);
  assert.equal(Object.keys(session.files).length, 150);
  assert.equal(failed(session), true);
  assert.equal(session.entries.length, 80);
  assert.equal(session.files["C:/Playground/k-shell/file-159.txt"], undefined);
});

const builtinExamples = {
  append: "append source.txt extra", cat: "cat source.txt", cd: "cd folder", clear: "clear",
  copy: "copy source.txt copy.txt", cp: "cp source.txt copy.txt", create: "create fresh.txt",
  delete: "delete source.txt", echo: "echo hello", exit: "exit 0", help: "help", history: "history",
  ls: "ls", mkdir: "mkdir fresh", move: "move source.txt moved.txt", mv: "mv source.txt moved.txt",
  open: "open source.txt", pwd: "pwd", rename: "rename source.txt renamed.txt", rm: "rm source.txt",
  specs: "specs", sysinfo: "sysinfo", theme: "theme midnight", touch: "touch fresh.txt",
  tree: "tree", update: "update source.txt renamed.txt", write: "write source.txt replacement",
};

test("the browser registry covers all 27 K Shell built-in names", () => {
  assert.equal(COMMANDS.length, 27);
  assert.deepEqual([...COMMANDS].sort(), Object.keys(builtinExamples).sort());
});

for (const [name, command] of Object.entries(builtinExamples)) {
  test(`built-in ${name} has a working browser implementation`, () => {
    let session = runCommand(createSession(), "write source.txt original");
    session = runCommand(session, "mkdir folder");
    session = runCommand(session, command);
    assert.equal(failed(session) ?? false, false, output(session));
    assert.equal(session.lastStatus, 0);
  });
}

test("copy, move, rename and their aliases preserve complete folder contents", () => {
  let session = runCommand(createSession(), "mkdir -p original/empty original/nested destination");
  session = runCommand(session, 'write original/nested/note.txt "retained text"');
  session = runCommand(session, "copy -r original duplicate");
  session = runCommand(session, "move duplicate destination");
  session = runCommand(session, "update destination/duplicate renamed");
  session = runCommand(session, "cat destination/renamed/nested/note.txt");
  assert.equal(output(session), "retained text");
  assert.equal(session.files["C:/Playground/k-shell/destination/renamed/empty"].kind, "directory");
  assert.equal(session.files["C:/Playground/k-shell/duplicate"], undefined);
  assert.equal(session.files["C:/Playground/k-shell/original/nested/note.txt"].content, "retained text\n");
});

test("copy and move never overwrite and reject copying into the source subtree", () => {
  let session = runCommand(createSession(), "write first.txt first");
  session = runCommand(session, "write second.txt second");
  for (const command of ["cp first.txt second.txt", "mv first.txt second.txt", "rename first.txt second.txt", "cp -r src src/nested"]) {
    const result = runCommand(session, command);
    assert.equal(failed(result), true, command);
    assert.deepEqual(result.files, session.files);
  }
});

test("recursive deletion, force and multiple paths operate atomically inside the sandbox", () => {
  let session = runCommand(createSession(), "mkdir -p remove/nested");
  session = runCommand(session, "create remove/nested/a.txt keep.txt");
  assert.equal(failed(runCommand(session, "rm remove")), true);
  assert.equal(failed(runCommand(session, "rm keep.txt missing.txt")), true);
  assert.ok(session.files["C:/Playground/k-shell/keep.txt"]);
  session = runCommand(session, "delete -rf remove missing.txt");
  assert.equal(failed(session), false);
  assert.equal(session.files["C:/Playground/k-shell/remove/nested/a.txt"], undefined);
  for (const command of ["rm -rf /", "rm -rf .", "mv . /moved", "rename . moved"]) assert.equal(failed(runCommand(session, command)), true, command);
});

test("create refuses existing files and preflights all operands", () => {
  const initial = createSession();
  const result = runCommand(initial, "create temporary.txt README.md");
  assert.equal(failed(result), true);
  assert.deepEqual(result.files, initial.files);
  const created = runCommand(initial, "create -- -first.txt -second.txt");
  assert.equal(output(runCommand(created, "cat -- -first.txt -second.txt")), "");
});

test("case-insensitive parents, Unicode names and end-of-options work across file commands", () => {
  let session = runCommand(createSession(), 'mkdir "My Folder" "ឯកសារ"');
  session = runCommand(session, 'write "MY FOLDER/Note.txt" "hello"');
  session = runCommand(session, 'cp "my folder/NOTE.TXT" "ឯកសារ"');
  assert.equal(output(runCommand(session, 'cat "ឯកសារ/note.txt"')), "hello");
  session = runCommand(session, "mkdir -- -folder");
  assert.equal(failed(runCommand(session, "rm -r -- -folder")), false);
  for (const command of ["touch CON", "write bad:stream text", String.raw`cd C:relative`, 'create "trailing. "']) assert.equal(failed(runCommand(session, command)), true, command);
});

test("tree supports combined flags, hidden files, directory-only traversal and attached depths", () => {
  let session = runCommand(createSession(), "mkdir -p .hidden/inside visible/child");
  session = runCommand(session, "create .secret visible/child/file.txt");
  assert.doesNotMatch(output(runCommand(session, "tree")), /\.secret|\.hidden/);
  assert.match(output(runCommand(session, "tree -aL2")), /\.secret/);
  const folders = output(runCommand(session, "tree -adL2"));
  assert.match(folders, /inside/);
  assert.doesNotMatch(folders, /file\.txt|Cargo\.toml/);
  assert.doesNotMatch(output(runCommand(session, "tree -dL1")), /child/);
});

test("cat reads multiple files and supports a standard-input phase without executing its text", () => {
  let session = runCommand(createSession(), "write first.txt first");
  session = runCommand(session, "write last.txt last");
  assert.equal(output(runCommand(session, "cat first.txt last.txt")), "first\nlast");
  session = runCommand(session, "cat first.txt - last.txt");
  assert.equal(session.stdin, true);
  const history = [...session.history];
  session = runCommand(session, "rm -rf src");
  assert.equal(session.entries.at(-1).stdin, true);
  assert.ok(session.files["C:/Playground/k-shell/src"]);
  assert.deepEqual(session.history, history);
  session = runCommand(session, "");
  session = finishInput(session);
  assert.equal(session.stdin, false);
  assert.equal(output(session), "last");
  assert.equal(output(runCommand(session, "echo back")), "back");
});

test("theme icon and suggestion settings change independently and reset together", () => {
  let session = runCommand(createSession(), "theme icons off");
  assert.equal(session.icons, "off");
  assert.doesNotMatch(output(runCommand(session, "ls")), /▸/);
  session = runCommand(session, "theme icons nerd");
  assert.match(output(runCommand(session, "ls")), /\[dir\]/);
  session = runCommand(session, "theme suggestions underline");
  assert.equal(session.suggestions, "underline");
  session = runCommand(session, "theme dusk");
  assert.equal(session.icons, "nerd");
  const invalid = runCommand(session, "theme icons missing");
  assert.equal(failed(invalid), true);
  assert.equal(invalid.icons, "nerd");
  session = runCommand(session, "theme reset");
  assert.deepEqual([session.theme, session.icons, session.suggestions], ["ocean", "unicode", "soft"]);
});

test("completion covers nested theme settings, aliases, text arguments and cycling", () => {
  const session = createSession();
  assert.equal(completeInput(session, "theme icons un").input, "theme icons unicode ");
  assert.equal(completeInput(session, "theme suggestions bo").input, "theme suggestions bold ");
  assert.equal(completeInput(session, "copy RE").input, "copy README.md ");
  assert.equal(completeInput(session, "write notes.txt RE").input, "write notes.txt RE");
  assert.equal(completeInput(session, "t", 0).input, "theme ");
  assert.equal(completeInput(session, "t", 1).input, "touch ");
  const remembered = runCommand(session, "echo remembered");
  assert.equal(suggestInput(remembered, "echo rem"), "echo remembered");
});

test("exit closes the session, preserves the last status and reset reopens it", () => {
  let session = runCommand(createSession(), "not-a-command");
  session = runCommand(session, "exit");
  assert.equal(session.closed, true);
  assert.equal(session.lastStatus, 127);
  assert.equal(runCommand(session, "ls"), session);
  assert.equal(createSession().closed, false);
  assert.equal(runCommand(createSession(), "exit 42").lastStatus, 42);
  for (const command of ["exit -1", "exit 256", "exit anything"]) assert.equal(failed(runCommand(createSession(), command)), true);
});

test("system info and file opening describe real sandbox data rather than fabricated native results", () => {
  const session = createSession();
  assert.match(output(runCommand(session, "sysinfo")), /Browser sandbox/);
  assert.match(output(runCommand(session, "specs")), /Files\s+3/);
  assert.match(output(runCommand(session, "open README.md")), /Browser file preview/);
  assert.equal(failed(runCommand(session, "open src")), true);
  assert.equal(failed(runCommand(session, "help __proto__")), true);
  assert.equal(typeof output(runCommand(session, "help constructor")), "string");
  assert.equal(output(runCommand(session, "history 0")), "");
});
