"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "./ui";
import styles from "./choice-select.module.css";

type Choice = { value: string; label: string; description?: string; color?: string; preview?: ReactNode };

export function ChoiceSelect({ label, value, options, onChange, disabled = false }: {
  label: string;
  value: string;
  options: readonly Choice[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const typed = useRef({ text: "", time: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selected = Math.max(0, options.findIndex((option) => option.value === value));
  const expanded = open && !disabled;

  useEffect(() => {
    if (!expanded) return;
    function dismiss(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [expanded]);

  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }

  function handleKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!expanded) { setActive(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : selected); setOpen(true); }
      else setActive(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (active + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    } else if (expanded && ["Enter", " "].includes(event.key)) {
      event.preventDefault();
      choose(active);
    } else if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
    else if (event.key === "Tab") setOpen(false);
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== " ") {
      event.preventDefault();
      const now = Date.now();
      typed.current = { text: (now - typed.current.time < 600 ? typed.current.text : "") + event.key.toLowerCase(), time: now };
      const match = options.findIndex((option) => option.label.toLowerCase().startsWith(typed.current.text));
      if (match >= 0) { setActive(match); setOpen(true); }
    }
  }

  return <div className={styles.root} ref={root} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={trigger} type="button" role="combobox" aria-label={label} aria-haspopup="listbox" aria-expanded={expanded} aria-controls={`${id}-list`} aria-activedescendant={expanded ? `${id}-option-${active}` : undefined} disabled={disabled} className={styles.trigger} onKeyDown={handleKeys} onClick={() => { setActive(selected); setOpen(!expanded); }}>
      {options[selected]?.color && <i className={styles.swatch} style={{ background: options[selected].color }} aria-hidden="true" />}
      <span>{options[selected]?.label}</span><svg className={styles.chevron} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    {expanded && <div className={styles.list} id={`${id}-list`} role="listbox" aria-label={label}>
      {options.map((option, index) => <div id={`${id}-option-${index}`} key={option.value} role="option" aria-selected={option.value === value} data-active={active === index} className={styles.option} onPointerMove={() => setActive(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(index)}>
        {option.color && <i className={styles.swatch} style={{ background: option.color }} aria-hidden="true" />}
        <span><span>{option.label}</span>{option.description && <small>{option.description}</small>}</span>{option.preview && <span className={styles.preview} aria-hidden="true">{option.preview}</span>}<span className={styles.check}>{option.value === value && <Icon name="check" />}</span>
      </div>)}
    </div>}
  </div>;
}
