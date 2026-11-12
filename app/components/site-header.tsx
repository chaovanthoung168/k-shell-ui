"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, Logo } from "./ui";
import { ThemeToggle } from "./theme-toggle";

// Add the project repository URL here when it is available.
const GITHUB_REPOSITORY_URL = "";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="K Shell home" onClick={() => setOpen(false)}>
          <span className="brand-logo"><Logo /></span>K Shell<span className="brand-label">for Windows</span>
        </Link>
        <nav aria-label="Main navigation" className={open ? "navigation is-open" : "navigation"}>
          {[["/", "Home"], ["/docs/", "Docs"], ["/about/", "About"]].map(([href, label]) => (
            <Link key={href} href={href} aria-current={(href === "/" ? pathname === "/" : pathname.startsWith(href.slice(0, -1))) ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          {GITHUB_REPOSITORY_URL ? (
            <a className="header-cta" href={GITHUB_REPOSITORY_URL} target="_blank" rel="noopener noreferrer"><Icon name="github" /><span>GitHub</span></a>
          ) : (
            <button type="button" className="header-cta" disabled title="GitHub repository coming soon"><Icon name="github" /><span>GitHub</span></button>
          )}
          <button className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  );
}
