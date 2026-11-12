"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Arrow, Icon, Logo } from "./ui";
export function SiteHeader() {
  const pathname = usePathname(); const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner"><Link className="brand" href="/" aria-label="K Shell home" onClick={()=>setOpen(false)}><span className="brand-logo"><Logo/></span>K Shell<span className="brand-label">for Windows</span></Link><nav aria-label="Main navigation" className={open ? "navigation is-open" : "navigation"}>{[["/", "Home"],["/docs/", "Docs"],["/about/", "About"]].map(([href,label])=><Link key={href} href={href} aria-current={(href === "/" ? pathname === "/" : pathname.startsWith(href.slice(0,-1))) ? "page" : undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><Link className="header-cta" href="/docs/#installation">Get K Shell <Arrow/></Link><button className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}><Icon name={open ? "close" : "menu"}/></button></div></header>;
}
