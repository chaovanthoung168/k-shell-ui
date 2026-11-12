"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Icon } from "./ui";

const storageKey = "kshell-color-mode";
type Theme = "light" | "dark";

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
    const followSystem = () => {
      try {
        if (localStorage.getItem(storageKey)) return;
      } catch { /* System preference still works when storage is unavailable. */ }
      applyTheme(media.matches ? "dark" : "light");
    };
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      if (event.newValue === "dark" || event.newValue === "light") applyTheme(event.newValue);
      else followSystem();
    };
    media.addEventListener("change", followSystem);
    window.addEventListener("storage", syncStorage);
    return () => {
      media.removeEventListener("change", followSystem);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* Keep the session choice. */ }
  }

  return (
    <button className="theme-toggle" role="switch" aria-label="Dark mode" aria-checked={theme === "dark"} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} onClick={toggle}>
      <span className="theme-toggle-thumb" />
      <Icon name="sun" /><Icon name="moon" />
    </button>
  );
}
