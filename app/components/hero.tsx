"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Arrow, Icon } from "./ui";
import { TerminalDemo } from "./terminal-demo";
import styles from "./hero-motion.module.css";

export function Hero() {
  const journey = useRef<HTMLDivElement>(null);
  const source = useRef<HTMLDivElement>(null);
  const landing = useRef<HTMLElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const terminal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = journey.current;
    const origin = source.current;
    const destination = dock.current;
    const nextSection = landing.current;
    const scene = terminal.current;
    if (!root || !origin || !destination || !nextSection || !scene) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const compact = matchMedia("(max-width: 999px)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!root || !origin || !destination || !nextSection || !scene) return;
      if (motion.matches || compact.matches) {
        root.dataset.terminalLocation = "static";
        return;
      }
      if (!root.dataset.terminalLocation || root.dataset.terminalLocation === "static") root.dataset.terminalLocation = "hero";
      const rootRect = root.getBoundingClientRect();
      const from = origin.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-height")) || 56;
      const start = Math.max(0, rootRect.top + scrollY - header);
      const end = nextSection.getBoundingClientRect().top + scrollY - header;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, end - start)));
      const eased = progress * progress * (3 - 2 * progress);
      root.style.setProperty("--terminal-width", `${from.width + (to.width - from.width) * eased}px`);
      const height = scene.offsetHeight;
      root.style.setProperty("--terminal-height", `${height}px`);
      const startX = from.left - rootRect.left;
      const startY = from.top - rootRect.top + (origin.offsetHeight - height) / 2;
      const endX = to.left - rootRect.left;
      const endY = to.top - rootRect.top;
      const turn = progress > 0 && progress < 1 ? Math.sin(Math.PI * progress) : 0;
      root.style.setProperty("--journey", progress.toFixed(4));
      root.style.setProperty("--terminal-x", `${startX + (endX - startX) * eased}px`);
      root.style.setProperty("--terminal-y", `${startY + (endY - startY) * eased}px`);
      root.style.setProperty("--terminal-roll", `${turn * -10}deg`);
      root.style.setProperty("--terminal-pitch", `${turn * 9}deg`);
      root.style.setProperty("--terminal-yaw", `${turn * 13}deg`);
      root.dataset.terminalLocation = progress === 0 ? "hero" : progress === 1 ? "workspace" : "transition";
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    const observer = new ResizeObserver(schedule);
    observer.observe(origin);
    observer.observe(destination);
    observer.observe(scene);
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    compact.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      compact.removeEventListener("change", schedule);
      delete root.dataset.terminalLocation;
    };
  }, []);

  return <div ref={journey} className={styles.journey}>
    <section className={styles.banner} aria-labelledby="hero-title">
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.copyStack}>
            <h1 id="hero-title" className={styles.heading}>Windows,<br />at your command</h1>
            <p className={styles.subhead}>Familiar commands. Your installed tools. One native shell that feels at home on Windows.</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/docs/#installation"><Icon name="download" /> Install K Shell</Link>
              <Link className={styles.secondary} href="/playground/">Try the terminal <Arrow /></Link>
            </div>
          </div>
          <div ref={source} className={styles.heroAnchor} data-terminal-source=""><div ref={terminal} className={styles.terminal} id="terminal-preview"><TerminalDemo /></div></div>
        </div>
        <div className={styles.sceneFooter}>
          <div className={styles.platformFacts}><span>Windows 10 / 11</span><span>Built with Rust</span><span>No WSL required</span></div>
          <Link className={styles.scrollHint} href="#terminal-workspace"><span aria-hidden="true">↓</span> Meet your next prompt</Link>
        </div>
      </div>
    </section>
    <section ref={landing} className={styles.landing} id="terminal-workspace" aria-labelledby="workspace-heading">
      <div className={styles.landingInner}>
        <div className={styles.landingCopy}>
          <h2 id="workspace-heading">Your next command,<br />already within reach</h2>
          <p>Watch K Shell complete paths, manage files, and bring your tools together.</p>
        </div>
        <div ref={dock} className={styles.dock} data-terminal-dock="" aria-hidden="true" />
        <Link className={styles.workspaceLink} href="/playground/">Try commands in the Playground <Arrow /></Link>
      </div>
    </section>
  </div>;
}
