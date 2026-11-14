"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon, Logo } from "../components/ui";
import { ChoiceSelect } from "../components/choice-select";
import { completeInput, createSession, displayPath, finishInput, runCommand, suggestInput, THEMES, type ShellTheme } from "./shell";
import styles from "./playground.module.css";

export function Playground() {
  const [session, setSession] = useState(createSession);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [notice, setNotice] = useState("");
  const [caretAtEnd, setCaretAtEnd] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef("");
  const completionRef = useRef<{ base: string; value: string; index: number } | null>(null);
  const lastEntry = session.entries.at(-1);
  const suggestion = caretAtEnd ? suggestInput(session, input) : "";

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [session.nextId]);

  function execute(command: string) {
    if (session.closed || (!session.stdin && !command.trim())) return;
    setSession((previous) => runCommand(previous, command));
    setInput("");
    setNotice("");
    setHistoryIndex(-1);
    draftRef.current = "";
    completionRef.current = null;
    setCaretAtEnd(true);
    inputRef.current?.focus({ preventScroll: true });
  }

  function changeTheme(theme: ShellTheme) { execute(`theme ${theme}`); }

  function finishTypedInput() {
    setSession((previous) => finishInput(input ? runCommand(previous, input) : previous));
    setInput("");
    setNotice("Typed input complete");
    inputRef.current?.focus({ preventScroll: true });
  }

  function cancelInput() {
    setInput("");
    completionRef.current = null;
    setSession((previous) => ({ ...previous, stdin: false, catTail: "", lastStatus: 130 }));
    setNotice("Input cancelled");
    inputRef.current?.focus({ preventScroll: true });
  }

  function reset() {
    setSession(createSession());
    setInput("");
    setHistoryIndex(-1);
    setNotice("Session reset");
    draftRef.current = "";
    completionRef.current = null;
    setCaretAtEnd(true);
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }

  function handleKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && !session.stdin && session.history.length) {
      event.preventDefault();
      if (historyIndex < 0) draftRef.current = input;
      const next = historyIndex < 0 ? session.history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(session.history[next]);
      completionRef.current = null;
    } else if (event.key === "ArrowDown" && !session.stdin && historyIndex >= 0) {
      event.preventDefault();
      const next = historyIndex + 1;
      setHistoryIndex(next >= session.history.length ? -1 : next);
      setInput(next >= session.history.length ? draftRef.current : session.history[next]);
      completionRef.current = null;
    } else if (event.key === "ArrowRight" && suggestion && inputRef.current?.selectionStart === input.length) {
      event.preventDefault();
      setInput(suggestion);
      setNotice("Suggestion accepted");
      completionRef.current = null;
    } else if (event.key === "Tab" && !event.shiftKey && !session.stdin && input.trim()) {
      event.preventDefault();
      const cycle = completionRef.current;
      const cycling = cycle && cycle.value === input;
      const index = cycling ? cycle.index + 1 : -1;
      const base = cycling ? cycle.base : input;
      const result = completeInput(session, base, index < 0 ? undefined : index);
      setInput(result.input);
      completionRef.current = result.candidates.length > 1 ? { base, value: result.input, index } : null;
      setCaretAtEnd(true);
      const matches = result.candidates.slice(0, 6).join(", ");
      setNotice(result.candidates.length > 1 ? `Matches: ${matches}${result.candidates.length > 6 ? ` and ${result.candidates.length - 6} more` : ""}` : result.candidates.length ? `Completed: ${result.input}` : "No matching command or path");
    } else if (event.key.toLowerCase() === "d" && event.ctrlKey) {
      event.preventDefault();
      if (session.stdin) {
        finishTypedInput();
      } else if (!input) execute("exit");
    } else if (event.key.toLowerCase() === "c" && event.ctrlKey && event.currentTarget.selectionStart === event.currentTarget.selectionEnd) {
      event.preventDefault();
      cancelInput();
    } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setSession((previous) => ({ ...previous, entries: [] }));
      setNotice("Terminal cleared; files and history kept");
    }
  }

  return (
    <div className={`container ${styles.page}`}>
      <section className={`${styles.terminal} ${styles[session.theme]}`} aria-labelledby="playground-heading">
        <header className={styles.toolbar}>
          <div className={styles.title}><Logo /><h1 id="playground-heading">Playground</h1><span title="Browser simulation with a temporary sample filesystem">Browser sandbox</span></div>
          <div className={styles.controls}>
            <div className={styles.themePicker}><ChoiceSelect label="Terminal theme" disabled={session.closed || session.stdin} value={session.theme} onChange={(theme) => changeTheme(theme as ShellTheme)} options={THEMES.map((theme) => ({ value: theme, label: theme[0].toUpperCase() + theme.slice(1), color: { ocean: "#91b8fa", dusk: "#bb95e1", midnight: "#76bdcd" }[theme] }))} /></div>
            <button className={styles.reset} type="button" onClick={reset} aria-label="Reset session" title="Reset sample files, history, and terminal theme"><Icon name="history" /><span>Reset</span></button>
          </div>
        </header>

        <div className={styles.output} ref={outputRef} tabIndex={0} role="region" aria-label="Terminal output">
          <p className={styles.intro}>Type <code>help</code> to see the available commands</p>
          {session.entries.map((entry) => <div className={styles.entry} key={entry.id}>
            {!entry.stdin && <><div className={styles.entryPath}>{displayPath(entry.path)}</div><div className={styles.commandLine}><span aria-hidden="true">›</span><code>{entry.command}</code></div></>}
            {entry.output && <pre className={entry.error ? styles.error : undefined}>{entry.output}</pre>}
          </div>)}
        </div>

        <div className={styles.inputArea}>
          {notice && <p className={styles.notice}>{notice}</p>}
          <div className={styles.currentPath}>{session.stdin ? "Typed input (Ctrl D to finish)" : <>{session.icons !== "off" && <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 5h6l2 2h8v9H2V5Z" stroke="currentColor" strokeWidth="1.4" /></svg>}{displayPath(session.cwd)}</>}</div>
          <form className={styles.inputLine} onSubmit={(event) => { event.preventDefault(); execute(input); }}>
            <span aria-hidden="true">{session.stdin ? "│" : "›"}</span><div className={styles.inputWrap}><input ref={inputRef} aria-label="Playground command" aria-describedby="playground-scope" disabled={session.closed} autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={1000} placeholder={session.closed ? "Reset to start a new session" : session.stdin ? "Enter text" : "Enter a command"} value={input} onChange={(event) => { setInput(event.target.value); setHistoryIndex(-1); setNotice(""); completionRef.current = null; setCaretAtEnd(true); }} onSelect={(event) => setCaretAtEnd(event.currentTarget.selectionStart === event.currentTarget.value.length && event.currentTarget.selectionEnd === event.currentTarget.value.length)} onKeyDown={handleKeys} />{suggestion && <span className={styles.ghost} aria-hidden="true"><span className={styles.ghostPrefix}>{input}</span><span className={`${styles.ghostTail} ${styles[session.suggestions]}`}>{suggestion.slice(input.length)}</span></span>}</div><button type="submit" aria-label={session.stdin ? "Send input" : "Run command"} disabled={session.closed || (!session.stdin && !input.trim())}>{session.stdin ? "Send" : "Run"} <kbd aria-hidden="true">↵</kbd></button>
          </form>
        </div>

        <footer className={styles.statusbar} aria-label="Keyboard shortcuts">{session.stdin ? <><button type="button" onClick={finishTypedInput}><kbd>Ctrl D</kbd> Finish input</button><button type="button" onClick={cancelInput}><kbd>Ctrl C</kbd> Cancel</button></> : <><span><kbd>Tab</kbd> Complete</span><span><kbd>↑ ↓</kbd> History</span><span className={styles.clearShortcut}><kbd>Ctrl L</kbd> Clear</span></>}<span className={styles.statusLabel}>Temporary workspace</span></footer>
        <p id="playground-scope" className={styles.srOnly}>This browser simulation uses a temporary sample filesystem. It does not access your computer’s files or run external programs.</p>
        <div className={styles.srOnly} role="status" aria-live="polite">{notice || (lastEntry ? `${lastEntry.command}. ${lastEntry.error ? "Error: " : ""}${lastEntry.output || "Done"}` : "Playground ready")}</div>
      </section>
    </div>
  );
}
