import type { Metadata } from "next";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import "./globals.css";
export const metadata: Metadata = { title: { default: "K Shell — Your terminal. Your rules.", template: "%s | K Shell" }, description: "A modern, customizable Windows shell built with Rust. Discover native commands, intelligent completion, syntax highlighting, and persistent history.", icons: { icon: "/icon.svg" } };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader/>{children}<SiteFooter/></body></html>; }
