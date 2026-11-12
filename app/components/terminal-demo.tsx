"use client";
import { useState } from "react";
import { Icon, Logo } from "./ui";
const examples = {
  Completion: { command: "ls", lines: ["  src/       tests/       Cargo.toml", "  README.md  Cargo.lock  LICENSE"] },
  History: { command: "history 3", lines: ["  1  cargo build", "  2  theme ocean", "  3  ls"] },
  Themes: { command: "theme ocean", lines: ["  Theme set to Ocean.", "  A little more you. A little more blue."] },
};
type Mode = keyof typeof examples;
export function TerminalDemo() {
  const [mode, setMode] = useState<Mode>("Completion"); const [input, setInput] = useState(""); const [response, setResponse] = useState<string[] | null>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [theme, setTheme] = useState("ocean");
  function run() {
    const command = input.trim(); if (!command) return; setLastCommand(command);
    if (command === "clear") { setResponse([]); setInput(""); return; }
    if (command.startsWith("echo ")) setResponse([command.slice(5).replace(/^["']|["']$/g, "")]);
    else if (command === "cargo build --release") setResponse(["Demo: release build complete.", "Run cargo in K Shell to build your own project."]);
    else if (command === "ls") setResponse(examples.Completion.lines);
    else if (command === "pwd") setResponse(["C:\\Users\\you\\projects\\k-shell"]);
    else if (command === "help") setResponse(["Try: ls, pwd, echo hello, history, clear", "Or: theme ocean, theme dusk, theme midnight"]);
    else if (command.startsWith("history")) setResponse(examples.History.lines);
    else if (["theme ocean", "theme dusk", "theme midnight"].includes(command)) { setTheme(command.split(" ")[1]); setResponse([`Theme set to ${command.split(" ")[1]}.`]); }
    else setResponse(["This is a browser preview. Try help for demo commands."]);
    setInput("");
  }
  return <div className={`terminal-window theme-${theme}`}><div className="terminal-titlebar"><div className="window-dots" aria-hidden="true"><i/><i/><i/></div><span><Logo/> K Shell</span><span className="terminal-platform">Windows</span></div><div className="terminal-body"><div className="terminal-welcome"><Logo/><div><strong>Welcome to K Shell.</strong><span>A fresh prompt. Endless possibilities.</span></div></div><div className="terminal-path"><Icon name="terminal"/> ~\projects\k-shell <span>main</span></div><div className="terminal-command"><span className="prompt">›</span> {lastCommand ?? examples[mode].command}</div><div className="terminal-output">{(response ?? examples[mode].lines).map((line,i)=><div key={i}>{line}</div>)}</div><div className="terminal-path second-path"><Icon name="terminal"/> ~\projects\k-shell <span>main</span></div><form className="terminal-input-line" onSubmit={e=>{e.preventDefault();run();}}><span className="prompt">›</span><div className="terminal-input-wrap"><input aria-label="Try a demo shell command" autoComplete="off" spellCheck={false} value={input} placeholder={mode === "Completion" ? "cargo bu" : "help"} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if (e.key === "Tab" && (input.startsWith("cargo b") || (!input && mode === "Completion"))) {e.preventDefault();setInput("cargo build --release");} if(e.key === "ArrowUp"){e.preventDefault();setInput("ls");}}}/>{!input && mode === "Completion" && <span className="ghost-completion" aria-hidden="true">ild --release</span>}</div><button aria-label="Run demo command" title="Run demo command">↵</button></form><div className="terminal-tip">{mode === "Completion" ? <>Press <kbd>Tab</kbd> to complete. Stay in the flow.</> : mode === "History" ? <>Press <kbd>↑</kbd> to recall a command.</> : <>Try <code>theme dusk</code> to change this preview.</>}</div></div><div className="terminal-tabs" role="tablist" aria-label="Terminal preview"><span className="demo-label">Interactive preview</span>{(Object.keys(examples) as Mode[]).map(tab=><button key={tab} role="tab" aria-selected={mode===tab} onClick={()=>{setMode(tab);setLastCommand(null);setResponse(null);setInput("");}}>{tab}</button>)}</div></div>;
}
