"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui";

const groups = [
  { title: "Get started", topics: [
    { id: "overview", label: "Before you begin", number: "", keywords: "windows requirements powershell" },
    { id: "installation", label: "Install K Shell", number: "1", keywords: "download zip setup update portable" },
    { id: "launch", label: "First session", number: "2", keywords: "launch open start help terminal" },
  ] },
  { title: "Make it yours", topics: [
    { id: "customization", label: "Appearance", number: "3", keywords: "choose theme ocean dusk midnight icons suggestions config" },
    { id: "install-theme", label: "Install a theme", number: "", keywords: "prompt design picker offline powerline atomic bubblesline cert negligible default" },
    { id: "startup", label: "Startup preferences", number: "4", keywords: "save persist startup default environment settings config font" },
    { id: "commands", label: "First commands", number: "5", keywords: "try ls cat mkdir echo tree files use" },
  ] },
  { title: "Keep exploring", topics: [
    { id: "package-manager", label: "Kpm package manager", number: "", keywords: "kpm package install developer tools node python go rust php git java jdk temurin versions switch upgrade uninstall recover winget" },
    { id: "http-client", label: "kreq HTTP client", number: "", keywords: "http https api rest kreq request json post get download headers authentication token timeout" },
    { id: "shortcuts", label: "Keyboard shortcuts", number: "", keywords: "tab completion history search control" },
    { id: "troubleshooting", label: "Troubleshooting", number: "", keywords: "error not recognized missing profile font boxes fix" },
    { id: "uninstall", label: "Uninstall K Shell", number: "", keywords: "remove uninstall delete cleanup path preferences history portable" },
    { id: "build-from-source", label: "Build from source", number: "", keywords: "rust cargo developer release" },
    { id: "limitations", label: "Current limitations", number: "", keywords: "scripts scripting pipes redirection roadmap" },
  ] },
];
const topics = groups.flatMap(group => group.topics);

export function DocsNav() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);
  const search = useRef<HTMLInputElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
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
  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (event.key !== "/" || event.ctrlKey || event.altKey || event.metaKey || (event.target instanceof HTMLElement && (event.target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)))) return;
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => search.current?.focus());
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);
  const filtered = groups.map(group => ({ ...group, topics: group.topics.filter(topic => `${topic.label} ${topic.keywords}`.toLowerCase().includes(query.trim().toLowerCase())) }));
  return <aside className="guide-nav" aria-label="Documentation navigation">
    <button ref={mobileToggle} className="guide-mobile-toggle" aria-expanded={open} aria-controls="guide-navigation" onClick={() => setOpen(!open)}><span><Icon name="book" /> {topics.find(topic => topic.id === active)?.label ?? "On this page"}</span><span className="guide-mobile-label">Topics <Icon name={open ? "close" : "menu"} /></span></button>
    <div id="guide-navigation" className={`guide-nav-content${open ? " is-open" : ""}`}>
      <a className="guide-nav-title" href="#overview">Documentation</a>
      <label className="guide-search"><Icon name="search" /><input ref={search} aria-label="Search documentation topics" placeholder="Find a topic" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "Escape") { setQuery(""); setOpen(false); mobileToggle.current?.focus({ preventScroll: true }); } }} /><kbd aria-hidden="true">/</kbd></label>
      <nav aria-label="Documentation topics">{filtered.filter(group => group.topics.length > 0).map(group => <div className="guide-nav-group" key={group.title}>
        <p>{group.title}</p>{group.topics.map(topic => <a key={topic.id} href={`#${topic.id}`} aria-current={active === topic.id ? "location" : undefined} onClick={() => { setActive(topic.id); setOpen(false); }}>{topic.label}</a>)}
      </div>)}</nav>
      {filtered.every(group => !group.topics.length) && <p className="guide-search-empty" role="status">No topics found. Try “theme”, “install”, or “commands”.</p>}
      <a className="guide-reference" href="/reference.md" download><Icon name="download" /> Full command reference</a><p className="guide-nav-note">Windows x64 <span>•</span> Open source</p>
    </div>
  </aside>;
}
