"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, Icon, Logo } from "./ui";
import { TerminalDemo } from "./terminal-demo";
import styles from "./hero.module.css";

export function Hero() {
  const [intro, setIntro] = useState(0);
  return (
    <section className={styles.banner} aria-labelledby="hero-title">
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h1 id="hero-title" className={styles.heading}>Windows,<br />at your<br />command</h1>
            <p className={styles.subhead}>The commands you know. A prompt that feels like yours. Meet K Shell, a native Windows shell built with Rust.</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/docs/#installation"><Icon name="download" /> Install K Shell</Link>
              <a className={styles.secondary} href="#features">Explore features <Arrow /></a>
            </div>
            <p className={styles.specs}>Windows 10 / 11 x64 <span>No WSL required</span></p>
          </div>
          <div className={styles.scene}>
            <div className={styles.object} key={intro} aria-hidden="true">
              <span className={styles.objectBack}><Logo /></span>
              <span className={styles.objectMiddle}><Logo /></span>
              <span className={styles.objectFront}><Logo /></span>
            </div>
            <div className={styles.commandTrace} aria-hidden="true"><span>›</span><code>cargo bu<span>ild --release</span></code><kbd>Tab</kbd></div>
            <div className={styles.sceneCaption}><span>K Shell for Windows</span><button className={styles.replay} onClick={() => setIntro(value => value + 1)} aria-label="Replay prompt animation"><Icon name="play" />Replay intro</button></div>
          </div>
        </div>
        <div className={styles.workbench}>
          <div className={styles.workbenchCopy}><h2>A fresh prompt<br />A familiar feeling</h2><p>Completion, history, and your choice of atmosphere. Try a command and make yourself at home.</p><Link href="/playground/">Open the playground <Arrow /></Link></div>
          <div className={styles.stage}><div className={styles.terminal}><TerminalDemo /></div></div>
        </div>
      </div>
    </section>
  );
}
