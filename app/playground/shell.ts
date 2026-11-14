export type ShellTheme = "ocean" | "dusk" | "midnight";
export type IconMode = "unicode" | "nerd" | "off";
export type SuggestionStyle = "soft" | "bold" | "underline";
type Node = { kind: "directory" } | { kind: "file"; content: string };
export type TranscriptEntry = { id: number; path: string; command: string; output: string; error: boolean; stdin?: boolean };
export type Session = { cwd: string; files: Record<string, Node>; theme: ShellTheme; icons: IconMode; suggestions: SuggestionStyle; history: string[]; entries: TranscriptEntry[]; nextId: number; closed: boolean; lastStatus: number; stdin: boolean; catTail: string };

const ROOT = "C:/Playground";
const HOME = `${ROOT}/k-shell`;
export const COMMANDS = ["append", "cat", "cd", "clear", "copy", "cp", "create", "delete", "echo", "exit", "help", "history", "ls", "mkdir", "move", "mv", "open", "pwd", "rename", "rm", "specs", "sysinfo", "theme", "touch", "tree", "update", "write"];
export const THEMES: ShellTheme[] = ["ocean", "dusk", "midnight"];
const ICONS: IconMode[] = ["unicode", "nerd", "off"];
const SUGGESTIONS: SuggestionStyle[] = ["soft", "bold", "underline"];
const USAGE: Record<string, string> = Object.assign(Object.create(null), {
  help: "help [command]                         List commands or show command usage",
  ls: "ls [-al] [--] [path ...]                List files; -a includes hidden files",
  pwd: "pwd                                    Show the current folder",
  cd: "cd [directory]                         Change folder; cd ~ returns to the project",
  tree: "tree [-ad] [-L depth] [--] [directory]  Show a folder tree",
  cat: "cat [--] [file ...]                     Read files; no file or - reads typed input",
  echo: "echo [text ...]                        Print literal text",
  mkdir: "mkdir [-p] [--] directory ...           Create folders; -p creates parents",
  touch: "touch [--] file ...                    Create files without replacing content",
  create: "create [--] file ...                   Create new files; never overwrite",
  write: "write [--] file text ...               Create or replace text; adds a newline",
  append: "append [--] file text ...              Append text; adds a newline",
  cp: "cp / copy [-r] [--] source destination Copy without overwriting; -r for folders",
  mv: "mv / move [--] source destination      Move without overwriting",
  rename: "rename / update [--] source new-name   Rename in the same folder",
  rm: "rm / delete [-rf] [--] path ...        Delete; -r for folders, -f ignores missing",
  open: "open [--] file                         Preview a sample file in this terminal",
  sysinfo: "sysinfo / specs                        Show browser-workspace information",
  history: "history [count]                       Show numbered history; 0 shows none",
  theme: "theme [ocean|dusk|midnight|reset]\n  theme icons unicode|nerd|off\n  theme suggestions soft|bold|underline",
  clear: "clear                                  Clear output without deleting files or history",
  exit: "exit [0-255]                           End this session; Reset starts another",
});
const ALIASES: Record<string, string> = Object.assign(Object.create(null), { copy: "cp", move: "mv", delete: "rm", update: "rename", specs: "sysinfo" });

class CommandError extends Error {
  status: number;
  constructor(message: string, status = 1) { super(message); this.status = status; }
}
function usage(name: string): never { throw new CommandError(`Usage: ${USAGE[ALIASES[name] ?? name]}`, 2); }
export function displayPath(path: string) { return path.replaceAll("/", "\\"); }
const leaf = (path: string) => path.slice(path.lastIndexOf("/") + 1);
const parent = (path: string) => path.slice(0, path.lastIndexOf("/"));
const within = (path: string, folder: string) => path.toLowerCase() === folder.toLowerCase() || path.toLowerCase().startsWith(`${folder.toLowerCase()}/`);
const bytes = (text: string) => new TextEncoder().encode(text).length;

export function createSession(): Session {
  return {
    cwd: HOME, theme: "ocean", icons: "unicode", suggestions: "soft", history: [], entries: [], nextId: 0, closed: false, lastStatus: 0, stdin: false, catTail: "",
    files: {
      [ROOT]: { kind: "directory" }, [HOME]: { kind: "directory" }, [`${HOME}/src`]: { kind: "directory" },
      [`${HOME}/src/main.rs`]: { kind: "file", content: 'fn main() {\n    println!("Hello from K Shell!");\n}\n' },
      [`${HOME}/README.md`]: { kind: "file", content: "K Shell browser workspace\n\nTry tree, create a folder, copy a file, or write a note.\nUse help to list commands and help cp for command usage.\n\nThese are temporary sample files, not your computer's files.\n" },
      [`${HOME}/Cargo.toml`]: { kind: "file", content: '[package]\nname = "hello-kshell"\nversion = "0.1.0"\nedition = "2024"\n' },
    },
  };
}

// Quotes group literal text. Backslashes remain Windows path separators, not escapes.
function words(input: string): string[] {
  const tokens: string[] = [];
  let token = "", quote = "", started = false;
  for (const character of input) {
    if (quote) {
      if (character === quote) quote = ""; else token += character;
      started = true;
    } else if (character === '"' || character === "'") { quote = character; started = true; }
    else if (/\s/.test(character)) {
      if (started) tokens.push(token);
      token = ""; started = false;
    } else {
      if ("|<>;&".includes(character)) throw new CommandError("Run one command at a time. K Shell does not support pipes or shell redirection yet; use write or append for file output.", 2);
      token += character; started = true;
    }
  }
  if (quote) throw new CommandError(`Close the ${quote} quote before running your command.`, 2);
  if (started) tokens.push(token);
  return tokens;
}

function options(args: string[], allowed: string, name: string) {
  const flags = new Set<string>(), paths: string[] = [];
  let parsing = true;
  for (const arg of args) {
    if (parsing && arg === "--") { parsing = false; continue; }
    if (parsing && arg.startsWith("-") && arg !== "-") {
      for (const flag of arg.slice(1)) {
        if (!allowed.includes(flag)) throw new CommandError(`${name}: unsupported option ${arg}. Try help ${name}.`, 2);
        flags.add(flag);
      }
    } else {
      if (!arg) throw new CommandError(`${name}: paths must not be empty.`);
      paths.push(arg);
    }
  }
  return { flags, paths };
}

function resolvePath(session: Session, input: string): string {
  if (!input) throw new CommandError("Path must not be empty.");
  const path = input.replaceAll("\\", "/");
  if (path.startsWith("//") || (/^[a-z]:/i.test(path) && !/^[a-z]:\//i.test(path))) throw new CommandError("Use an absolute workspace path such as C:\\Playground\\k-shell.");
  const absolute = path === "~" ? HOME : path.startsWith("~/") ? `${HOME}/${path.slice(2)}` : /^[a-z]:/i.test(path) ? path : path.startsWith("/") ? `${ROOT}/${path.slice(1)}` : `${session.cwd}/${path}`;
  const parts: string[] = [];
  for (const part of absolute.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      if (parts.length <= 2) throw new CommandError("You are at the edge of the sample workspace. Use cd ~ to return to your project.");
      parts.pop();
    } else {
      if (parts.length && (/[<>:"|?*\x00-\x1f]/.test(part) || /[. ]$/.test(part) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part))) throw new CommandError(`Invalid Windows filename: ${part}`);
      parts.push(part);
    }
  }
  const normalized = parts.join("/");
  if (!within(normalized, ROOT)) throw new CommandError("Only paths inside C:\\Playground are available here.");
  let canonical = ROOT;
  for (const part of parts.slice(2)) {
    const candidate = `${canonical}/${part}`;
    canonical = Object.keys(session.files).find((key) => key.toLowerCase() === candidate.toLowerCase()) ?? candidate;
  }
  return canonical;
}

function nodeAt(session: Session, path: string): Node {
  const node = session.files[path];
  if (!node) throw new CommandError(`File or folder not found: ${displayPath(path)}`);
  return node;
}
function directory(session: Session, path: string) {
  if (nodeAt(session, path).kind !== "directory") throw new CommandError(`Not a folder: ${displayPath(path)}`);
}
function children(session: Session, path: string) {
  return Object.keys(session.files).filter((key) => key.startsWith(`${path}/`) && !key.slice(path.length + 1).includes("/"))
    .sort((a, b) => Number(session.files[b].kind === "directory") - Number(session.files[a].kind === "directory") || a.localeCompare(b));
}
function protect(session: Session, path: string) {
  if (path === ROOT || path === HOME || within(session.cwd, path)) throw new CommandError("Cannot delete, move, or rename the workspace root, project home, current folder, or its ancestors.");
}
function decoration(session: Session, path: string): string {
  if (session.icons === "off") return "";
  const node = session.files[path];
  if (session.icons === "unicode") return node.kind === "directory" ? "▸ " : "· ";
  return node.kind === "directory" ? "[dir] " : `[${leaf(path).split(".").at(-1) === leaf(path) ? "file" : leaf(path).split(".").at(-1)}] `;
}
function readable(session: Session, operand: string) {
  const path = resolvePath(session, operand), node = nodeAt(session, path);
  if (node.kind !== "file") throw new CommandError(`${operand} is a folder. Try ls instead.`);
  return node.content;
}
function addEntry(session: Session, entry: Omit<TranscriptEntry, "id">) {
  return { ...session, nextId: session.nextId + 1, entries: [...session.entries, { ...entry, id: session.nextId }].slice(-80) };
}

export function finishInput(session: Session): Session {
  if (!session.stdin) return session;
  const next = { ...session, stdin: false, catTail: "", lastStatus: 0 };
  return session.catTail ? addEntry(next, { path: session.cwd, command: "", output: session.catTail.replace(/\n$/, ""), error: false, stdin: true }) : next;
}

function renderTree(session: Session, args: string[]) {
  let all = false, onlyDirectories = false, depth = 150, operand = ".", hasPath = false, parsing = true;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (parsing && arg === "--") { parsing = false; continue; }
    if (parsing && arg.startsWith("-") && arg !== "-") {
      for (let position = 1; position < arg.length; position++) {
        const flag = arg[position];
        if (flag === "a") all = true;
        else if (flag === "d") onlyDirectories = true;
        else if (flag === "L") {
          const value = arg.slice(position + 1) || args[++index];
          if (!value || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < 1) throw new CommandError("tree -L expects a positive integer, for example tree -L 2.", 2);
          depth = Math.min(Number(value), 150); break;
        } else usage("tree");
      }
    } else { if (hasPath || !arg) usage("tree"); operand = arg; hasPath = true; }
  }
  const root = resolvePath(session, operand);
  directory(session, root);
  const lines = [leaf(root)];
  let folders = 0, files = 0;
  function visit(path: string, prefix: string, level: number) {
    if (level >= depth) return;
    const items = children(session, path).filter((key) => (all || !leaf(key).startsWith(".")) && (!onlyDirectories || session.files[key].kind === "directory"));
    items.forEach((item, index) => {
      const last = index === items.length - 1, isDirectory = session.files[item].kind === "directory";
      lines.push(`${prefix}${last ? "└── " : "├── "}${decoration(session, item)}${leaf(item)}`);
      if (isDirectory) { folders++; visit(item, `${prefix}${last ? "    " : "│   "}`, level + 1); } else files++;
    });
  }
  visit(root, "", 0);
  return `${lines.join("\n")}\n\n${folders} ${folders === 1 ? "directory" : "directories"}${onlyDirectories ? "" : `, ${files} ${files === 1 ? "file" : "files"}`}`;
}

function fileOperation(session: Session, name: string, args: string[]) {
  const { flags, paths } = options(args, name === "rm" ? "rf" : name === "cp" ? "r" : "", name);
  if (name === "create") {
    if (!paths.length) usage(name);
    for (const operand of paths) {
      if (/[\\/]$/.test(operand)) throw new CommandError("create expects a filename, not a trailing folder separator.");
      const path = resolvePath(session, operand);
      directory(session, parent(path));
      if (session.files[path]) throw new CommandError(`Already exists: ${operand}. create never overwrites files.`);
      session.files[path] = { kind: "file", content: "" };
    }
    return;
  }
  if (name === "rm") {
    if (!paths.length) usage(name);
    const remove = new Set<string>();
    for (const operand of paths) {
      const path = resolvePath(session, operand);
      protect(session, path);
      const node = session.files[path];
      if (!node && flags.has("f")) continue;
      if (!node) throw new CommandError(`File or folder not found: ${operand}`);
      if (node.kind === "directory" && !flags.has("r")) throw new CommandError(`${operand} is a folder. Use rm -r to delete it.`);
      Object.keys(session.files).filter((key) => within(key, path)).forEach((key) => remove.add(key));
    }
    remove.forEach((path) => { delete session.files[path]; });
    return;
  }
  if (paths.length !== 2) usage(name);
  const source = resolvePath(session, paths[0]), node = nodeAt(session, source);
  if (name !== "cp") protect(session, source);
  if (name === "cp" && node.kind === "directory" && !flags.has("r")) throw new CommandError("Copying a folder requires cp -r.");
  if (name === "rename" && (/[\\/]/.test(paths[1]) || paths[1] === "." || paths[1] === ".." || paths[1].includes(":"))) throw new CommandError("The new name must be one filename. Use mv to change folders.");
  let target = name === "rename" ? resolvePath(session, `${parent(source)}/${paths[1]}`) : resolvePath(session, paths[1]);
  if (name !== "rename" && session.files[target]?.kind === "directory") target = resolvePath(session, `${target}/${leaf(source)}`);
  directory(session, parent(target));
  if (session.files[target]) throw new CommandError(`Destination already exists: ${displayPath(target)}. Nothing was overwritten.`);
  if (within(target, source)) throw new CommandError("The destination cannot be inside the source folder.");
  const entries = Object.entries(session.files).filter(([path]) => within(path, source));
  for (const [path, value] of entries) session.files[target + path.slice(source.length)] = { ...value };
  if (name !== "cp") entries.forEach(([path]) => { delete session.files[path]; });
}

export function runCommand(previous: Session, raw: string): Session {
  if (previous.closed) return previous;
  if (previous.stdin) {
    if (raw.length > 1000) return addEntry(previous, { path: previous.cwd, command: "", output: "Keep input lines under 1,000 characters.", error: true, stdin: true });
    return addEntry(previous, { path: previous.cwd, command: "", output: raw + "\n", error: false, stdin: true });
  }
  const command = raw.trim();
  if (!command) return previous;
  const session: Session = { ...previous, files: { ...previous.files }, history: [...previous.history, command].slice(-200), entries: [...previous.entries], lastStatus: 0 };
  let output = "", error = false;
  try {
    if (command.length > 1000) throw new CommandError("Keep playground commands under 1,000 characters.");
    const [typedName, ...args] = words(command);
    const name = ALIASES[typedName] ?? typedName;
    if (args.length === 1 && ["-h", "--help"].includes(args[0]) && name !== "echo") {
      if (!USAGE[name]) throw new CommandError(`Command not found: ${typedName}`, 127);
      output = USAGE[name];
    } else switch (name) {
      case "help":
        if (args.length > 1) usage(name);
        if (args.length) {
          output = USAGE[ALIASES[args[0]] ?? args[0]];
          if (!output) throw new CommandError(`No built-in command named ${args[0]}. Type help to list commands.`);
        } else output = `K Shell browser workspace\n\n${Object.values(USAGE).join("\n")}\n\nAll 27 built-in command names are available in this workspace.\nopen previews sample files; sysinfo/specs report this sandbox, not Windows hardware.\nNerd icons use browser-safe text labels. cat accepts typed input (Ctrl D finishes).\nGit, npm, Python, SSH and other external programs require the installed shell.\nPipes, shell redirection, variables and scripting are not implemented in K Shell.`;
        break;
      case "pwd": if (args.length) usage(name); output = displayPath(session.cwd); break;
      case "cd": {
        if (args.length > 1 || args[0]?.startsWith("-")) usage(name);
        const path = resolvePath(session, args[0] ?? "~");
        directory(session, path); session.cwd = path; break;
      }
      case "ls": {
        const { flags, paths } = options(args, "al", name);
        const labels = (path: string, label = leaf(path)) => {
          const node = nodeAt(session, path);
          return flags.has("l") ? `${node.kind === "directory" ? "dir " : "file"}  ${label}${node.kind === "file" ? `  (${bytes(node.content)} bytes)` : ""}` : `${decoration(session, path)}${label}`;
        };
        output = (paths.length ? paths : ["."]).map((operand) => {
          const path = resolvePath(session, operand), node = nodeAt(session, path);
          const names = node.kind === "file" ? [labels(path)] : [
            ...(flags.has("a") ? [labels(path, "."), labels(path === ROOT ? ROOT : parent(path), "..")] : []),
            ...children(session, path).filter((key) => flags.has("a") || !leaf(key).startsWith(".")).map((key) => labels(key)),
          ];
          return `${paths.length > 1 ? `${operand}:\n` : ""}${names.join("\n") || "(empty folder)"}`;
        }).join("\n\n");
        break;
      }
      case "cat": {
        const { paths } = options(args, "", name);
        const operands = paths.length ? paths : ["-"];
        const contents = operands.map((path) => path === "-" ? null : readable(session, path));
        const inputAt = contents.indexOf(null);
        if (inputAt >= 0) {
          session.stdin = true;
          session.catTail = contents.slice(inputAt + 1).filter((value) => value !== null).join("");
          output = contents.slice(0, inputAt).join("") + "Reading typed input. Ctrl D finishes; Ctrl C cancels.";
        } else output = contents.join("").replace(/\n$/, "");
        break;
      }
      case "echo": output = args.join(" "); break;
      case "tree": output = renderTree(session, args); break;
      case "mkdir": {
        const { flags, paths } = options(args, "p", name);
        if (!paths.length) usage(name);
        for (const operand of paths) {
          const path = resolvePath(session, operand);
          if (session.files[path]) {
            if (flags.has("p") && session.files[path].kind === "directory") continue;
            throw new CommandError(`Already exists: ${operand}`);
          }
          const parts = path.split("/");
          for (let index = 2; index < parts.length; index++) {
            const folder = parts.slice(0, index + 1).join("/");
            if (session.files[folder]) directory(session, folder);
            else if (flags.has("p") || index === parts.length - 1) session.files[folder] = { kind: "directory" };
            else throw new CommandError("The parent folder does not exist. Use mkdir -p.");
          }
        }
        break;
      }
      case "touch": {
        const { paths } = options(args, "", name);
        if (!paths.length) usage(name);
        for (const operand of paths) {
          const path = resolvePath(session, operand);
          directory(session, parent(path));
          const existing = session.files[path];
          if (existing?.kind === "directory") throw new CommandError(`${operand} is a folder.`);
          session.files[path] = { kind: "file", content: existing?.content ?? "" };
        }
        break;
      }
      case "write": case "append": {
        const values = args[0] === "--" ? args.slice(1) : args;
        if (values.length < 2 || !values[0] || (args[0] !== "--" && values[0].startsWith("-"))) usage(name);
        const path = resolvePath(session, values[0]);
        directory(session, parent(path));
        const existing = session.files[path];
        if (existing?.kind === "directory") throw new CommandError(`${values[0]} is a folder.`);
        const text = values.slice(1).join(" ") + "\n";
        const content = (name === "append" ? existing?.content ?? "" : "") + text;
        if (bytes(content) > 64000) throw new CommandError("This sample file is full (64 KB limit). Write a smaller file or reset the session.");
        session.files[path] = { kind: "file", content };
        break;
      }
      case "create": case "rm": case "cp": case "mv": case "rename": fileOperation(session, name, args); break;
      case "open": {
        const { paths } = options(args, "", name);
        if (paths.length !== 1) usage(name);
        if (/\.(exe|com|cmd|bat)$/i.test(paths[0])) throw new CommandError("open previews documents, not executable files.");
        output = `Browser file preview: ${paths[0]}\n\n${readable(session, paths[0]).replace(/\n$/, "")}`;
        break;
      }
      case "sysinfo": {
        if (args.length) usage(name);
        const nodes = Object.values(session.files);
        output = `Environment   Browser sandbox\nWorkspace     ${displayPath(ROOT)}\nCurrent path  ${displayPath(session.cwd)}\nFiles         ${nodes.filter((node) => node.kind === "file").length}\nFolders       ${nodes.filter((node) => node.kind === "directory").length}\nStored text   ${nodes.reduce((sum, node) => sum + (node.kind === "file" ? bytes(node.content) : 0), 0)} bytes\n\nWindows user, CPU, GPU, RAM and disks are not exposed to this browser workspace.\nRun sysinfo in the installed K Shell to inspect your computer.`;
        break;
      }
      case "history": {
        if (args.length > 1 || (args[0] !== undefined && (!/^\d+$/.test(args[0]) || !Number.isSafeInteger(Number(args[0]))))) usage(name);
        const count = Math.min(Number(args[0] ?? session.history.length), session.history.length);
        output = (count ? session.history.slice(-count) : []).map((item, index) => `${session.history.length - count + index + 1}  ${item}`).join("\n");
        break;
      }
      case "theme":
        if (!args.length) { /* Report the current appearance below. */ }
        else if (args.length === 1 && args[0] === "reset") { session.theme = "ocean"; session.icons = "unicode"; session.suggestions = "soft"; }
        else if (args.length === 1 && THEMES.includes(args[0] as ShellTheme)) session.theme = args[0] as ShellTheme;
        else if (args.length === 2 && args[0] === "icons" && ICONS.includes(args[1] as IconMode)) session.icons = args[1] as IconMode;
        else if (args.length === 2 && args[0] === "suggestions" && SUGGESTIONS.includes(args[1] as SuggestionStyle)) session.suggestions = args[1] as SuggestionStyle;
        else usage(name);
        output = `Theme: ${session.theme}\nIcons: ${session.icons}\nSuggestions: ${session.suggestions}${session.icons === "nerd" ? "\nNerd mode uses browser-safe text labels for file types." : ""}`;
        break;
      case "clear":
        if (args.length) usage(name);
        return { ...session, entries: [], nextId: previous.nextId + 1 };
      case "exit":
        if (args.length > 1 || (args[0] !== undefined && (!/^\d+$/.test(args[0]) || Number(args[0]) > 255))) usage(name);
        session.lastStatus = args[0] === undefined ? previous.lastStatus : Number(args[0]);
        session.closed = true;
        output = `Session ended with status ${session.lastStatus}. Use Reset to start a new session.`;
        break;
      default: throw new CommandError(COMMANDS.includes(typedName) ? "Command is unavailable." : `Command not found: ${typedName}. Type help to list built-ins. External programs such as Git, npm, Python and SSH require the installed shell.`, 127);
    }
    const nodes = Object.values(session.files);
    if (nodes.length > 150 || nodes.reduce((sum, node) => sum + (node.kind === "file" ? bytes(node.content) : 0), 0) > 1000000) throw new CommandError("The sample workspace is full (150 entries / 1 MB). Reset the session to start fresh.");
  } catch (caught) {
    Object.assign(session, { files: previous.files, cwd: previous.cwd, theme: previous.theme, icons: previous.icons, suggestions: previous.suggestions, closed: previous.closed, stdin: previous.stdin, catTail: previous.catTail });
    output = caught instanceof Error ? caught.message : "Could not run that command. Try help.";
    session.lastStatus = caught instanceof CommandError ? caught.status : 1;
    error = true;
  }
  return addEntry(session, { path: previous.cwd, command, output, error });
}

export function completeInput(session: Session, input: string, candidateIndex?: number): { input: string; candidates: string[] } {
  if (!input.trim() || session.closed || session.stdin) return { input, candidates: [] };
  let start = 0, quote = "";
  for (let index = 0; index < input.length; index++) {
    const character = input[index];
    if (quote) { if (character === quote) quote = ""; }
    else if (character === '"' || character === "'") quote = character;
    else if (/\s/.test(character)) start = index + 1;
  }
  const raw = input.slice(start), partial = raw.replace(/^["']/, "").replace(/["']$/, "");
  let candidates: string[] = [];
  try {
    const prefix = words(input.slice(0, start));
    const name = ALIASES[prefix[0]] ?? prefix[0];
    if (!start || name === "help") candidates = COMMANDS.filter((name) => name.startsWith(partial));
    else if (name === "theme") {
      const choices = prefix.length === 1 ? [...THEMES, "icons", "suggestions", "reset"] : prefix[1] === "icons" ? ICONS : prefix[1] === "suggestions" ? SUGGESTIONS : [];
      candidates = choices.filter((name) => name.startsWith(partial));
    } else if (name === "echo" || ["history", "pwd", "clear", "exit", "sysinfo"].includes(name) || (["write", "append"].includes(name) && prefix.filter((word, index) => index === 0 || word !== "--").length > 1)) return { input, candidates: [] };
    else {
      const slash = Math.max(partial.lastIndexOf("/"), partial.lastIndexOf("\\"));
      const folder = partial.slice(0, slash + 1), namePart = partial.slice(slash + 1).toLowerCase();
      const path = resolvePath(session, folder || ".");
      candidates = children(session, path).filter((item) => leaf(item).toLowerCase().startsWith(namePart) && (name !== "cd" || session.files[item].kind === "directory"))
        .map((item) => folder + leaf(item) + (session.files[item].kind === "directory" ? "\\" : ""));
    }
  } catch { return { input, candidates: [] }; }
  if (!candidates.length) return { input, candidates };
  const common = candidateIndex === undefined ? candidates.reduce((value, candidate) => {
    let length = 0;
    while (length < value.length && value[length].toLowerCase() === candidate[length]?.toLowerCase()) length++;
    return value.slice(0, length);
  }) : candidates[candidateIndex % candidates.length];
  if (common.length < partial.length) return { input, candidates };
  const needsQuotes = /\s/.test(common) || raw.startsWith('"') || raw.startsWith("'");
  const result = needsQuotes ? `"${common}"` : common;
  return { input: input.slice(0, start) + result + ((candidates.length === 1 || candidateIndex !== undefined) && !common.endsWith("\\") ? " " : ""), candidates };
}

export function suggestInput(session: Session, input: string): string {
  if (!input || session.closed || session.stdin) return "";
  const remembered = [...session.history].reverse().find((command) => command.startsWith(input) && command.length > input.length);
  if (remembered) return remembered;
  const completion = completeInput(session, input);
  const candidate = completion.input.trimEnd();
  return candidate.startsWith(input) && candidate.length > input.length ? candidate : "";
}
