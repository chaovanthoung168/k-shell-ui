"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { INSTALL_COMMAND, RELEASES_URL } from "../release";
import { Arrow, Icon } from "./ui";
import styles from "./quickstart.module.css";

function CopyCommand({ command, label, primary = false }: { command: string; label: string; primary?: boolean }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state !== "copied") return;
    const timer = setTimeout(() => setState("idle"), 2500);
    return () => clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className={styles.copyControl}>
      <button className={primary ? styles.primaryCopy : styles.copyButton} type="button" onClick={copy} aria-label={`Copy ${label}`}>
        <Icon name={state === "copied" ? "check" : "copy"} />
        <span>{state === "copied" ? "Copied" : primary ? "Copy command" : "Copy"}</span>
      </button>
      <span className={styles.copyFeedback} data-error={state === "failed"} role="status">{state === "failed" ? "Select the command and copy it manually." : state === "copied" ? `${label} copied.` : ""}</span>
    </div>
  );
}

export function Quickstart() {
  return (
    <section className={`section container ${styles.section}`} id="get-started" aria-labelledby="quickstart-heading">
      <div className={styles.content}>
        <header className={styles.heading}>
          <h2 id="quickstart-heading">Make yourself<br />at home</h2>
          <p>Open PowerShell, paste the command, and start your first K Shell session.</p>
          <span className={styles.platform}><Icon name="windows" />For Windows 10 & 11 x64</span>
        </header>

        <div className={styles.commandBox}>
          <div className={styles.commandHeader}><span><Icon name="terminal" />PowerShell</span><CopyCommand command={INSTALL_COMMAND} label="installation command" primary /></div>
          <pre aria-label="Installation command" tabIndex={0}><code>{INSTALL_COMMAND}</code></pre>
        </div>
        <p className={styles.installNote}>No Rust installation or administrator access needed.</p>

        <div className={styles.launch}>
          <div><h3>Then, open a new terminal.</h3><p>Run <code>kshell</code> or choose the K Shell profile in Windows Terminal.</p></div>
          <div className={styles.launchCommand}><span aria-hidden="true">›</span><code>kshell</code><CopyCommand command="kshell" label="launch command" /></div>
        </div>

        <div className={styles.footer}><Link href="/docs/#installation">Installation guide <Arrow /></Link><a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">Portable ZIP releases <Arrow /></a></div>
      </div>
    </section>
  );
}
