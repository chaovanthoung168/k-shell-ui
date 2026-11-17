"use client";

import { useEffect, useState } from "react";
import { Arrow } from "./ui";

type Entry = { id: string; label: string };
type Chapter = { id: string; label: string; element: HTMLElement; entries: Entry[] };
type Outline = { chapter: string; entries: Entry[]; active: string; next?: Entry };

export function DocsContents() {
  const [outline, setOutline] = useState<Outline | null>(null);

  useEffect(() => {
    let hashTarget: HTMLElement | undefined;
    const chapters: Chapter[] = Array.from(document.querySelectorAll<HTMLElement>(".guide-intro, .guide-step, .guide-reference-section")).map((section) => {
      const heading = section.querySelector("h1, h2");
      const entries = Array.from(section.querySelectorAll<HTMLElement>(":scope > h3")).map((subheading) => {
        if (!subheading.id) {
          subheading.id = `${section.id}-${subheading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
          if (window.location.hash === `#${subheading.id}`) hashTarget = subheading;
        }
        return { id: subheading.id, label: subheading.textContent ?? "" };
      });
      return { id: section.id, label: heading?.textContent ?? "", element: section, entries };
    });
    const setupEntries = chapters.slice(1, 6).map(({ id, label }) => ({ id, label }));
    hashTarget?.scrollIntoView({ block: "start" });
    let frame = 0;

    function update() {
      frame = 0;
      let index = 0;
      chapters.forEach((chapter, i) => { if (chapter.element.getBoundingClientRect().top <= 180) index = i; });
      const chapter = chapters[index];
      if (!chapter) return;
      const entries = chapter.entries.length ? chapter.entries : index < 6 ? setupEntries : [{ id: chapter.id, label: chapter.label }];
      let active = entries[0]?.id ?? chapter.id;
      entries.forEach((entry) => { if ((document.getElementById(entry.id)?.getBoundingClientRect().top ?? Infinity) <= 200) active = entry.id; });
      const next = chapters[index + 1];
      setOutline((current) => current?.chapter === chapter.id && current.active === active ? current : { chapter: chapter.id, entries, active, next: next ? { id: next.id, label: next.label } : undefined });
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  return <aside className="guide-contents" aria-label="Current chapter contents">
    {outline && <><nav aria-label="On this page"><p>On this page</p>{outline.entries.map((entry) => <a key={entry.id} href={`#${entry.id}`} aria-current={outline.active === entry.id ? "location" : undefined}>{entry.label}</a>)}</nav>
      {outline.next && <a className="guide-contents-next" href={`#${outline.next.id}`}><span>Next chapter</span><span>{outline.next.label}<Arrow /></span></a>}
      <a className="guide-contents-top" href="#overview">Back to top ↑</a>
    </>}
  </aside>;
}
