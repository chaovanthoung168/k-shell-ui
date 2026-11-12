"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon, Logo } from "./ui";

const examples = {
  Completion: { command: "ls", lines: ["  src/       tests/       Cargo.toml", "  README.md  Cargo.lock  LICENSE"] },
  History: { command: "history 3", lines: ["  1  cargo build", "  2  theme ocean", "  3  ls"] },
  Themes: { command: "theme ocean", lines: ["  Theme set to Ocean.", "  Your shell. Your favorite colors."] },
};
type Mode = keyof typeof examples;

const sequence: { mode: Mode; command: string; lines: string[] }[] = [
  { mode: "Completion", command: "cargo build --release", lines: ["  Demo: compiling your next big idea…", "  Finished. Ready for what comes next."] },
  { mode: "History", ...examples.History },
  { mode: "Themes", ...examples.Themes },
];

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function TerminalDemo() {
  const [mode, setMode] = useState<Mode>("Completion");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string[] | null>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [theme, setTheme] = useState("ocean");
  const [autoPlay, setAutoPlay] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const playing = autoPlay && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    let tick = 0;
    let scene = 0;
    const timer = window.setInterval(() => {
      const current = sequence[scene];
      tick += 1;
      if (tick <= 9) return;
      const length = tick - 9;
      if (length <= current.command.length) {
        setInput(current.command.slice(0, length));
      } else if (length === current.command.length + 7) {
        setLastCommand(current.command);
        setMode(current.mode);
        setResponse(current.lines);
        setInput("");
      } else if (length > current.command.length + 35) {
        tick = 0;
        scene = (scene + 1) % sequence.length;
      }
    }, 85);
    return () => window.clearInterval(timer);
  }, [playing]);

  function run() {
    setAutoPlay(false);
    const command = input.trim();
    if (!command) return;
    setLastCommand(command);
    if (command === "clear") setResponse([]);
    else if (command.startsWith("echo ")) setResponse([command.slice(5).replace(/^["']|["']$/g, "")]);
    else if (command === "cargo build --release") setResponse(["Demo: release build complete.", "Run cargo in K Shell to build your own project."]);
    else if (command === "ls") setResponse(examples.Completion.lines);
    else if (command === "pwd") setResponse(["C:\\Users\\you\\projects\\k-shell"]);
    else if (command === "help") setResponse(["Try: ls, pwd, echo hello, history, clear", "Or: theme ocean, theme dusk, theme midnight"]);
    else if (command.startsWith("history")) setResponse(examples.History.lines);
    else if (["theme ocean", "theme dusk", "theme midnight"].includes(command)) {
      setTheme(command.split(" ")[1]);
      setResponse([`Theme set to ${command.split(" ")[1]}.`]);
    } else setResponse(["This is a browser preview. Try help for demo commands."]);
    setInput("");
  }

  return (
    <div className={`terminal-window theme-${theme}`}>
      <div className="wt-titlebar">
        <div className="wt-tab"><Logo /><span>K Shell</span><svg className="wt-tab-close" viewBox="0 0 16 16" aria-hidden="true"><path d="m5 5 6 6m0-6-6 6" /></svg></div>
        <div className="wt-new-tab" aria-hidden="true"><span>+</span><svg viewBox="0 0 16 16"><path d="m5 6 3 3 3-3" /></svg></div>
        <span className="wt-executable">kshell.exe</span>
        <div className="wt-caption-controls" aria-hidden="true">
          <span><svg viewBox="0 0 16 16"><path d="M3 8h10" /></svg></span>
          <span><svg viewBox="0 0 16 16"><rect x="3.5" y="3.5" width="9" height="9" /></svg></span>
          <span><svg viewBox="0 0 16 16"><path d="m3.5 3.5 9 9m0-9-9 9" /></svg></span>
        </div>
      </div>
      <div className="terminal-body">
        <div className="terminal-welcome"><Logo /><div><strong>Welcome to K Shell.</strong><span>A fresh prompt. Endless possibilities.</span></div><span className="terminal-live"><span className="status-dot" /> Ready</span></div>
        <div className="terminal-path"><Icon name="terminal" /> ~\projects\k-shell <span>main</span></div>
        <div className="terminal-command"><span className="prompt">›</span> {lastCommand ?? examples[mode].command}</div>
        <div className="terminal-output" aria-live={playing ? "off" : "polite"}>{(response ?? examples[mode].lines).map((line, i) => <div key={i}>{line}</div>)}</div>
        <div className="terminal-path second-path"><Icon name="terminal" /> ~\projects\k-shell <span>main</span></div>
        <form className="terminal-input-line" onSubmit={event => { event.preventDefault(); run(); }}>
          <span className="prompt">›</span>
          <div className="terminal-input-wrap">
            <input aria-label="Try a demo shell command" autoComplete="off" spellCheck={false} value={input} placeholder={playing ? "" : "Try help, ls, or theme dusk"} onFocus={() => setAutoPlay(false)} onChange={event => setInput(event.target.value)} onKeyDown={event => {
              if (event.key === "Tab" && (input.startsWith("cargo b") || (!input && mode === "Completion"))) { event.preventDefault(); setInput("cargo build --release"); }
              if (event.key === "ArrowUp") { event.preventDefault(); setInput("ls"); }
            }} />
            {playing && !input && <span className="terminal-cursor" aria-hidden="true" />}
          </div>
          <button aria-label="Run demo command" title="Run demo command">↵</button>
        </form>
        <div className="terminal-tip">Interactive preview. Click the prompt and try a command.</div>
      </div>
      <div className="terminal-tabs" role="group" aria-label="Terminal preview examples">
        <button className="animation-toggle" aria-label={playing ? "Pause terminal animation" : "Play terminal animation"} disabled={reducedMotion} onClick={() => setAutoPlay(!autoPlay)}><Icon name={playing ? "pause" : "play"} /><span>{reducedMotion ? "Motion off" : playing ? "Pause demo" : "Play demo"}</span></button>
        {(Object.keys(examples) as Mode[]).map(tab => <button key={tab} aria-pressed={mode === tab} onClick={() => { setAutoPlay(false); setMode(tab); setLastCommand(null); setResponse(null); setInput(""); }}>{tab}</button>)}
      </div>
    </div>
  );
}
