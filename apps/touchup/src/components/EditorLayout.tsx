"use client";

import { Puck } from "@puckeditor/core";
import { useCallback, useRef, useState } from "react";
import { CanvasToolbar } from "./CanvasToolbar";
import { ComponentPanel } from "./ComponentPanel";
import { ImportPanel } from "./ImportPanel";
import { PolicyPanel } from "./PolicyPanel";
import { ScreenViewer } from "./ScreenViewer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const DEFAULTS = {
  frameWidth: 390,
  frameHeight: 844,
};

export function EditorLayout() {
  const [frameWidth, setFrameWidth] = useState(DEFAULTS.frameWidth);
  const [frameHeight, setFrameHeight] = useState(DEFAULTS.frameHeight);
  const [loadedScreenPath, setLoadedScreenPath] = useState<string | null>(null);
  const [previewScreenPath, setPreviewScreenPath] = useState<string | null>(null);
  const [selectedPolicyGroup, setSelectedPolicyGroup] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleAutoHeight = useCallback(() => {
    const shell = frameRef.current?.querySelector(".mobile-shell");
    if (shell) {
      const natural = (shell as HTMLElement).scrollHeight;
      if (natural > 0) { setFrameHeight(natural); return; }
    }
    if (frameRef.current) setFrameHeight(frameRef.current.scrollHeight || 844);
  }, []);

  const loadedScreenId = loadedScreenPath?.split("/")[1] ?? null;

  return (
    <div className="h-[calc(100dvh-48px)] bg-[#111111] p-2">
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-full"
    >
      {/* ── 왼쪽 ── */}
      <ResizablePanel id="left" order={1} defaultSize="20%" minSize="12%" maxSize="35%">
        <ResizablePanelGroup orientation="vertical" className="gap-0">
          <ResizablePanel id="left-top" order={1} defaultSize="45%" minSize="15%">
            <div className="rounded-xl border bg-card h-full overflow-hidden flex flex-col">
              <ImportPanel
                loadedScreenPath={loadedScreenPath}
                onLoadedToCanvas={setLoadedScreenPath}
                onPreviewScreen={(p) => setPreviewScreenPath(p)}
                selectedPolicyGroup={selectedPolicyGroup}
                onSelectPolicyGroup={setSelectedPolicyGroup}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-transparent my-1 [&>div]:bg-white/20" />

          <ResizablePanel id="left-bottom" order={2} defaultSize="55%" minSize="15%">
            <div className="rounded-xl border bg-card h-full overflow-hidden flex flex-col">
              <PolicyPanel groupFilter={selectedPolicyGroup} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-transparent mx-1 [&>div]:bg-white/20" />

      {/* ── 캔버스 ── */}
      <ResizablePanel id="canvas" order={2} defaultSize="55%">
        <div className="h-full flex flex-col overflow-hidden">
          <CanvasToolbar
            width={frameWidth}
            height={frameHeight}
            onWidthChange={setFrameWidth}
            onHeightChange={setFrameHeight}
            onAutoHeight={handleAutoHeight}
          />

          {loadedScreenId && (
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-yellow-950/60 border-b border-yellow-700/30 text-xs text-yellow-200/80 shrink-0">
              <span><strong className="text-yellow-100">{loadedScreenId}</strong> 불러옴 — Publish 전까지 저장 안 됨</span>
              <button type="button" className="text-yellow-400/60 hover:text-yellow-300 cursor-pointer" onClick={() => setLoadedScreenPath(null)}>✕</button>
            </div>
          )}

          <div className="flex-1 overflow-auto flex flex-col items-center justify-start p-8">
            {previewScreenPath ? (
              <ScreenViewer
                screenId={previewScreenPath.split("/")[1] ?? ""}
                relPath={previewScreenPath}
                onClose={() => setPreviewScreenPath(null)}
              />
            ) : (
              <div
                ref={frameRef}
                style={{ width: frameWidth, height: frameHeight }}
                className="overflow-hidden shrink-0 bg-white rounded-sm shadow-2xl"
              >
                <Puck.Preview />
              </div>
            )}
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-transparent mx-1 [&>div]:bg-white/20" />

      {/* ── 오른쪽 ── */}
      <ResizablePanel id="right" order={3} defaultSize="25%" minSize="15%" maxSize="40%">
        <ResizablePanelGroup orientation="vertical" className="gap-0">
          <ResizablePanel id="right-top" order={1} defaultSize="30%" minSize="15%">
            <div className="rounded-xl border bg-card h-full overflow-auto px-3.5">
              <div className={sectionTitle}>속성 & 상태</div>
              <Puck.Fields />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-transparent my-1 [&>div]:bg-white/20" />

          <ResizablePanel id="right-bottom" order={2} defaultSize="70%" minSize="15%">
            <div className="rounded-xl border bg-card h-full overflow-hidden flex flex-col">
              <ComponentPanel />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  );
}

const sectionTitle = "text-sm font-semibold text-white py-3 border-b border-white/8 shrink-0";