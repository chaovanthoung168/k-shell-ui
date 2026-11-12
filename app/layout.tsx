import type { Metadata } from "next";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import "./globals.css";
import "./redesign.css";
import "./window-theme.css";
import "./typography.css";

export const metadata: Metadata = {
  title: { default: "K Shell — A smarter shell for Windows", template: "%s | K Shell" },
  description: "A modern, customizable Windows shell built with Rust. Discover native commands, intelligent completion, syntax highlighting, and persistent history.",
  icons: { icon: "/icon.svg" },
};

const themeScript = `(function(){var t;try{t=localStorage.getItem('kshell-color-mode')}catch(e){}if(t!=='light'&&t!=='dark')t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />{children}<SiteFooter />
      </body>
    </html>
  );
}
