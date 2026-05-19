"use client";

import { useEffect, useMemo, useState } from "react";
import type { ScreenItem } from "@/app/api/screens/route";
import type { PolicyFile } from "@/app/api/policy-files/route";

type Props = {
  selectedScreenPath: string | null;
  onSelectScreen: (relPath: string | null) => void;
  selectedPolicyGroup: string | null;
  onSelectPolicyGroup: (group: string | null) => void;
};

export function ImportPanel({
  selectedScreenPath,
  onSelectScreen,
  selectedPolicyGroup,
  onSelectPolicyGroup,
}: Props) {
  const [screens, setScreens] = useState<ScreenItem[]>([]);
  const [policyFiles, setPolicyFiles] = useState<PolicyFile[]>([]);

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
      {/* ── 화면 선택 ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>화면</span>
          {selectedScreenPath && (
            <button
              type="button"
              style={styles.clearBtn}
              onClick={() => onSelectScreen(null)}
            >
              ✕
            </button>
          )}
        </div>
        <div style={styles.listWrap}>
          {[...screenGroups.entries()].map(([group, items]) => (
            <div key={group}>
              <div style={styles.groupLabel}>{group}</div>
              {items.map((s) => (
                <button
                  key={s.relPath}
                  type="button"
                  style={{
                    ...styles.item,
                    ...(selectedScreenPath === s.relPath ? styles.itemActive : {}),
                  }}
                  onClick={() =>
                    onSelectScreen(selectedScreenPath === s.relPath ? null : s.relPath)
                  }
                >
                  {s.id}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* ── 정책서 선택 ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>정책서</span>
          {selectedPolicyGroup && (
            <button
              type="button"
              style={styles.clearBtn}
              onClick={() => onSelectPolicyGroup(null)}
            >
              ✕
            </button>
          )}
        </div>
        <div style={styles.listWrap}>
          {[...policyGroups.entries()].map(([key, items]) => {
            const firstFile = items[0];
            const label = firstFile ? `${firstFile.domain} · ${firstFile.group}` : key;
            return (
              <button
                key={key}
                type="button"
                style={{
                  ...styles.item,
                  ...(selectedPolicyGroup === firstFile?.group ? styles.itemActive : {}),
                }}
                onClick={() =>
                  onSelectPolicyGroup(
                    selectedPolicyGroup === firstFile?.group ? null : (firstFile?.group ?? null)
                  )
                }
              >
                <span style={styles.policyGroupBadge}>{firstFile?.group}</span>
                <span style={styles.policyDomain}>{firstFile?.domain}</span>
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
    gap: 6,
    width: "100%",
    padding: "5px 14px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    cursor: "pointer" as const,
    fontSize: 11,
    color: "#374151",
    borderBottom: "1px solid #f9fafb",
  },
  itemActive: {
    background: "#111827",
    color: "#fff",
  },
  policyGroupBadge: {
    fontSize: 10,
    fontWeight: 700,
    background: "#e5e7eb",
    borderRadius: 3,
    padding: "1px 5px",
    color: "#374151",
    flexShrink: 0,
  },
  policyDomain: {
    flex: 1,
    color: "#6b7280",
  },
  policyCount: {
    fontSize: 10,
    color: "#9ca3af",
    flexShrink: 0,
  },
  divider: {
    height: 1,
    background: "#e5e7eb",
    flexShrink: 0,
  },
} as const;
