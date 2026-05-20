"use client";

import { Puck } from "@puckeditor/core";
import { useCallback, useState } from "react";
import { DraggableLine } from "./DraggableLine";
import { PolicyPanel } from "./PolicyPanel";
import { ImportPanel } from "./ImportPanel";
import { ScreenViewer } from "./ScreenViewer";

const CLAMP = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const LINE_THICKNESS = 12;

const DEFAULTS = {
  leftWidth: 260,
  rightWidth: 300,
  leftTopPct: 45,
  rightTopPct: 45,
};

export function EditorLayout() {
  const [leftWidth, setLeftWidth] = useState(DEFAULTS.leftWidth);
  const [rightWidth, setRightWidth] = useState(DEFAULTS.rightWidth);
  const [leftTopPct, setLeftTopPct] = useState(DEFAULTS.leftTopPct);
  const [rightTopPct, setRightTopPct] = useState(DEFAULTS.rightTopPct);

  // 현재 Puck 캔버스에 로드된 Screen (없으면 null)
  const [loadedScreenPath, setLoadedScreenPath] = useState<string | null>(null);
  // 미리보기 뷰어로 열린 Screen
  const [previewScreenPath, setPreviewScreenPath] = useState<string | null>(null);
  const [selectedPolicyGroup, setSelectedPolicyGroup] = useState<string | null>(null);

  const onDragLeft = useCallback(({ x }: { x: number; y: number }) => {
    setLeftWidth(CLAMP(x, 160, 480));
  }, []);

  const onDragRight = useCallback(({ x }: { x: number; y: number }) => {
    setRightWidth(CLAMP(window.innerWidth - x, 200, 480));
  }, []);

  const onDragLeftV = useCallback(({ y }: { x: number; y: number }) => {
    const aside = document.querySelector("[data-aside=left]");
    if (!aside) return;
    const rect = aside.getBoundingClientRect();
    setLeftTopPct(CLAMP(((y - rect.top) / rect.height) * 100, 15, 85));
  }, []);

  const onDragRightV = useCallback(({ y }: { x: number; y: number }) => {
    const aside = document.querySelector("[data-aside=right]");
    if (!aside) return;
    const rect = aside.getBoundingClientRect();
    setRightTopPct(CLAMP(((y - rect.top) / rect.height) * 100, 15, 85));
  }, []);

  const loadedScreenId = loadedScreenPath?.split("/")[1] ?? null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${leftWidth}px ${LINE_THICKNESS}px 1fr ${LINE_THICKNESS}px ${rightWidth}px`,
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      {/* ── 왼쪽 aside ── */}
      <aside data-aside="left" style={styles.aside}>
        <div style={{ flex: `0 0 ${leftTopPct}%`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <ImportPanel
            loadedScreenPath={loadedScreenPath}
            onLoadedToCanvas={setLoadedScreenPath}
            onPreviewScreen={(p) => setPreviewScreenPath(p)}
            selectedPolicyGroup={selectedPolicyGroup}
            onSelectPolicyGroup={setSelectedPolicyGroup}
          />
        </div>

        <DraggableLine direction="vertical" onDrag={onDragLeftV} />

        <div style={styles.asideSection}>
          <PolicyPanel groupFilter={selectedPolicyGroup} />
        </div>
      </aside>

      {/* ── 수평 드래그 라인 (왼쪽) ── */}
      <DraggableLine direction="horizontal" onDrag={onDragLeft} />

      {/* ── 캔버스 ── */}
      <main style={styles.canvas}>
        {loadedScreenId && (
          <div style={styles.banner}>
            <span>
              <strong>{loadedScreenId}</strong> 불러옴 — Publish 전까지 저장 안 됨
            </span>
            <button
              type="button"
              style={styles.bannerClose}
              onClick={() => setLoadedScreenPath(null)}
            >
              ✕
            </button>
          </div>
        )}
        {previewScreenPath ? (
          <ScreenViewer
            screenId={previewScreenPath.split("/")[1] ?? ""}
            relPath={previewScreenPath}
            onClose={() => setPreviewScreenPath(null)}
          />
        ) : (
          <Puck.Preview />
        )}
      </main>

      {/* ── 수평 드래그 라인 (오른쪽) ── */}
      <DraggableLine direction="horizontal" onDrag={onDragRight} />

      {/* ── 오른쪽 aside ── */}
      <aside data-aside="right" style={styles.aside}>
        <div style={{ flex: `0 0 ${rightTopPct}%`, overflow: "auto" }}>
          <div style={styles.sectionLabel}>속성</div>
          <Puck.Fields />
        </div>

        <DraggableLine direction="vertical" onDrag={onDragRightV} />

        <div style={styles.asideSection}>
          <div style={styles.sectionLabel}>컴포넌트</div>
          <Puck.Components />
        </div>
      </aside>
    </div>
  );
}

const styles = {
  aside: {
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
  },
  asideSection: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    minHeight: 0,
  },
  canvas: {
    overflow: "auto",
    background: "#f0f0f0",
    display: "flex",
    flexDirection: "column" as const,
  },
  banner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 14px",
    background: "#fef9c3",
    borderBottom: "1px solid #fde047",
    fontSize: 11,
    color: "#713f12",
    fontFamily: "system-ui, sans-serif",
    flexShrink: 0,
  },
  bannerClose: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#a16207",
    fontSize: 12,
    padding: "0 2px",
  },
  sectionLabel: {
    padding: "10px 14px 6px",
    fontSize: 11,
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    fontFamily: "system-ui, sans-serif",
    borderBottom: "1px solid #f3f4f6",
    flexShrink: 0,
  },
} as const;
