"use client";

import { createUsePuck } from "@puckeditor/core";
import { useEffect, useState } from "react";
import type { ScreenGroup } from "@/app/api/screens/route";
import type { PolicyFile } from "@/app/api/policy-files/route";

const usePuck = createUsePuck();

type Props = {
  loadedScreenPath: string | null;
  onLoadedToCanvas: (relPath: string | null) => void;
  onPreviewScreen: (relPath: string | null) => void;
  selectedPolicyGroup: string | null;
  onSelectPolicyGroup: (group: string | null) => void;
};

export function ImportPanel({
  loadedScreenPath,
  onLoadedToCanvas,
  onPreviewScreen,
  selectedPolicyGroup,
  onSelectPolicyGroup,
}: Props) {
  const dispatch = usePuck((s) => s.dispatch);
  const [groups, setGroups] = useState<ScreenGroup[]>([]);
  const [policyFiles, setPolicyFiles] = useState<PolicyFile[]>([]);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  async function loadIntoCanvas(relPath: string) {
    if (loadingPath) return;
    setLoadingPath(relPath);
    try {
      const resp = await fetch(`/api/parse-screen?path=${encodeURIComponent(relPath)}`);
      const data = await resp.json();
      dispatch({ type: "setData", data } as Parameters<typeof dispatch>[0]);
      onLoadedToCanvas(relPath);
    } finally {
      setLoadingPath(null);
    }
  }

  function toggleGroup(key: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  useEffect(() => {
    fetch("/api/screens").then((r) => r.json()).then(setGroups);
    fetch("/api/policy-files").then((r) => r.json()).then(setPolicyFiles);
  }, []);

  const policyGroupMap = (() => {
    const map = new Map<string, PolicyFile[]>();
    for (const p of policyFiles) {
      const key = `${p.domain}/${p.group}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return map;
  })();

  return (
    <div className="flex flex-col h-full overflow-hidden text-xs">
      {/* ── 화면 ── */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/8 shrink-0">
          <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Screens</span>
          {loadedScreenPath && (
            <button
              type="button"
              onClick={() => onLoadedToCanvas(null)}
              className="text-white/30 hover:text-white/60 text-xs leading-none cursor-pointer transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
          {groups.map((group) => {
            const isOpen = !collapsed.has(group.key);
            return (
              <div key={group.key}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.key)}
                  className="flex items-center gap-1.5 w-full px-3.5 py-1.5 text-left hover:bg-white/4 transition-colors cursor-pointer"
                >
                  <span className="text-white/25 text-[10px] w-3 shrink-0">
                    {isOpen ? "▾" : "▸"}
                  </span>
                  <span className="flex-1 text-[11px] font-medium text-white/50 truncate">
                    {group.label}
                  </span>
                  <span className="text-[10px] text-white/20 shrink-0">{group.items.length}</span>
                </button>

                {isOpen && group.items.map((s) => {
                  const isLoaded = loadedScreenPath === s.relPath;
                  const isLoading = loadingPath === s.relPath;
                  const disabled = !s.hasScreen;
                  return (
                    <div
                      key={s.relPath}
                      className="relative flex items-center"
                      onMouseEnter={() => setHoveredPath(s.relPath)}
                      onMouseLeave={() => setHoveredPath(null)}
                    >
                      <button
                        type="button"
                        disabled={disabled || !!loadingPath}
                        onClick={() => loadIntoCanvas(s.relPath)}
                        className={[
                          "flex-1 flex items-center gap-1.5 pl-8 pr-3 py-1.5 text-left text-[11px] transition-colors min-w-0",
                          disabled
                            ? "opacity-35 cursor-default"
                            : "cursor-pointer hover:bg-white/5",
                          isLoaded
                            ? "text-emerald-400"
                            : "text-white/60 hover:text-white/85",
                        ].join(" ")}
                      >
                        <span className="flex-1 truncate">{s.id}</span>
                        {isLoaded && (
                          <span className="shrink-0 text-[9px] font-semibold text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-px whitespace-nowrap">
                            current
                          </span>
                        )}
                        {isLoading && (
                          <span className="shrink-0 text-white/30 text-[11px]">…</span>
                        )}
                      </button>

                      {disabled && hoveredPath === s.relPath && (
                        <span className="absolute right-2 z-10 text-[10px] text-white/50 bg-neutral-800 border border-white/10 rounded px-2 py-1 whitespace-nowrap pointer-events-none shadow-lg">
                          Screen.tsx 미생성
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-white/8 shrink-0" />

      {/* ── 정책서 ── */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/8 shrink-0">
          <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Policy</span>
          {selectedPolicyGroup && (
            <button
              type="button"
              onClick={() => onSelectPolicyGroup(null)}
              className="text-white/30 hover:text-white/60 text-xs leading-none cursor-pointer transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
          {[...policyGroupMap.entries()].map(([key, items]) => {
            const first = items[0];
            const isActive = selectedPolicyGroup === first?.group;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectPolicyGroup(isActive ? null : (first?.group ?? null))}
                className={[
                  "flex items-center gap-2 w-full px-3.5 py-1.5 text-left text-[11px] transition-colors cursor-pointer",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white/80",
                ].join(" ")}
              >
                <span className={[
                  "shrink-0 text-[10px] font-semibold rounded px-1.5 py-px",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/8 text-white/40",
                ].join(" ")}>
                  {first?.group}
                </span>
                <span className="flex-1 truncate opacity-60">{first?.domain}</span>
                <span className="shrink-0 text-[10px] text-white/20">{items.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
