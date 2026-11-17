"use client";
import { useState } from "react";
import { Icon } from "./ui";
export function CodeBlock({code, label="K Shell", kind="command"}: {code:string;label?:string;kind?:"command" | "output"}) {
  const [state,setState]=useState("Copy");
  async function copy() {try {await navigator.clipboard.writeText(code);setState("Copied");} catch {setState("Select code to copy");} setTimeout(()=>setState("Copy"),2500);}
  return <div className="docs-code" data-kind={kind}><div><span>{label}</span><button type="button" onClick={copy} aria-label={`${state} ${label} ${kind === "output" ? "output" : "commands"}`}><Icon name={state === "Copied" ? "check" : "copy"}/><span aria-live="polite">{state}</span></button></div><pre tabIndex={kind === "output" ? 0 : undefined} aria-label={kind === "output" ? label : undefined}><code>{code}</code></pre></div>;
}
