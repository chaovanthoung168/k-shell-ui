"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import styles from "./particle-wave.module.css";

// Keep WebGL and the Three.js bundle out of SSR and reduced-motion sessions.
const WaveCanvas = dynamic(() => import("./particle-wave-canvas"), { ssr: false });

function subscribeTheme(callback: () => void) {
  window.addEventListener("kshell-theme-change", callback);
  return () => window.removeEventListener("kshell-theme-change", callback);
}

class WaveBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

type JourneyRefs = {
  journey: RefObject<HTMLDivElement | null>;
  source: RefObject<HTMLDivElement | null>;
  destination: RefObject<HTMLDivElement | null>;
};

function smoothRange(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

export function ParticleWave({ journey, source, destination }: JourneyRefs) {
  const light = useSyncExternalStore(subscribeTheme, () => document.documentElement.dataset.theme === "light", () => false);
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const progress = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [compact, setCompact] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const small = matchMedia("(max-width: 700px)");
    const element = host.current;
    if (!element) return;
    let inView = false;
    function preferences() {
      setEnabled(!motion.matches);
      if (motion.matches) setReady(false);
      setCompact(small.matches);
    }
    function visibility() { setVisible(inView && !document.hidden); }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const rect = element!.getBoundingClientRect();
      pointer.current.x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      pointer.current.y = Math.max(-1, Math.min(1, 1 - (event.clientY - rect.top) / rect.height * 2));
    }
    function leave() { pointer.current.x = 0; pointer.current.y = 0; }
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; visibility(); });
    observer.observe(element);
    const panel = element.parentElement!;
    panel.addEventListener("pointermove", move, { passive: true });
    panel.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", preferences);
    small.addEventListener("change", preferences);
    preferences();
    return () => {
      observer.disconnect();
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", preferences);
      small.removeEventListener("change", preferences);
    };
  }, []);

  useEffect(() => {
    const root = journey.current;
    const origin = source.current;
    const target = destination.current;
    const artwork = host.current;
    // The ordinary DOM terminal remains available without WebGL, JS or motion.
    if (!enabled || !ready || failed || !root || !origin || !target || !artwork) return;
    let frame = 0;
    let wasSettled = false;
    function update() {
      frame = 0;
      if (!root || !origin || !target || !artwork) return;
      const from = origin.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const header = parseFloat(getComputedStyle(root).getPropertyValue("--header-height")) || 56;
      const start = from.top + window.scrollY - header;
      // A top-based endpoint is stable when terminal output changes its height.
      const end = to.top + window.scrollY - header - Math.min(80, innerHeight * 0.08);
      const p = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
      const travel = smoothRange(0, 0.84, p);
      progress.current = p;
      artwork.style.left = `${(to.left - from.left) * travel}px`;
      artwork.style.top = `${(to.top - from.top) * travel}px`;
      artwork.style.width = `${from.width + (to.width - from.width) * travel}px`;
      artwork.style.height = `${from.height + (to.height - from.height) * travel}px`;
      artwork.style.right = "auto";
      artwork.style.bottom = "auto";
      artwork.style.setProperty("--particle-progress", p.toFixed(5));
      artwork.style.setProperty("--wave-scrim-opacity", (1 - smoothRange(0.12, 0.5, p)).toFixed(5));
      artwork.style.opacity = (1 - smoothRange(0.9, 1, p)).toFixed(5);
      artwork.dataset.morphing = p > 0.2 ? "true" : "false";
      root.style.setProperty("--terminal-reveal", smoothRange(0.86, 0.985, p).toFixed(5));
      const phase = p >= 0.985 ? "ready" : "forming";
      if (root.dataset.particlePhase !== phase) {
        root.dataset.particlePhase = phase;
        target.inert = phase !== "ready";
        if (phase === "ready") target.removeAttribute("aria-hidden");
        else target.setAttribute("aria-hidden", "true");
      }
      if ((p === 1) !== wasSettled) { wasSettled = p === 1; setSettled(wasSettled); }
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    const observer = new ResizeObserver(schedule);
    observer.observe(origin);
    observer.observe(target);
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      delete root.dataset.particlePhase;
      root.style.removeProperty("--terminal-reveal");
      target.inert = false;
      target.removeAttribute("aria-hidden");
      artwork.removeAttribute("style");
      delete artwork.dataset.morphing;
      progress.current = 0;
      setSettled(false);
    };
  }, [enabled, ready, failed, journey, source, destination]);

  const live = enabled && !failed;
  return <div ref={host} className={styles.artwork}>
    <div className={styles.visual} aria-hidden="true">
      {/* Native img avoids loading the rendering engine for the static fallback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`${styles.fallback}${live && ready ? ` ${styles.hidden}` : ""}`} src="/particle-wave-static.svg" alt="" width="1000" height="700" />
      {live && <WaveBoundary onFailure={() => setFailed(true)}><WaveCanvas active={visible && !settled} compact={compact} light={light} pointer={pointer} progress={progress} onReady={() => setReady(true)} onFailure={() => setFailed(true)} /></WaveBoundary>}
    </div>
  </div>;
}
