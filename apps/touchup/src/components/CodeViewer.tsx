"use client";

import { useEffect, useState } from "react";

type Props = {
  relPath: string;
  onClose: () => void;
};

export function CodeViewer({ relPath, onClose }: Props) {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setCode(null);
    fetch(`/api/screen-content?path=${encodeURIComponent(relPath)}`)
      .then((r) => r.text())
      .then((text) => {
        setCode(text);
        setLoading(false);
      })
      .catch(() => {
        setCode("// 파일을 불러올 수 없습니다.");
        setLoading(false);
      });
  }, [relPath]);

  const filename = relPath.split("/").slice(-2).join("/"); // "SCREEN-ID/Screen.tsx"

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <span style={styles.filepath}>{filename}</span>
        <button type="button" style={styles.closeBtn} onClick={onClose}>
          ← 에디터로
        </button>
      </div>
      <div style={styles.codeWrap}>
        {loading ? (
          <div style={styles.loading}>불러오는 중…</div>
        ) : (
          <pre style={styles.pre}>{code}</pre>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex" as const,
    flexDirection: "column" as const,
    height: "100%",
    background: "#1e1e2e",
    fontFamily: "monospace",
  },
  header: {
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    padding: "8px 16px",
    background: "#16161e",
    borderBottom: "1px solid #313244",
    flexShrink: 0,
  },
  filepath: {
    fontSize: 12,
    color: "#cdd6f4",
    fontFamily: "monospace",
  },
  closeBtn: {
    background: "none",
    border: "1px solid #45475a",
    borderRadius: 4,
    color: "#a6adc8",
    fontSize: 11,
    padding: "3px 10px",
    cursor: "pointer" as const,
    fontFamily: "system-ui, sans-serif",
  },
  codeWrap: {
    flex: 1,
    overflow: "auto" as const,
    padding: "16px",
  },
  pre: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.6,
    color: "#cdd6f4",
    whiteSpace: "pre" as const,
    tabSize: 2,
  },
  loading: {
    color: "#6c7086",
    fontSize: 13,
    padding: 16,
    fontFamily: "system-ui, sans-serif",
  },
} as const;
