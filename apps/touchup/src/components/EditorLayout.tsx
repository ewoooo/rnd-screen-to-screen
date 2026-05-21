"use client";

import { Puck } from "@puckeditor/core";
import { X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { CanvasToolbar } from "./CanvasToolbar";
import { ComponentPanel } from "./ComponentPanel";
import { ImportPanel } from "./ImportPanel";
import { PolicyPanel } from "./PolicyPanel";
import { ScreenViewer } from "./ScreenViewer";
import type { EditingOrganism } from "./organism-editor-types";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const DEFAULTS = {
  frameWidth: 390,
  frameHeight: 844,
};

export function EditorLayout({
  editingOrganism,
  onCloseOrganismEditor,
}: {
  editingOrganism: EditingOrganism | null;
  onCloseOrganismEditor: () => void;
}) {
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
      <ResizablePanel id="left" defaultSize="20%" minSize="12%" maxSize="35%">
        <ResizablePanelGroup orientation="vertical" className="gap-0">
          <ResizablePanel id="left-top" defaultSize="45%" minSize="15%">
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

          <ResizablePanel id="left-bottom" defaultSize="55%" minSize="15%">
            <div className="rounded-xl border bg-card h-full overflow-hidden flex flex-col">
              <PolicyPanel groupFilter={selectedPolicyGroup} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-transparent mx-1 [&>div]:bg-white/20" />

      {/* ── 캔버스 ── */}
      <ResizablePanel id="canvas" defaultSize="55%">
        <div className="h-full rounded-xl border bg-card overflow-hidden flex flex-col">
          <div className="px-3.5">
            <div className={sectionTitle}>Canvas</div>
          </div>
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

          <div className="flex-1 overflow-auto bg-black/20">
            {previewScreenPath ? (
              <div className="flex min-h-full items-start justify-center p-8">
                <ScreenViewer
                  screenId={previewScreenPath.split("/")[1] ?? ""}
                  relPath={previewScreenPath}
                  onClose={() => setPreviewScreenPath(null)}
                />
              </div>
            ) : (
              <div className="flex min-h-full items-start justify-center overflow-x-auto p-8">
                <div className="flex items-start justify-center transition-all duration-300 ease-out">
                  <div
                    ref={frameRef}
                    style={{ width: frameWidth, height: frameHeight }}
                    className="overflow-hidden shrink-0 bg-white rounded-sm shadow-2xl transition-transform duration-300 ease-out"
                  >
                    <Puck.Preview />
                  </div>

                  <div
                    style={{
                      width: editingOrganism ? frameWidth : 0,
                      marginLeft: editingOrganism ? 24 : 0,
                      opacity: editingOrganism ? 1 : 0,
                    }}
                    className="shrink-0 overflow-hidden transition-[width,margin,opacity] duration-300 ease-out"
                    aria-hidden={!editingOrganism}
                  >
                    {editingOrganism && (
                      <OrganismEditorShell
                        target={editingOrganism}
                        onClose={onCloseOrganismEditor}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-transparent mx-1 [&>div]:bg-white/20" />

      {/* ── 오른쪽 ── */}
      <ResizablePanel id="right" defaultSize="25%" minSize="15%" maxSize="40%">
        <ResizablePanelGroup orientation="vertical" className="gap-0">
          <ResizablePanel id="right-top" defaultSize="30%" minSize="15%">
            <div className="rounded-xl border bg-card h-full overflow-auto px-3.5">
              <div className={sectionTitle}>속성 & 상태</div>
              <Puck.Fields />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-transparent my-1 [&>div]:bg-white/20" />

          <ResizablePanel id="right-bottom" defaultSize="70%" minSize="15%">
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

const sectionTitle = "text-sm font-semibold text-white py-3 shrink-0";

function OrganismEditorShell({
  target,
  onClose,
}: {
  target: EditingOrganism;
  onClose: () => void;
}) {
  const label = target.type.replace(/^OGN\//, "");

  return (
    <div className="min-h-[360px] rounded-sm border border-white/12 bg-card shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
            Organism Canvas
          </div>
          <div className="text-sm font-semibold text-white">{label}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/8 hover:text-white"
          aria-label="Close organism editor"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-3">
        <div className="rounded-lg border border-dashed border-white/15 bg-black/20 p-4">
          <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 h-3 w-32 rounded bg-white/15" />
            <div className="space-y-2">
              <div className="h-8 rounded-md bg-white/8" />
              <div className="h-8 rounded-md bg-white/8" />
              <div className="h-8 rounded-md bg-white/8" />
            </div>
          </div>
          <div className="mt-3 text-xs leading-5 text-white/35">
            This is a temporary single-organism editing surface. It shares the
            Screen width and keeps height auto.
          </div>
        </div>
      </div>
    </div>
  );
}
