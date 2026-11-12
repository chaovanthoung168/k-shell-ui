"use client";

import { useEffect, useState } from "react";
import { Icon } from "./ui";

const groups = [
  { title: "Get started", topics: [
    { id: "overview", label: "Before you begin", number: "", keywords: "windows requirements powershell" },
    { id: "installation", label: "Install K Shell", number: "1", keywords: "download zip setup update portable" },
    { id: "launch", label: "Open your first session", number: "2", keywords: "launch start help terminal" },
  ] },
  { title: "Make it yours", topics: [
    { id: "customization", label: "Choose your look", number: "3", keywords: "theme ocean dusk midnight icons suggestions config" },
    { id: "startup", label: "Save your preferences", number: "4", keywords: "persist startup default environment settings config font" },
    { id: "commands", label: "Try your first commands", number: "5", keywords: "ls cat mkdir echo tree files use" },
  ] },
  { title: "Keep exploring", topics: [
    { id: "shortcuts", label: "Keyboard shortcuts", number: "", keywords: "tab completion history search control" },
    { id: "troubleshooting", label: "Troubleshooting", number: "", keywords: "error not recognized missing profile font boxes fix" },
    { id: "build-from-source", label: "Build from source", number: "", keywords: "rust cargo developer release" },
    { id: "limitations", label: "Current limitations", number: "", keywords: "scripts scripting pipes redirection roadmap" },
  ] },
];
const topics = groups.flatMap(group => group.topics);

export function DocsNav() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let frame = 0;
    function update() {
      let current = "overview";
      for (const topic of topics) {
        const section = document.getElementById(topic.id);
        if (section && section.getBoundingClientRect().top <= 150) current = topic.id;
      }
      setActive(current);
      frame = 0;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  const filtered = groups.map(group => ({ ...group, topics: group.topics.filter(topic => `${topic.label} ${topic.keywords}`.toLowerCase().includes(query.trim().toLowerCase())) }));
  return <aside className="guide-nav" aria-label="Documentation navigation">
    <button className="guide-mobile-toggle" aria-expanded={open} aria-controls="guide-navigation" onClick={() => setOpen(!open)}><span><Icon name="book" /> On this page</span><Icon name={open ? "close" : "menu"} /></button>
    <div id="guide-navigation" className={`guide-nav-content${open ? " is-open" : ""}`}>
      <a className="guide-nav-title" href="#overview"><Icon name="book" /> Documentation</a>
      <label className="guide-search"><Icon name="search" /><input aria-label="Search documentation topics" placeholder="Find a topic…" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <nav aria-label="Documentation topics">{filtered.filter(group => group.topics.length > 0).map(group => <div className="guide-nav-group" key={group.title}>
        <p>{group.title}</p>{group.topics.map(topic => <a key={topic.id} href={`#${topic.id}`} aria-current={active === topic.id ? "location" : undefined} onClick={() => { setActive(topic.id); setOpen(false); }}>{topic.number ? <span className="guide-nav-number">{topic.number}</span> : <span className="guide-nav-dot" />}{topic.label}</a>)}
      </div>)}</nav>
      {filtered.every(group => !group.topics.length) && <p className="guide-search-empty" role="status">No topics found. Try “theme”, “install”, or “commands”.</p>}
      <a className="guide-reference" href="/reference.md" download><Icon name="download" /> Full command reference</a><p className="guide-nav-note">Windows x64 <span>•</span> Open source</p>
    </div>
  </aside>;
}
