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
          {groups.map((group) => {
            const isOpen = !collapsed.has(group.key);
            return (
              <div key={group.key}>
                {/* 그룹 헤더 */}
                <button
                  type="button"
                  style={styles.groupHeader}
                  onClick={() => toggleGroup(group.key)}
                >
                  <span style={styles.groupChevron}>{isOpen ? "▾" : "▸"}</span>
                  <span style={styles.groupLabel}>{group.label}</span>
                  <span style={styles.groupCount}>{group.items.length}</span>
                </button>

                {/* 폴더 목록 */}
                {isOpen && group.items.map((s) => {
                  const isLoaded = loadedScreenPath === s.relPath;
                  const isLoading = loadingPath === s.relPath;
                  const isHovered = hoveredPath === s.relPath;
                  const disabledReason = !s.hasScreen ? "Screen.tsx가 아직 생성되지 않은 화면이에요" : null;
                  return (
                    <div
                      key={s.relPath}
                      style={{
                        ...styles.item,
                        ...(isLoaded ? styles.itemLoaded : {}),
                        ...(disabledReason ? styles.itemDisabled : {}),
                      }}
                      onMouseEnter={() => setHoveredPath(s.relPath)}
                      onMouseLeave={() => setHoveredPath(null)}
                    >
                      <button
                        type="button"
                        style={{
                          ...styles.itemMain,
                          ...(disabledReason ? styles.itemMainDisabled : {}),
                        }}
                        disabled={!!disabledReason || !!loadingPath}
                        onClick={() => loadIntoCanvas(s.relPath)}
                      >
                        <span style={styles.itemId}>{s.id}</span>
                        {isLoaded && <span style={styles.currentBadge}>현재 화면</span>}
                        {isLoading && <span style={styles.spinner}>…</span>}
                      </button>
                      {disabledReason && isHovered && (
                        <span style={styles.hoverBadge}>{disabledReason}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
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
          {[...policyGroupMap.entries()].map(([key, items]) => {
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
  groupHeader: {
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 5,
    width: "100%",
    padding: "7px 12px 5px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    cursor: "pointer" as const,
    borderBottom: "1px solid #f3f4f6",
  },
  groupChevron: {
    fontSize: 10,
    color: "#9ca3af",
    width: 10,
    flexShrink: 0,
  },
  groupLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: 600,
    color: "#374151",
    letterSpacing: "0.01em",
  },
  groupCount: {
    fontSize: 10,
    color: "#c4c9d4",
    flexShrink: 0,
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
  itemDisabled: {
    opacity: 0.45,
  },
  itemMain: {
    flex: 1,
    display: "flex" as const,
    alignItems: "center" as const,
    gap: 6,
    padding: "6px 8px 6px 22px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    cursor: "pointer" as const,
    fontSize: 11,
    color: "#374151",
    minWidth: 0,
  },
  itemMainDisabled: {
    cursor: "default" as const,
  },
  currentBadge: {
    fontSize: 9,
    fontWeight: 600,
    color: "#16a34a",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 3,
    padding: "1px 5px",
    flexShrink: 0,
    whiteSpace: "nowrap" as const,
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
  hoverBadge: {
    fontSize: 10,
    color: "#6b7280",
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    padding: "2px 6px",
    marginRight: 8,
    flexShrink: 0,
    whiteSpace: "nowrap" as const,
    pointerEvents: "none" as const,
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
