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
    background: "#f8f8f8",
    borderBottom: "1px solid #e5e7eb",
    flexShrink: 0,
    fontFamily: "system-ui, sans-serif",
  } as const,

  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginRight: 4,
  } as const,

  field: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  } as const,

  fieldLabel: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: 500,
    width: 12,
  } as const,

  input: {
    width: 68,
    padding: "3px 6px",
    fontSize: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    background: "white",
    color: "#111827",
    textAlign: "right" as const,
    outline: "none",
    fontFamily: "system-ui, sans-serif",
  } as const,

  unit: {
    fontSize: 11,
    color: "#9ca3af",
  } as const,

  sep: {
    fontSize: 12,
    color: "#d1d5db",
  } as const,

  autoBtn: {
    padding: "2px 8px",
    fontSize: 11,
    background: "none",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    cursor: "pointer",
    color: "#6b7280",
    fontFamily: "system-ui, sans-serif",
  } as const,
};
