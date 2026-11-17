"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Arrow, Icon } from "../components/ui";
import { DEMO_FEATURES, resolveDemoFeature } from "../components/terminal-demo-data";
import styles from "./features.module.css";

const features = DEMO_FEATURES.filter(feature => !feature.sourceOnly);
const icons = ["terminal", "folder", "file", "code", "history", "sliders"];

export function FeatureWorkbench() {
  const [selected, setSelected] = useState(0);
  const feature = features[selected];
  const examples = useMemo(() => resolveDemoFeature(feature), [feature]);

  return <section className={styles.explorer} aria-labelledby="explorer-heading">
    <div className={styles.featureList}><h2 id="explorer-heading">Everyday, at the prompt</h2><div role="group" aria-label="Explore K Shell features">{features.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls="feature-example" onClick={() => setSelected(index)}><Icon name={icons[index]} /><span>{item.name}</span><Arrow /></button>)}</div><Link className={styles.explorerLink} href="#tool-guides">Explore Kpm and kreq<Arrow /></Link></div>
    <div className={styles.featureDetail} id="feature-example" aria-live="polite" aria-atomic="true">
      <div className={styles.console}><div className={styles.consoleBar}><span><Icon name="terminal" />K Shell</span><span>Sample workspace</span></div><div className={styles.transcript}>{examples.map((example, index) => <div className={styles.entry} key={`${selected}-${index}`}><span className={styles.path}>{example.path}</span><div className={styles.prompt}><span aria-hidden="true">›</span><code>{example.completePrefix ? <>{example.completePrefix}<span className={styles.suggestion}>{example.command.slice(example.completePrefix.length)}</span></> : example.command}</code></div>{example.output && <pre>{example.output}</pre>}</div>)}</div></div>
      <div className={styles.featureDescription}><div><h3>{feature.name}</h3><p>{feature.description}</p></div><Link href={`/docs/#${feature.docs}`}>See how it works<Arrow /></Link></div>
    </div>
  </section>;
}
