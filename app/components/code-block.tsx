"use client";
import { useState } from "react";
import { Icon } from "./ui";
export function CodeBlock({code, label="K Shell"}: {code:string;label?:string}) {
  const [state,setState]=useState("Copy");
  async function copy() {try {await navigator.clipboard.writeText(code);setState("Copied");} catch {setState("Select code to copy");} setTimeout(()=>setState("Copy"),2500);}
  return <div className="docs-code"><div><span>{label}</span><button onClick={copy} aria-label={`${state} ${label} commands`}><Icon name={state === "Copied" ? "check" : "copy"}/><span aria-live="polite">{state}</span></button></div><pre><code>{code}</code></pre></div>;
}
