import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const compile = source => ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const moduleUrl = (source, name) => `data:text/javascript;base64,${Buffer.from(`${source}\n//# sourceURL=${name}`).toString("base64")}`;
const shellUrl = moduleUrl(compile(await readFile(new URL("../playground/shell.ts", import.meta.url), "utf8")), "shell.ts");
const demoSource = compile(await readFile(new URL("./terminal-demo-data.ts", import.meta.url), "utf8")).replace('"../playground/shell"', JSON.stringify(shellUrl));
const { DEMO_FEATURES, resolveDemoFeature } = await import(moduleUrl(demoSource, "terminal-demo-data.ts"));

test("every built-in feature example executes in an isolated sample workspace", () => {
  for (const feature of DEMO_FEATURES.filter(feature => !feature.sourceOnly)) {
    const steps = resolveDemoFeature(feature);
    assert.equal(steps.length, feature.commands.length);
    assert.ok(steps.every(step => !step.exampleOutput), feature.name);
    assert.deepEqual(resolveDemoFeature(feature), steps, "replays must be deterministic and isolated");
  }
});

test("completion, file writes, history and palette examples demonstrate real behavior", () => {
  const scene = name => resolveDemoFeature(DEMO_FEATURES.find(feature => feature.name === name));
  assert.equal(scene("Smart completion")[0].completion, "cat src\\");
  assert.match(scene("Smart completion")[0].output, /fn main/);
  assert.equal(scene("File tools").at(-1).output.trim(), "Hello from K Shell");
  assert.match(scene("Command history")[0].output, /tree -L 2/);
  assert.equal(scene("Personal themes")[0].palette, "midnight");
});

test("source-only tool demonstrations use explicitly labelled fixtures", () => {
  for (const name of ["KPM developer tools", "kreq HTTP client"]) {
    const feature = DEMO_FEATURES.find(feature => feature.name === name);
    assert.equal(feature.sourceOnly, true);
    assert.ok(feature.commands.every(command => typeof command.exampleOutput === "string"));
    assert.ok(resolveDemoFeature(feature).every(command => command.output));
  }
});
