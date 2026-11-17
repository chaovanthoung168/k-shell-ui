import { completeInput, createSession, displayPath, runCommand, type Session, type ShellTheme } from "../playground/shell";

type DemoCommand = { command: string; completePrefix?: string; exampleOutput?: string };
export type DemoFeature = { name: string; description: string; docs: string; sourceOnly?: boolean; setup?: string[]; commands: DemoCommand[] };

export const DEMO_FEATURES: DemoFeature[] = [
  { name: "Smart completion", description: "Complete commands and paths with Tab, then keep moving.", docs: "shortcuts", commands: [{ command: "cat src\\main.rs", completePrefix: "cat sr" }] },
  { name: "Familiar commands", description: "Navigate your folders and explore a project with Linux-style commands.", docs: "commands", commands: [{ command: "pwd" }, { command: "ls" }, { command: "tree -L 2" }] },
  { name: "File tools", description: "Write a file, read it back, and keep your work in the same shell.", docs: "commands", commands: [{ command: 'write notes.txt "Hello from K Shell"' }, { command: "cat notes.txt" }] },
  { name: "Syntax highlighting", description: "Read known commands and quoted text at a glance.", docs: "shortcuts", commands: [{ command: 'echo "Hello, Windows"' }] },
  { name: "Command history", description: "Keep previous commands within reach with persistent history.", docs: "shortcuts", setup: ["pwd", "ls", "tree -L 2"], commands: [{ command: "history 3" }] },
  { name: "Personal themes", description: "Choose your palette, icons, and suggestion style.", docs: "customization", commands: [{ command: "theme midnight" }, { command: "theme suggestions underline" }] },
  { name: "KPM developer tools", description: "Install and switch managed developer tools in the updated source build.", docs: "package-manager", sourceOnly: true, commands: [{ command: "kpm list", exampleOutput: "node     Node.js\npython   Python\ngo       Go\nrust     Rust\nphp      PHP\ngit      Git\njava     Java\n\nkpm install <tool>   Choose a version\nkpm use <tool>       Switch installed versions" }] },
  { name: "kreq HTTP client", description: "Send API requests and inspect formatted JSON in the updated source build.", docs: "http-client", sourceOnly: true, commands: [{ command: "kreq get 'https://api.example.com/users/1' --json content", exampleOutput: 'StatusCode : 200 OK\nContent    : {\n  "active": true,\n  "id": 1,\n  "name": "John"\n}' }] },
];

export type ResolvedDemoCommand = DemoCommand & { output: string; path: string; palette: ShellTheme; completion?: string };

// Built-in examples use the existing browser engine. Source-only tools use
// labelled illustrations and never execute a process, installation or request.
export function resolveDemoFeature(feature: DemoFeature): ResolvedDemoCommand[] {
  let session: Session = { ...createSession(), icons: "off" };
  for (const command of feature.setup ?? []) session = runCommand(session, command);
  return feature.commands.map(step => {
    const completion = step.completePrefix ? completeInput(session, step.completePrefix).input : undefined;
    if (completion && (!step.command.startsWith(completion) || completion === step.completePrefix)) throw new Error(`Invalid demo completion: ${step.command}`);
    if (step.exampleOutput !== undefined) return { ...step, output: step.exampleOutput, path: displayPath(session.cwd), palette: session.theme, completion };
    session = runCommand(session, step.command);
    const entry = session.entries.at(-1);
    if (entry?.error) throw new Error(`Invalid demo command: ${step.command}: ${entry.output}`);
    return { ...step, output: entry?.output ?? "", path: displayPath(session.cwd), palette: session.theme, completion };
  });
}
