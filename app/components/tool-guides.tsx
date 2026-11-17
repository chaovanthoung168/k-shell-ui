"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow, Icon } from "./ui";
import styles from "./tool-guides.module.css";

const guides = [
  {
    name: "Kpm", icon: "download",
    description: "Find a tool, install a version, and choose what runs in K Shell.",
    href: "/docs/#package-manager", link: "Read the Kpm guide",
    steps: [
      { title: "Find your tool", description: "See the supported tools, including Node.js, Python, Go, Rust, PHP, Git, and Java.", command: "kpm list" },
      { title: "Install Node.js", description: "Choose a version with the arrow keys, press Enter, then confirm the installation.", command: "kpm install node" },
      { title: "Choose an installed version", description: "Select a managed Node.js version. Your choice applies to the next command and is saved for future sessions.", command: "kpm use node" },
    ],
    note: "Check the result with node --version. Version switching is supported for Node.js; Python and Git each support one managed version.",
  },
  {
    name: "kreq", icon: "code",
    description: "Send a request and read the response, right from your prompt.",
    href: "/docs/#http-client", link: "Read the kreq guide",
    steps: [
      { title: "Make a GET request", description: "See the response status, content, and headers. Replace the example URL with your own API.", command: "kreq get 'https://api.example.com/users/1'" },
      { title: "Read formatted JSON", description: "Use --json to format the body and content to show just the status and content fields.", command: "kreq get 'https://api.example.com/users/1' --json content" },
      { title: "Send a JSON body", description: "Use -H for the content type and -d for the body. Single quotes preserve the JSON double quotes.", command: "kreq post 'https://api.example.com/users' -H 'Content-Type: application/json' -d '{\"name\":\"Alex\"}'" },
    ],
    note: "These API URLs are placeholders. Run each command on one line in K Shell; copying a command does not run it.",
  },
] as const;

function CommandExample({ command, title }: { command: string; title: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  }

  return <div className={styles.example}>
    <div className={styles.command}><span aria-hidden="true">›</span><code>{command}</code><button type="button" onClick={copy} aria-label={`Copy ${title} command`} title={status === "copied" ? "Copied" : "Copy command"}><Icon name={status === "copied" ? "check" : "copy"} /></button></div>
    <span className={styles.copyStatus} role="status">{status === "copied" ? "Copied" : status === "failed" ? "Select the command text to copy" : ""}</span>
  </div>;
}

function ToolRecipe({ guide }: { guide: (typeof guides)[number] }) {
  const [selected, setSelected] = useState(0);
  const step = guide.steps[selected];
  const labels = guide.name === "Kpm" ? ["Discover", "Install", "Switch"] : ["GET", "JSON", "POST"];

  return <article className={styles.guide} id={`${guide.name.toLowerCase()}-guide`} aria-labelledby={`${guide.name.toLowerCase()}-guide-heading`}>
    <header className={styles.guideHeading}><span className={styles.toolName}><Icon name={guide.icon} />{guide.name === "Kpm" ? "Package manager" : "HTTP client"}</span><h3 id={`${guide.name.toLowerCase()}-guide-heading`}>{guide.name}</h3><p>{guide.description}</p><Link className={styles.guideLink} href={guide.href}>{guide.link}<Arrow /></Link></header>
    <div className={styles.recipe}><div className={styles.recipeTabs} role="group" aria-label={`${guide.name} examples`}>{guide.steps.map((item, index) => <button key={item.title} type="button" aria-pressed={selected === index} aria-controls={`${guide.name.toLowerCase()}-recipe`} onClick={() => setSelected(index)}>{labels[index]}</button>)}</div><div className={styles.recipeBody} id={`${guide.name.toLowerCase()}-recipe`} aria-live="polite"><h4>{step.title}</h4><p>{step.description}</p><CommandExample key={step.command} title={step.title} command={step.command} /></div><details className={styles.note}><summary>Good to know</summary><p>{guide.note}</p></details></div>
  </article>;
}

export function ToolGuides() {
  return <section className={`container ${styles.section}`} id="tool-guides" aria-labelledby="tool-guides-heading">
    <header className={styles.heading}><h2 id="tool-guides-heading">Developer tools,<br />built into K Shell.</h2><p>Manage a runtime. Make a request.<br />Keep working from the same prompt.</p></header>
    <p className={styles.availability}>Kpm and kreq require the updated source build; they are not included in v0.1.6. <Link href="/docs/#build-from-source">Build from source<Arrow /></Link></p>
    <div className={styles.guides}>{guides.map(guide => <ToolRecipe key={guide.name} guide={guide} />)}</div>
  </section>;
}
