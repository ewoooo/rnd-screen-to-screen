"use client";

import { createUsePuck } from "@puckeditor/core";
import { useEffect, useMemo, useState } from "react";
import type { ScreenItem } from "@/app/api/screens/route";
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
  const [screens, setScreens] = useState<ScreenItem[]>([]);
  const [policyFiles, setPolicyFiles] = useState<PolicyFile[]>([]);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

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

  useEffect(() => {
    fetch("/api/screens").then((r) => r.json()).then(setScreens);
    fetch("/api/policy-files").then((r) => r.json()).then(setPolicyFiles);
  }, []);

  const screenGroups = useMemo(() => {
    const map = new Map<string, ScreenItem[]>();
    for (const s of screens) {
      if (!map.has(s.group)) map.set(s.group, []);
      map.get(s.group)!.push(s);
    }
    return map;
  }, [screens]);

  const policyGroups = useMemo(() => {
    const map = new Map<string, PolicyFile[]>();
    for (const p of policyFiles) {
      const key = `${p.domain}/${p.group}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return map;
  }, [policyFiles]);

  return (
    <div style={styles.panel}>
      {/* ── 화면 ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>화면</span>
          {loadedScreenPath && (
            <button type="button" style={styles.clearBtn} onClick={() => onLoadedToCanvas(null)}>
              ✕
            </button>
          )}
        </div>
        <div style={styles.listWrap}>
          {[...screenGroups.entries()].map(([group, items]) => (
            <div key={group}>
              <div style={styles.groupLabel}>{group}</div>
              {items.map((s) => {
                const isLoaded = loadedScreenPath === s.relPath;
                const isLoading = loadingPath === s.relPath;
                return (
                  <div key={s.relPath} style={{ ...styles.item, ...(isLoaded ? styles.itemLoaded : {}) }}>
                    <button
                      type="button"
                      style={styles.itemMain}
                      disabled={!!loadingPath}
                      onClick={() => loadIntoCanvas(s.relPath)}
                      title="Puck 캔버스에 블록으로 불러오기"
                    >
                      {isLoaded && <span style={styles.dot} />}
                      <span style={styles.itemId}>{s.id}</span>
                      {isLoading && <span style={styles.spinner}>…</span>}
                    </button>
                    <button
                      type="button"
                      style={styles.previewBtn}
                      onClick={() => onPreviewScreen(s.relPath)}
                      title="미리보기"
                    >
                      ↗
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* ── 정책서 ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>정책서</span>
          {selectedPolicyGroup && (
            <button type="button" style={styles.clearBtn} onClick={() => onSelectPolicyGroup(null)}>
              ✕
            </button>
          )}
        </div>
        <div style={styles.listWrap}>
          {[...policyGroups.entries()].map(([key, items]) => {
            const first = items[0];
            const isActive = selectedPolicyGroup === first?.group;
            return (
              <button
                key={key}
                type="button"
                style={{ ...styles.policyItem, ...(isActive ? styles.policyItemActive : {}) }}
                onClick={() => onSelectPolicyGroup(isActive ? null : (first?.group ?? null))}
              >
                <span style={{ ...styles.policyBadge, ...(isActive ? styles.policyBadgeActive : {}) }}>
                  {first?.group}
                </span>
                <span style={styles.policyDomain}>{first?.domain}</span>
                <span style={styles.policyCount}>{items.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    display: "flex" as const,
    flexDirection: "column" as const,
    height: "100%",
    background: "#fafafa",
    fontFamily: "system-ui, sans-serif",
    fontSize: 12,
    color: "#374151",
    overflow: "hidden" as const,
  },
  section: {
    display: "flex" as const,
    flexDirection: "column" as const,
    flex: 1,
    minHeight: 0,
    overflow: "hidden" as const,
  },
  sectionHeader: {
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    padding: "10px 14px 6px",
    borderBottom: "1px solid #f3f4f6",
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  clearBtn: {
    background: "none",
    border: "none",
    cursor: "pointer" as const,
    color: "#9ca3af",
    fontSize: 11,
    padding: "0 2px",
    lineHeight: 1,
  },
  listWrap: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "4px 0 8px",
  },
  groupLabel: {
    padding: "6px 14px 2px",
    fontSize: 10,
    fontWeight: 600,
    color: "#c4c9d4",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  },
  item: {
    display: "flex" as const,
    alignItems: "center" as const,
    width: "100%",
    borderBottom: "1px solid #f9fafb",
  },
  itemLoaded: {
    background: "#f0fdf4",
  },
  itemMain: {
    flex: 1,
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 6,
    padding: "6px 10px 6px 14px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    cursor: "pointer" as const,
    fontSize: 11,
    color: "#374151",
    minWidth: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#22c55e",
    flexShrink: 0,
  },
  itemId: {
    flex: 1,
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
    whiteSpace: "nowrap" as const,
  },
  spinner: {
    color: "#9ca3af",
    fontSize: 11,
    flexShrink: 0,
  },
  previewBtn: {
    flexShrink: 0,
    padding: "4px 8px",
    marginRight: 6,
    background: "none",
    border: "none",
    cursor: "pointer" as const,
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 1,
  },
  divider: {
    height: 1,
    background: "#e5e7eb",
    flexShrink: 0,
  },
  policyItem: {
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 6,
    width: "100%",
    padding: "6px 14px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    cursor: "pointer" as const,
    fontSize: 11,
    color: "#374151",
    borderBottom: "1px solid #f9fafb",
  },
  policyItemActive: {
    background: "#111827",
    color: "#fff",
  },
  policyBadge: {
    fontSize: 10,
    fontWeight: 700,
    background: "#e5e7eb",
    borderRadius: 3,
    padding: "1px 5px",
    color: "#374151",
    flexShrink: 0,
  },
  policyBadgeActive: {
    background: "#374151",
    color: "#fff",
  },
  policyDomain: {
    flex: 1,
    color: "inherit",
    opacity: 0.6,
  },
  policyCount: {
    fontSize: 10,
    color: "#9ca3af",
    flexShrink: 0,
  },
} as const;
