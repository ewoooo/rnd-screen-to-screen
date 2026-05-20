"use client";

import { useEffect, useState } from "react";

type Props = {
  screenId: string;
  relPath: string;
  onClose: () => void;
};

type Tab = "render" | "source";

const MOBILE_PORT = 3001;

export function ScreenViewer({ screenId, relPath, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("render");
  const [code, setCode] = useState<string | null>(null);
  const [loadingCode, setLoadingCode] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const mobileUrl = `http://localhost:${MOBILE_PORT}/${screenId}`;
  const filename = relPath.split("/").slice(-2).join("/");

  useEffect(() => {
    setCode(null);
    setTab("render");
    setIframeKey((k) => k + 1);
  }, [relPath]);

  const handleTabSource = () => {
    setTab("source");
    if (!code) {
      setLoadingCode(true);
      fetch(`/api/screen-content?path=${encodeURIComponent(relPath)}`)
        .then((r) => r.text())
        .then((text) => { setCode(text); setLoadingCode(false); })
        .catch(() => { setCode("// 파일을 불러올 수 없습니다."); setLoadingCode(false); });
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.tabs}>
          <button
            type="button"
            style={{ ...styles.tab, ...(tab === "render" ? styles.tabActive : {}) }}
            onClick={() => setTab("render")}
          >
            렌더링
          </button>
          <button
            type="button"
            style={{ ...styles.tab, ...(tab === "source" ? styles.tabActive : {}) }}
            onClick={handleTabSource}
          >
            소스
          </button>
        </div>
        <span style={styles.filepath}>{filename}</span>
        <button type="button" style={styles.closeBtn} onClick={onClose}>
          ← 에디터로
        </button>
      </div>

      <div style={styles.body}>
        {tab === "render" ? (
          <div style={styles.iframeWrap}>
            <iframe
              key={iframeKey}
              src={mobileUrl}
              style={styles.iframe}
              title={screenId}
              sandbox="allow-scripts allow-same-origin"
            />
            <div style={styles.iframeLabel}>
              <a href={mobileUrl} target="_blank" rel="noreferrer" style={styles.iframeLink}>
                {mobileUrl} ↗
              </a>
            </div>
          </div>
        ) : (
          <div style={styles.codeWrap}>
            {loadingCode ? (
              <div style={styles.loading}>불러오는 중…</div>
            ) : (
              <pre style={styles.pre}>{code}</pre>
            )}
          </div>
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
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 12,
    padding: "0 16px",
    background: "#16161e",
    borderBottom: "1px solid #313244",
    flexShrink: 0,
    height: 40,
  },
  tabs: {
    display: "flex" as const,
    gap: 2,
    flexShrink: 0,
  },
  tab: {
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#6c7086",
    fontSize: 12,
    padding: "0 10px",
    height: 40,
    cursor: "pointer" as const,
    fontFamily: "system-ui, sans-serif",
  },
  tabActive: {
    color: "#cdd6f4",
    borderBottomColor: "#89b4fa",
  },
  filepath: {
    flex: 1,
    fontSize: 11,
    color: "#45475a",
    fontFamily: "monospace",
    overflow: "hidden" as const,
    whiteSpace: "nowrap" as const,
    textOverflow: "ellipsis" as const,
  },
  closeBtn: {
    background: "none",
    border: "1px solid #45475a",
    borderRadius: 4,
    color: "#a6adc8",
    fontSize: 11,
    padding: "3px 10px",
    cursor: "pointer" as const,
    flexShrink: 0,
  },
  body: {
    flex: 1,
    overflow: "hidden" as const,
    display: "flex" as const,
    flexDirection: "column" as const,
  },
  iframeWrap: {
    flex: 1,
    display: "flex" as const,
    flexDirection: "column" as const,
    overflow: "hidden" as const,
  },
  iframe: {
    flex: 1,
    border: "none",
    width: "100%",
    height: "100%",
    background: "#fff",
  },
  iframeLabel: {
    padding: "4px 12px",
    background: "#13131a",
    flexShrink: 0,
  },
  iframeLink: {
    fontSize: 10,
    color: "#45475a",
    textDecoration: "none",
    fontFamily: "monospace",
  },
  codeWrap: {
    flex: 1,
    overflow: "auto" as const,
    padding: "16px",
    background: "#1e1e2e",
  },
  pre: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.6,
    color: "#cdd6f4",
    whiteSpace: "pre" as const,
    fontFamily: "monospace",
    tabSize: 2,
  },
  loading: {
    color: "#6c7086",
    fontSize: 13,
    padding: 16,
  },
} as const;
