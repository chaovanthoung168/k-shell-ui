import { useId, type ReactNode } from "react";

// Use the supplied pixels as a luminance mask so the original artwork follows
// the surrounding foreground color without its black rectangular background.
function BrandArtwork({ wordmark = false }: { wordmark?: boolean }) {
  const id = useId();
  const maskId = `${id}-artwork`;
  const clipId = `${id}-symbol`;
  return (
    <svg className={wordmark ? "brand-wordmark" : undefined} viewBox={`228 288 ${wordmark ? 1088 : 476} 476`} fill="none" aria-hidden="true">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024" style={{ maskType: "luminance" }}>
          <image href="/kshell-logo.png" width="1536" height="1024" />
        </mask>
        {!wordmark && <clipPath id={clipId}><path d="M228 288H704V313L509 504L632 668H481L408 574L228 761Z" /></clipPath>}
      </defs>
      <rect x="228" y="288" width={wordmark ? 1088 : 476} height="476" fill="currentColor" mask={`url(#${maskId})`} clipPath={wordmark ? undefined : `url(#${clipId})`} />
    </svg>
  );
}

export function Logo() { return <BrandArtwork />; }
export function Wordmark() { return <BrandArtwork wordmark />; }
export function Arrow() { return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
export function Icon({name}: {name:string}) {
  const paths: Record<string, ReactNode> = {
    github: <path fill="currentColor" stroke="none" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.09.67-3.74-1.31-3.74-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.06-1.24-5.06-5.49 0-1.21.43-2.2 1.14-2.97-.12-.28-.49-1.41.11-2.93 0 0 .93-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.52.23 2.65.11 2.93.71.77 1.14 1.76 1.14 2.97 0 4.26-2.59 5.21-5.07 5.49.4.34.75 1.02.75 2.06v3.04c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
    moon: <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>,
    pause: <><path d="M8 5v14M16 5v14" strokeWidth="3"/></>,
    play: <path d="m8 4 12 8-12 8V4Z"/>,
    terminal: <><path d="m6 8 4 4-4 4m7 0h5"/><rect x="2" y="3" width="20" height="18" rx="3"/></>,
    windows: <path d="m3 5 8-1v7H3V5Zm10-1 8-1v8h-8V4ZM3 13h8v7l-8-1v-6Zm10 0h8v8l-8-1v-7Z"/>,
    download: <path d="M12 3v12m-4-4 4 4 4-4M4 15v5h16v-5"/>,
    book: <path d="M12 6v15m0-15C8 3 5 3 2 4v15c4-1 6-1 10 2 4-3 6-3 10-2V4c-3-1-6-1-10 2Z"/>,
    code: <path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16"/>,
    folder: <path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>,
    file: <><path d="M14 3H5v18h14V8l-5-5Z"/><path d="M14 3v5h5M8 13h8M8 17h6"/></>,
    spark: <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2ZM20 2v4m-2-2h4"/>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.8 1.8 0 0 1 1-3.3h3a3 3 0 0 0 3-3c0-4.4-4-8-9-8Z"/><path d="M7 10h.01M10 6.5h.01M15 7h.01M6.5 14h.01" strokeWidth="3"/></>,
    history: <path d="M3 10a9 9 0 1 1 1 7M3 4v6h6m3-3v6l4 2"/>,
    sliders: <><path d="M4 6h7m4 0h5M4 12h2m4 0h10M4 18h10m4 0h2"/><circle cx="13" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/></>,
    rust: <><circle cx="12" cy="12" r="8"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2M9 16V8h4a2 2 0 0 1 0 4H9m4 0 3 4"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/></>,
    check: <path d="m5 12 4 4L20 5"/>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    heart: <path d="m12 21-8-8a5 5 0 0 1 8-6 5 5 0 0 1 8 6l-8 8Z"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.terminal}</svg>;
}
