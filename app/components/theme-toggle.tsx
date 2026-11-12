"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Icon } from "./ui";

const storageKey = "kshell-color-mode";
type Theme = "light" | "dark";
let sessionPreference: Theme | null = null;

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function readPreference() {
  try {
    const value = localStorage.getItem(storageKey);
    return isTheme(value) ? value : null;
  } catch {
    return sessionPreference;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event("kshell-theme-change"));
}

function subscribe(callback: () => void) {
  window.addEventListener("kshell-theme-change", callback);
  return () => window.removeEventListener("kshell-theme-change", callback);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || "light",
    () => "light",
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    sessionPreference = readPreference();
    const followSystem = () => {
      if (!sessionPreference) applyTheme(media.matches ? "dark" : "light");
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      sessionPreference = isTheme(event.newValue) ? event.newValue : null;
      applyTheme(sessionPreference ?? (media.matches ? "dark" : "light"));
    };
    applyTheme(sessionPreference ?? (media.matches ? "dark" : "light"));
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", syncStorage);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  function chooseTheme(next: Theme) {
    // Select an explicit mode, independently of the server hydration snapshot.
    sessionPreference = next;
    applyTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* Keep the session choice. */ }
  }

  return (
    <div className="color-mode-control" role="group" aria-label="Color theme">
      <button type="button" className="color-mode-light" aria-label="Use light mode" aria-pressed={theme === "light"} onClick={() => chooseTheme("light")}><Icon name="sun" /><span>Light</span></button>
      <button type="button" className="color-mode-dark" aria-label="Use dark mode" aria-pressed={theme === "dark"} onClick={() => chooseTheme("dark")}><Icon name="moon" /><span>Dark</span></button>
    </div>
  );
}
