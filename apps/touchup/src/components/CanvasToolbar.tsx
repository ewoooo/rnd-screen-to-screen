"use client";

import { useEffect, useState } from "react";

type Props = {
  width: number;
  height: number;
  onWidthChange: (v: number) => void;
  onHeightChange: (v: number) => void;
  onAutoHeight: () => void;
};

function PxField({
  label,
  value,
  onChange,
  onKeyDown,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [local, setLocal] = useState(String(value));

  useEffect(() => { setLocal(String(value)); }, [value]);

  function commit() {
    const v = parseInt(local, 10);
    if (!isNaN(v) && v > 0) onChange(v);
    else setLocal(String(value));
  }

  return (
    <div style={styles.field}>
      <span style={styles.fieldLabel}>{label}</span>
      <input
        type="number"
        value={local}
        style={styles.input}
        onChange={(e) => setLocal(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") commit();
          onKeyDown?.(e);
        }}
        onBlur={commit}
      />
      <span style={styles.unit}>px</span>
    </div>
  );
}

export function CanvasToolbar({ width, height, onWidthChange, onHeightChange, onAutoHeight }: Props) {
  return (
    <div style={styles.bar}>
      <span style={styles.label}>Frame</span>
      <PxField label="W" value={width} onChange={onWidthChange} />
      <span style={styles.sep}>×</span>
      <PxField label="H" value={height} onChange={onHeightChange} />
      <button type="button" style={styles.autoBtn} onClick={onAutoHeight}>
        auto
      </button>
    </div>
  );
}

const styles = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    background: "rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexShrink: 0,
  } as const,

  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    marginRight: 4,
  } as const,

  field: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } as const,

  fieldLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    fontWeight: 500,
    width: 12,
  } as const,

  input: {
    width: 68,
    padding: "3px 6px",
    fontSize: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 4,
    background: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    textAlign: "right" as const,
    outline: "none",
  } as const,

  unit: {
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
  } as const,

  sep: {
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
  } as const,

  autoBtn: {
    padding: "2px 8px",
    fontSize: 11,
    background: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 4,
    cursor: "pointer",
    color: "rgba(255,255,255,0.4)",
  } as const,
};
