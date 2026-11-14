"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Arrow, Icon } from "./ui";
import { TerminalDemo } from "./terminal-demo";
import styles from "./hero-motion.module.css";

const ingredients = [
  { label: "Rust", icon: "rust", x: -226, y: -204, turn: -12 },
  { label: "Windows", icon: "windows", x: 198, y: -204, turn: 10 },
  { label: "Completion", icon: "spark", x: -254, y: -28, turn: -8 },
  { label: "Git", icon: "code", x: 256, y: -24, turn: 12 },
  { label: "History", icon: "history", x: -198, y: 190, turn: 8 },
  { label: "Themes", icon: "palette", x: 208, y: 192, turn: -10 },
];

export function Hero() {
  const journey = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const section = journey.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const header = window.innerWidth <= 580 ? 64 : 80;
      const distance = rect.height - (window.innerHeight - header);
      const progress = motion.matches || distance <= 0 ? 0 : Math.max(0, Math.min(1, (header - rect.top) / distance));
      section.style.setProperty("--journey", progress.toFixed(4));
      section.style.setProperty("--terminal-turn", `${-11 * (1 - progress)}deg`);
      section.style.setProperty("--terminal-rise", `${28 * progress}px`);
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <section ref={journey} className={styles.banner} aria-labelledby="hero-title">
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.copyStack}>
            <div className={styles.copy}>
              <h1 id="hero-title" className={styles.heading}>Your tools.<br /> One terminal.</h1>
              <p className={styles.subhead}>Familiar commands. Native Windows power. A shell that brings your everyday tools together.</p>
              <div className={styles.actions}>
                <Link className={styles.primary} href="/docs/#installation"><Icon name="download" /> Install K Shell</Link>
                <Link className={styles.secondary} href="/playground/">Try the terminal <Arrow /></Link>
              </div>
              <p className={styles.specs}>Built with Rust. At home on Windows.</p>
            </div>
            <div className={styles.scrollCopy}>
              <h2>It all comes<br /> back to the prompt.</h2>
              <p>Complete a command. Recall an idea. Run the tools you already trust. Stay in your flow.</p>
              <ul><li><Icon name="check" /> Native Windows execution</li><li><Icon name="check" /> Completion and persistent history</li><li><Icon name="check" /> A workspace that feels like yours</li></ul>
            </div>
          </div>
          <div className={styles.scene}>
            <div className={styles.collection} key={intro} style={{ animationPlayState: paused ? "paused" : "running" }} aria-hidden="true">
              <svg className={styles.paths} viewBox="0 0 640 600" fill="none"><path d="M94 96Q160 96 320 300M518 96Q460 96 320 300M66 272H320M576 276H320M122 490Q200 490 320 300M528 492Q440 492 320 300" /></svg>
              {ingredients.map((item, index) => <span key={item.label} className={styles.ingredient} style={{ "--x": `${item.x}px`, "--y": `${item.y}px`, "--turn": `${item.turn}deg`, "--delay": `${index * 160}ms` } as CSSProperties}><Icon name={item.icon} /><span>{item.label}</span></span>)}
              <span className={styles.received}><Icon name="check" /> Your tools. Connected.</span>
            </div>
            <div className={styles.terminal}><TerminalDemo /></div>
          </div>
        </div>
        <div className={styles.sceneFooter}>
          <span className={styles.scrollHint}><span aria-hidden="true">↓</span> Scroll. Keep your terminal with you.</span>
          <div className={styles.motionControls}><button onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume collection animation" : "Pause collection animation"}><Icon name={paused ? "play" : "pause"} />{paused ? "Resume" : "Pause"}</button><button onClick={() => { setIntro(value => value + 1); setPaused(false); }} aria-label="Replay collection animation"><Icon name="history" />Replay</button></div>
        </div>
        <div className={styles.progress} aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
