"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, Logo } from "./ui";
import { DEMO_FEATURES, resolveDemoFeature } from "./terminal-demo-data";
import styles from "./terminal-demo.module.css";

function CommandText({ text }: { text: string }) {
  const [command = "", ...rest] = text.split(" ");
  return <><span className={styles.commandName}>{command}</span>{rest.length > 0 && <> {rest.join(" ").split(/("[^"]*"|'[^']*')/g).map((part, index) => <span key={index} className={/^["']/.test(part) ? styles.string : undefined}>{part}</span>)}</>}</>;
}

export function TerminalDemo() {
  const host = useRef<HTMLDivElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<"typing" | "complete">("typing");
  const [paused, setPaused] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const feature = DEMO_FEATURES[featureIndex];
  const steps = useMemo(() => resolveDemoFeature(feature), [feature]);
  const current = steps[stepIndex];
  const shown = reduced ? steps : steps.slice(0, stepIndex + (phase === "complete" ? 1 : 0));
  const last = shown.at(-1);
  const typing = !reduced && phase === "typing";
  const text = typing ? current.command.slice(0, typed) : "";
  const completing = typing && !!current.completePrefix && typed === current.completePrefix.length;

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const container = element.closest("#terminal-preview") ?? element.parentElement!;
    let inView = false;
    function update() { setEligible(inView && !document.hidden && !element!.closest("[inert]")); }
    function preference() { setReduced(motion.matches); }
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting && entry.intersectionRatio >= 0.25; update(); }, { threshold: 0.25 });
    observer.observe(element);
    const attributes = new MutationObserver(update);
    attributes.observe(container, { attributes: true, attributeFilter: ["inert", "aria-hidden"] });
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", preference);
    preference();
    return () => {
      observer.disconnect();
      attributes.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", preference);
    };
  }, []);

  useEffect(() => {
    if (!eligible || paused || reduced) return;
    let delay: number;
    let advance: () => void;
    if (phase === "typing" && typed < current.command.length) {
      delay = completing ? 600 : 50;
      advance = () => setTyped(completing ? current.completion!.length : typed + 1);
    } else if (phase === "typing") {
      delay = 500;
      advance = () => setPhase("complete");
    } else {
      delay = Math.min(4200, 1800 + current.output.split("\n").length * 180);
      advance = () => {
        if (stepIndex + 1 < steps.length) setStepIndex(stepIndex + 1);
        else { setFeatureIndex(value => (value + 1) % DEMO_FEATURES.length); setStepIndex(0); }
        setTyped(0);
        setPhase("typing");
      };
    }
    const timer = setTimeout(advance, delay);
    return () => clearTimeout(timer);
  }, [eligible, paused, reduced, phase, typed, current, completing, stepIndex, steps.length, featureIndex]);

  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [featureIndex, stepIndex, phase, reduced]);

  function selectFeature(index: number) {
    setFeatureIndex(index);
    setStepIndex(0);
    setTyped(0);
    setPhase("typing");
    setPaused(false);
  }

  function nextFeature() {
    setFeatureIndex(value => (value + 1) % DEMO_FEATURES.length);
    setStepIndex(0);
    setTyped(0);
    setPhase("typing");
    setPaused(false);
  }

  return <div ref={host} className={styles.preview} data-demo-feature={featureIndex} data-demo-phase={phase}>
    <div className={styles.window} data-palette={last?.palette ?? "ocean"}>
      <div className={styles.titlebar}>
        <div className={styles.brand}><Logo /><span>K Shell</span></div>
        <span className={styles.featureName}>{feature.name}</span>
      </div>
      <div className={styles.location}><code>{last?.path ?? "C:\\Playground\\k-shell"}</code><span>{feature.sourceOnly ? "Illustrative output" : "Sample workspace"}</span></div>
      <div ref={output} className={styles.output} role="region" aria-label="Automatic terminal demo output" tabIndex={0}>
        {shown.length ? shown.map((entry, index) => <div className={styles.entry} key={`${featureIndex}-${index}`}>
          <div className={styles.previousCommand}><span aria-hidden="true">›</span><code><CommandText text={entry.command} /></code></div>
          {entry.output && <pre>{entry.output}</pre>}
        </div>) : <p className={styles.empty}>Watch K Shell’s features in action.</p>}
      </div>
      <div className={styles.promptArea}>
        <div className={styles.commandPreview} aria-label="Automatically typed command">
          <span className={styles.promptSymbol} aria-hidden="true">›</span>
          <div className={styles.inputWrap}><code><CommandText text={text} /></code>{completing && <span className={styles.ghost}>{current.completion?.slice(typed)}</span>}{!reduced && <span className={styles.caret} data-running={eligible && !paused} aria-hidden="true" />}</div>
          {completing && <kbd className={styles.tabHint}>Tab</kbd>}
        </div>
        <p className={styles.description} role="status" aria-live="polite">{feature.description}</p>
      </div>
      <div className={styles.statusbar}>
        <div className={styles.status}>{feature.sourceOnly ? <Link href={`/docs/#${feature.docs}`}>Source build example</Link> : <span>{reduced ? "Static feature demo" : "Automatic feature demo"}</span>}<span>{featureIndex + 1} / {DEMO_FEATURES.length}</span></div>
        <div className={styles.controls}>
          {!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume automatic demo" : "Pause automatic demo"} aria-pressed={paused}>{paused ? "Resume" : "Pause"}</button>}
          <button type="button" onClick={nextFeature}>Next feature</button>
          <button type="button" onClick={() => selectFeature(0)} aria-label="Restart automatic demo" title="Restart demo"><Icon name="history" /></button>
        </div>
      </div>
    </div>
  </div>;
}
