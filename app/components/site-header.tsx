"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, Logo } from "./ui";
import { ThemeToggle } from "./theme-toggle";
import { GITHUB_REPOSITORY_URL } from "../release";
import styles from "./header-controls.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header ${pathname === "/" ? styles.homeHeader : ""}`}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="K Shell home" onClick={() => setOpen(false)}>
          <span className="brand-logo"><Logo /></span><span className="brand-name">K Shell</span>
        </Link>
        <nav aria-label="Main navigation" className={open ? "navigation is-open" : "navigation"}>
          {[["/", "Home"], ["/playground/", "Playground"], ["/docs/", "Docs"], ["/about/", "About"]].map(([href, label]) => (
            <Link key={href} href={href} aria-current={(href === "/" ? pathname === "/" : pathname.startsWith(href.slice(0, -1))) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          {GITHUB_REPOSITORY_URL ? (
            <a className={styles.github} href={GITHUB_REPOSITORY_URL} target="_blank" rel="noopener noreferrer" aria-label="View K Shell on GitHub" title="View source on GitHub"><Icon name="github" /><span>GitHub</span></a>
          ) : (
            <button type="button" className={styles.github} disabled aria-label="GitHub repository coming soon" title="GitHub repository coming soon"><Icon name="github" /><span>GitHub</span></button>
          )}
          <button className={styles.menuButton} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  );
}
