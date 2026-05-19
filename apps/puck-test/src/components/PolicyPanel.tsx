"use client";

import { createUsePuck } from "@puckeditor/core";
import { useEffect, useMemo, useState } from "react";
import { getCoveredPolicyIds } from "@/puck/policy-map";
import type { PolicyItem } from "@/app/api/policies/route";

const usePuck = createUsePuck();

function useCanvasTypes() {
  return usePuck((s) => {
    const types: string[] = [];
    for (const item of s.appState.data.content) {
      types.push(item.type);
    }
    return types.join(",");
  });
}

const GROUP_LABEL: Record<string, string> = {
  AUTH: "인증 (AUTH)",
  TERM: "약관 (TERM)",
  INFO: "회원정보 (INFO)",
  ACCT: "계정 (ACCT)",
  SESS: "세션 (SESS)",
  PROF: "프로필 (PROF)",
};

type Props = {
  groupFilter?: string | null;
};

export function PolicyPanel({ groupFilter }: Props) {
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "covered" | "missing">("all");

  const typesKey = useCanvasTypes();

  const coveredIds = useMemo(() => {
    const types = typesKey ? typesKey.split(",") : [];
    return getCoveredPolicyIds(types);
  }, [typesKey]);

  useEffect(() => {
    fetch("/api/policies")
      .then((r) => r.json())
      .then((data: PolicyItem[]) => {
        setPolicies(data);
        setLoading(false);
      });
  }, []);

  const filtered = policies.filter((p) => {
    if (groupFilter && p.group !== groupFilter) return false;
    if (filter === "covered") return coveredIds.has(p.id);
    if (filter === "missing") return !coveredIds.has(p.id);
    return true;
  });

  const groups = useMemo(() => {
    const map = new Map<string, PolicyItem[]>();
    for (const p of filtered) {
      const g = p.group || "기타";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(p);
    }
    return map;
  }, [filtered]);

  const coveredCount = policies.filter((p) => coveredIds.has(p.id)).length;
  const total = policies.length;
  const pct = total > 0 ? Math.round((coveredCount / total) * 100) : 0;

  return (
    <div style={styles.panel}>
      {/* header */}
      <div style={styles.header}>
        <span style={styles.headerTitle}>정책 커버리지</span>
        <span style={styles.badge}>
          {coveredCount}/{total}
        </span>
      </div>

      {/* progress bar */}
      <div style={styles.progressWrap}>
        <div style={{ ...styles.progressBar, width: `${pct}%` }} />
      </div>
      <div style={styles.pct}>{pct}% 반영</div>

      {/* filter */}
      <div style={styles.filterRow}>
        {(["all", "covered", "missing"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterBtnActive : {}),
            }}
          >
            {f === "all" ? "전체" : f === "covered" ? "반영됨" : "미반영"}
          </button>
        ))}
      </div>

      {/* list */}
      <div style={styles.list}>
        {loading ? (
          <div style={styles.empty}>불러오는 중…</div>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>항목 없음</div>
        ) : (
          [...groups.entries()].map(([group, items]) => (
            <div key={group}>
              <div style={styles.groupLabel}>
                {GROUP_LABEL[group] ?? group}
              </div>
              {items.map((p) => {
                const covered = coveredIds.has(p.id);
                return (
                  <div key={p.id} style={styles.item}>
                    <span
                      style={{
                        ...styles.dot,
                        background: covered ? "#22c55e" : "#e5e7eb",
                      }}
                    />
                    <div style={styles.itemBody}>
                      <div style={styles.itemId}>{p.id}</div>
                      <div style={styles.itemTitle}>{p.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
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
    borderRight: "1px solid #e5e7eb",
    fontFamily: "system-ui, sans-serif",
    fontSize: 12,
    color: "#374151",
  },
  header: {
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    padding: "12px 14px 8px",
    borderBottom: "1px solid #e5e7eb",
  },
  headerTitle: {
    fontWeight: 600,
    fontSize: 13,
    color: "#111827",
  },
  badge: {
    background: "#f3f4f6",
    borderRadius: 20,
    padding: "2px 8px",
    fontSize: 11,
    color: "#6b7280",
    fontVariantNumeric: "tabular-nums" as const,
  },
  progressWrap: {
    height: 4,
    background: "#e5e7eb",
    margin: "10px 14px 4px",
    borderRadius: 2,
    overflow: "hidden" as const,
  },
  progressBar: {
    height: "100%",
    background: "#22c55e",
    borderRadius: 2,
    transition: "width 0.3s ease",
  },
  pct: {
    textAlign: "right" as const,
    padding: "0 14px 8px",
    color: "#6b7280",
    fontSize: 11,
  },
  filterRow: {
    display: "flex" as const,
    gap: 4,
    padding: "0 14px 10px",
  },
  filterBtn: {
    flex: 1,
    padding: "4px 0",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    background: "#fff",
    cursor: "pointer" as const,
    fontSize: 11,
    color: "#6b7280",
  },
  filterBtnActive: {
    background: "#111827",
    color: "#fff",
    borderColor: "#111827",
  },
  list: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "0 0 12px",
  },
  groupLabel: {
    padding: "8px 14px 4px",
    fontSize: 10,
    fontWeight: 600,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  item: {
    display: "flex" as const,
    alignItems: "flex-start" as const,
    gap: 8,
    padding: "6px 14px",
    borderBottom: "1px solid #f3f4f6",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
    marginTop: 3,
  },
  itemBody: {
    minWidth: 0,
  },
  itemId: {
    fontVariantNumeric: "tabular-nums" as const,
    color: "#9ca3af",
    fontSize: 10,
    marginBottom: 1,
  },
  itemTitle: {
    color: "#374151",
    lineHeight: 1.4,
  },
  empty: {
    padding: "24px 14px",
    color: "#9ca3af",
    textAlign: "center" as const,
  },
} as const;
