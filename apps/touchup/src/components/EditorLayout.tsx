"use client";

import { Puck, createUsePuck } from "@puckeditor/core";
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
import { puckConfig } from "@/puck/config";
import { ORGANISM_SCHEMAS, type OgnFieldDef } from "@/puck/organism-schemas";

const usePuck = createUsePuck();

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
                        frameWidth={frameWidth}
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
  frameWidth,
}: {
  target: EditingOrganism;
  onClose: () => void;
  frameWidth: number;
}) {
  const label = target.type.replace(/^OGN\//, "");
  const schema = ORGANISM_SCHEMAS[target.type];

  const dispatch = usePuck((s) => s.dispatch);
  const data = usePuck((s) => s.appState.data);
  const props = usePuck((s) => s.appState.data.content.find((c) => c.props.id === target.id)?.props ?? {});

  const updateProp = (key: string, value: unknown) => {
    const newContent = data.content.map((item) =>
      item.props.id === target.id
        ? { ...item, props: { ...item.props, [key]: value } }
        : item
    );
    dispatch({ type: "setData", data: { ...data, content: newContent }, recordHistory: true } as Parameters<typeof dispatch>[0]);
  };

  const renderFn = (puckConfig.components as Record<string, { render: (p: Record<string, unknown>) => React.ReactNode }>)[target.type]?.render;

  return (
    <div
      style={{ width: frameWidth }}
      className="shrink-0 rounded-sm shadow-2xl overflow-hidden border border-white/10 flex flex-col"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-neutral-900 border-b border-white/10 px-3 py-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-widest text-white/30">Organism</span>
          <span className="text-[10px] text-white/15">·</span>
          <span className="text-xs font-semibold text-white/80">{label}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded text-white/35 hover:bg-white/8 hover:text-white transition-colors cursor-pointer"
          aria-label="Close organism editor"
        >
          <X size={12} />
        </button>
      </div>

      {/* organism 렌더링 */}
      <div className="bg-white overflow-y-auto shrink-0" style={{ minHeight: 120 }}>
        {renderFn ? renderFn(props) : (
          <div className="p-4 text-xs text-neutral-400">Render not found for {target.type}</div>
        )}
      </div>

      {/* 편집 fields */}
      {schema ? (
        <div className="bg-neutral-950 border-t border-white/8 px-3 pt-3 pb-4 overflow-y-auto">
          <div className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-3">Props</div>
          {Object.entries(schema.fields).map(([key, field]) => (
            <OgnField
              key={key}
              fieldKey={key}
              field={field}
              value={props[key]}
              onChange={(val) => updateProp(key, val)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-neutral-950 border-t border-white/8 px-3 py-4 text-[11px] text-white/25">
          편집 가능한 props 없음
        </div>
      )}
    </div>
  );
}

function OgnField({
  fieldKey,
  field,
  value,
  onChange,
}: {
  fieldKey: string;
  field: OgnFieldDef;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  return (
    <div className="mb-3">
      <span className="block text-[10px] font-medium text-white/40 uppercase tracking-widest mb-1.5 select-none">
        {field.label}
      </span>
      {field.type === "text" && (
        <input
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border bg-white/5 px-2.5 py-1.5 text-sm text-white border-white/10 focus:border-white/30 focus:outline-none transition-colors"
        />
      )}
      {field.type === "select" && (
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border bg-white/5 px-2.5 py-1.5 text-sm text-white border-white/10 focus:outline-none appearance-none cursor-pointer [&>option]:bg-neutral-900"
        >
          {field.options.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
          ))}
        </select>
      )}
      {field.type === "radio" && (
        <div className="flex items-center gap-0.5 rounded-md bg-white/6 p-0.5">
          {field.options.map((opt) => {
            const isActive = String(value) === String(opt.value);
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => onChange(opt.value)}
                className={[
                  "flex-1 text-center py-1 text-[11px] font-medium rounded transition-colors",
                  isActive ? "bg-white/15 text-white cursor-default" : "text-white/40 hover:text-white/65 cursor-pointer",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
