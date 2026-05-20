"use client";

import { Puck } from "@puckeditor/core";
import { useCallback, useRef, useState } from "react";
import { CanvasToolbar } from "./CanvasToolbar";
import { ComponentPanel } from "./ComponentPanel";
import { DraggableLine } from "./DraggableLine";
import { ImportPanel } from "./ImportPanel";
import { PolicyPanel } from "./PolicyPanel";
import { ScreenViewer } from "./ScreenViewer";

const CLAMP = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const LINE_THICKNESS = 12;

const DEFAULTS = {
  leftWidth: 260,
  rightWidth: 300,
  leftTopPct: 45,
  rightTopPct: 30,
  frameWidth: 390,
  frameHeight: 844,
};

export function EditorLayout() {
  const [leftWidth, setLeftWidth] = useState(DEFAULTS.leftWidth);
  const [rightWidth, setRightWidth] = useState(DEFAULTS.rightWidth);
  const [leftTopPct, setLeftTopPct] = useState(DEFAULTS.leftTopPct);
  const [rightTopPct, setRightTopPct] = useState(DEFAULTS.rightTopPct);
  const [frameWidth, setFrameWidth] = useState(DEFAULTS.frameWidth);
  const [frameHeight, setFrameHeight] = useState(DEFAULTS.frameHeight);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleAutoHeight = useCallback(() => {
    const shell = frameRef.current?.querySelector(".mobile-shell");
    if (shell) {
      const natural = (shell as HTMLElement).scrollHeight;
      if (natural > 0) { setFrameHeight(natural); return; }
    }
    // fallback: frame 자체 scrollHeight
    if (frameRef.current) {
      setFrameHeight(frameRef.current.scrollHeight || 844);
    }
  }, []);

  const [loadedScreenPath, setLoadedScreenPath] = useState<string | null>(null);
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
        height: "calc(100dvh - 48px)",
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
        {/* 캔버스 툴바 */}
        <CanvasToolbar
          width={frameWidth}
          height={frameHeight}
          onWidthChange={setFrameWidth}
          onHeightChange={setFrameHeight}
          onAutoHeight={handleAutoHeight}
        />

        {/* 로드 배너 */}
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

        {/* 프레임 영역 */}
        <div style={styles.canvasScroll}>
          {previewScreenPath ? (
            <ScreenViewer
              screenId={previewScreenPath.split("/")[1] ?? ""}
              relPath={previewScreenPath}
              onClose={() => setPreviewScreenPath(null)}
            />
          ) : (
            <div
              ref={frameRef}
              style={{
                width: frameWidth,
                height: frameHeight,
                overflow: "hidden",
                flexShrink: 0,
                background: "white",
                boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
                borderRadius: 2,
              }}
            >
              <Puck.Preview />
            </div>
          )}
        </div>
      </main>

      {/* ── 수평 드래그 라인 (오른쪽) ── */}
      <DraggableLine direction="horizontal" onDrag={onDragRight} />

      {/* ── 오른쪽 aside ── */}
      <aside data-aside="right" style={styles.aside}>
        <div style={styles.rightSection}>
          <div style={styles.sectionLabel}>속성 & 상태</div>
          <Puck.Fields />
        </div>
        <DraggableLine direction="vertical" onDrag={onDragRightV} />
        <div style={{ ...styles.rightSection, ...styles.rightSectionFlex }}>
          <div style={styles.sectionLabel}>컴포넌트 추가</div>
          <ComponentPanel />
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
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    background: "#f0f0f0",
  },
  canvasScroll: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "32px 24px",
    gap: 0,
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
  rightSection: {
    padding: "0 14px",
    overflow: "auto",
    minHeight: 0,
  },
  rightSectionFlex: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },
  sectionLabel: {
    padding: "12px 0 10px",
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
    fontFamily: "system-ui, sans-serif",
    borderBottom: "1px solid #f3f4f6",
    flexShrink: 0,
  },
} as const;
