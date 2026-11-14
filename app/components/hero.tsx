"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Arrow, Icon } from "./ui";
import { TerminalDemo } from "./terminal-demo";
import styles from "./hero-motion.module.css";

const ingredients = [
  { label: "Rust", icon: "rust", x: -235, y: -160 },
  { label: "Windows", icon: "windows", x: 235, y: -160 },
  { label: "Completion", icon: "spark", x: -260, y: 0 },
  { label: "Git", icon: "code", x: 260, y: 0 },
  { label: "History", icon: "history", x: -225, y: 155 },
  { label: "Themes", icon: "palette", x: 225, y: 155 },
];

export function Hero() {
  const journey = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
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
      const frameWidth = inner.current?.clientWidth ?? window.innerWidth;
      const frameHeight = inner.current?.clientHeight ?? window.innerHeight;
      const desktop = window.innerWidth > 800;
      const eased = progress * progress * (3 - 2 * progress);
      const startWidth = Math.min(680, frameWidth * .55);
      const endWidth = Math.min(800, frameWidth);
      const startX = (frameWidth - startWidth) / 2;
      const drop = Math.min(88, Math.max(0, (frameHeight - 350) / 2 - 12));
      section.style.setProperty("--journey", progress.toFixed(4));
      section.style.setProperty("--terminal-x", `${desktop ? startX * (1 - eased) : 0}px`);
      section.style.setProperty("--terminal-rise", `${desktop ? drop * eased : 12 * eased}px`);
      section.style.setProperty("--terminal-width", desktop ? `${startWidth + (endWidth - startWidth) * eased}px` : "100%");
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
        <div ref={inner} className={styles.inner}>
          <div className={styles.copyStack}>
            <div className={styles.copy}>
              <h1 id="hero-title" className={styles.heading}>Your tools. <span>One terminal.</span></h1>
              <p className={styles.subhead}>The commands you know, built for Windows.<br /> A native shell that keeps you in your flow.</p>
              <div className={styles.actions}>
                <Link className={styles.primary} href="/docs/#installation"><Icon name="download" /> Install K Shell</Link>
                <Link className={styles.secondary} href="/playground/">Try the terminal <Arrow /></Link>
              </div>
              <p className={styles.specs}>Windows 10 / 11 <span>Built with Rust</span><span>No WSL required</span></p>
            </div>
          </div>
          <div className={styles.scrollCopy}>
            <h2>Everything you need.<br /> Right at the prompt.</h2>
            <p>Less typing. Familiar commands. Your history, ready when you are.</p>
          </div>
          <div className={styles.scene}>
            <div className={styles.collection} key={intro} style={{ animationPlayState: paused ? "paused" : "running" }} aria-hidden="true">
              {ingredients.map((item, index) => <span key={item.label} className={styles.ingredient} style={{ "--x": `${item.x}px`, "--y": `${item.y}px`, "--delay": `${index * 160}ms` } as CSSProperties}><Icon name={item.icon} /><span>{item.label}</span></span>)}
              <span className={styles.received}><Icon name="check" /> All together. Ready to run.</span>
            </div>
            <div className={styles.terminal}><TerminalDemo /></div>
          </div>
        </div>
        <div className={styles.sceneFooter}>
          <span className={styles.scrollHint}><span aria-hidden="true">↓</span> Scroll to explore</span>
          <div className={styles.motionControls}><button onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume collection animation" : "Pause collection animation"}><Icon name={paused ? "play" : "pause"} />{paused ? "Resume" : "Pause"}</button><button onClick={() => { setIntro(value => value + 1); setPaused(false); }} aria-label="Replay collection animation"><Icon name="history" />Replay</button></div>
        </div>
        <div className={styles.progress} aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
