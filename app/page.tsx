import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Icon } from "./components/ui";
import { Hero } from "./components/hero";
import { FeatureCards } from "./components/feature-cards";
import { Quickstart } from "./components/quickstart";
import styles from "./home.module.css";

const sharingTitle = "K Shell — Windows, at your command";
const sharingDescription = "K Shell is a fast, customizable, open-source shell built with Rust. Linux-style commands, smart autocompletion and syntax highlighting, right in your Windows terminal.";

export const metadata: Metadata = {
  description: sharingDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "K Shell",
    title: sharingTitle,
    description: sharingDescription,
    images: [{ url: "/social-preview.png", width: 1200, height: 630, type: "image/png", alt: "K Shell logo over the homepage particle wave, with the headline Windows, at your command." }],
  },
  twitter: {
    card: "summary_large_image",
    title: sharingTitle,
    description: sharingDescription,
    images: [{ url: "/social-preview.png", alt: "K Shell — Windows, at your command" }],
  },
};

export default function Home() {
  return (
    <main id="main-content" className={styles.home}>
      <Hero />
      <FeatureCards />
      <section className={styles.native}><div className={`container ${styles.nativeGrid}`}><div className={styles.nativeCopy}><span className={styles.kicker}>Feels familiar. Works natively.</span><h2>Linux habits<br />Windows home</h2><p>Your favorite command-line habits, without leaving Windows. Navigate with <code>ls</code>, read with <code>cat</code>, and keep using the tools you already know.</p><Link className={styles.textLink} href="/docs/#commands">Find your first command <Arrow /></Link><div className={styles.tools} aria-label="Supported native tools"><span>Git</span><span>Cargo</span><span>Python</span><span>npm</span><span>VS Code</span></div></div><div className={styles.nativeList}><article><Icon name="windows" /><div><h3>Windows, first class</h3><p>A native executable that works in your terminal. No WSL or compatibility layer required.</p></div></article><article><Icon name="sliders" /><div><h3>Make yourself at home</h3><p>Choose Ocean, Dusk, or Midnight. Fine-tune your icons and suggestion styles.</p></div></article><article><Icon name="code" /><div><h3>Your tools come along</h3><p>Run Git, Cargo, Python, and your installed developer tools from one familiar prompt.</p></div></article></div></div></section>
      <Quickstart />
    </main>
  );
}
