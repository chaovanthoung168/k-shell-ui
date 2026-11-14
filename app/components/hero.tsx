"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Arrow, Icon } from "./ui";
import { TerminalDemo } from "./terminal-demo";
import styles from "./hero-motion.module.css";

const ingredients = [
  { label: "Rust", detail: "Native engine", icon: "rust", x: -235, y: -170 },
  { label: "Windows", detail: "Your platform", icon: "windows", x: 235, y: -170 },
  { label: "Completion", detail: "Less typing", icon: "spark", x: -260, y: -40 },
  { label: "Git", detail: "Your native tools", icon: "code", x: 260, y: -40 },
  { label: "History", detail: "Pick up anywhere", icon: "history", x: -225, y: 120 },
  { label: "Themes", detail: "Make it yours", icon: "palette", x: 225, y: 120 },
];

export function Hero() {
  const journey = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const source = useRef<HTMLDivElement>(null);
  const landing = useRef<HTMLElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = journey.current;
    const origin = source.current;
    const destination = dock.current;
    const nextSection = landing.current;
    const terminal = scene.current;
    if (!root || !origin || !destination || !nextSection || !terminal) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!root || !origin || !destination || !nextSection || !terminal) return;
      const rootRect = root.getBoundingClientRect();
      const from = origin.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      const header = window.innerWidth <= 580 ? 64 : 80;
      const staticLayout = motion.matches;
      const startScroll = rootRect.top + window.scrollY - header;
      const endScroll = nextSection.getBoundingClientRect().top + window.scrollY - header;
      const distance = endScroll - startScroll;
      const progress = staticLayout || distance <= 0 ? 0 : Math.max(0, Math.min(1, (window.scrollY - startScroll) / distance));
      const eased = progress * progress * (3 - 2 * progress);
      const height = terminal.offsetHeight;
      const startX = from.left - rootRect.left;
      const startY = from.top - rootRect.top + (from.height - height) / 2;
      const endX = to.left - rootRect.left;
      const endY = to.top - rootRect.top + (to.height - height) / 2;
      const turn = progress > 0 && progress < 1 ? Math.sin(Math.PI * progress) : 0;

      root.style.setProperty("--journey", progress.toFixed(4));
      root.style.setProperty("--terminal-x", `${startX + (endX - startX) * eased}px`);
      root.style.setProperty("--terminal-y", `${startY + (endY - startY) * eased}px`);
      root.style.setProperty("--terminal-width", `${from.width + (to.width - from.width) * eased}px`);
      root.style.setProperty("--terminal-roll", `${turn * (window.innerWidth > 800 ? -10 : -4)}deg`);
      root.style.setProperty("--terminal-pitch", `${turn * 9}deg`);
      root.style.setProperty("--terminal-yaw", `${turn * 13}deg`);
      root.dataset.terminalLocation = progress === 0 ? "hero" : progress === 1 ? "workspace" : "transition";
    }

    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    const observer = new ResizeObserver(schedule);
    observer.observe(origin);
    observer.observe(destination);
    observer.observe(terminal);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={journey} className={styles.journey}>
      <section ref={hero} className={styles.banner} aria-labelledby="hero-title">
        <div className={styles.panel}>
          <div className={styles.inner}>
            <div className={styles.copyStack}>
              <h1 id="hero-title" className={styles.heading}>Your tools. <span>One terminal.</span></h1>
              <p className={styles.subhead}>The commands you know, built for Windows.<br /> A native shell that keeps you in your flow.</p>
              <div className={styles.actions}>
                <Link className={styles.primary} href="/docs/#installation"><Icon name="download" /> Install K Shell</Link>
                <Link className={styles.secondary} href="/playground/">Try the terminal <Arrow /></Link>
              </div>
              <p className={styles.specs}>Windows 10 / 11 <span>Built with Rust</span><span>No WSL required</span></p>
            </div>
            <div ref={source} className={styles.heroAnchor} aria-hidden="true" />
          </div>
          <div className={styles.sceneFooter}>
            <span className={styles.scrollHint}><span aria-hidden="true">↓</span> Follow the terminal</span>
            <div className={styles.motionControls}><button onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume collection animation" : "Pause collection animation"}><Icon name={paused ? "play" : "pause"} />{paused ? "Resume" : "Pause"}</button><button onClick={() => { setIntro(value => value + 1); setPaused(false); }} aria-label="Replay collection animation"><Icon name="history" />Replay</button></div>
          </div>
        </div>
      </section>

      <section ref={landing} className={styles.landing} id="terminal-workspace" aria-labelledby="workspace-heading">
        <div className={styles.landingInner}>
          <div className={styles.landingCopy}>
            <h2 id="workspace-heading">Everything you need.<br /> Right at the prompt.</h2>
            <p>Less typing. Familiar commands. Your history, ready when you are.</p>
          </div>
          <div ref={dock} className={styles.dock} aria-hidden="true" />
          <Link className={styles.workspaceLink} href="/playground/">Make it your workspace <Arrow /></Link>
        </div>
      </section>

      <div ref={scene} className={styles.scene}>
        <div className={styles.collection} key={intro} style={{ animationPlayState: paused ? "paused" : "running" }} aria-hidden="true">
          <svg className={styles.routes} viewBox="0 0 600 330" preserveAspectRatio="none" fill="none"><path d="M65 0C65 70 95 180 95 260M535 0C535 110 170 170 95 260M40 125C40 180 75 210 95 260M560 125C400 125 180 200 95 260M75 285Q85 280 95 260M525 285C370 320 165 300 95 260" /></svg>
          {ingredients.map((item, index) => <span key={item.label} className={styles.ingredient} style={{ "--x": `${item.x}px`, "--y": `${item.y}px`, "--delay": `${600 + index * 280}ms` } as CSSProperties}><span className={styles.ingredientIcon}><Icon name={item.icon} /></span><span className={styles.ingredientCopy}><strong>{item.label}</strong><small>{item.detail}</small></span></span>)}
          <span className={styles.intake}><Icon name="check" /></span>
          <span className={styles.received}><Icon name="check" /> Six capabilities. One prompt.</span>
        </div>
        <div className={styles.terminal}><TerminalDemo /></div>
      </div>
    </div>
  );
}
