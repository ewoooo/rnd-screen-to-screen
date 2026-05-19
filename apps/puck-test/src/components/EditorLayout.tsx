"use client";

import { Puck } from "@puckeditor/core";
import { useCallback, useState } from "react";
import { DraggableLine } from "./DraggableLine";
import { PolicyPanel } from "./PolicyPanel";
import { ImportPanel } from "./ImportPanel";
import { CodeViewer } from "./CodeViewer";

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

  const [selectedScreenPath, setSelectedScreenPath] = useState<string | null>(null);
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
            selectedScreenPath={selectedScreenPath}
            onSelectScreen={setSelectedScreenPath}
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
        {selectedScreenPath ? (
          <CodeViewer
            relPath={selectedScreenPath}
            onClose={() => setSelectedScreenPath(null)}
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
    borderRight: "1px solid #e5e7eb",
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
