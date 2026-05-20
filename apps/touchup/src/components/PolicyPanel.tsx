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
    <div className="flex flex-col h-full overflow-hidden text-xs">
      {/* header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/8 shrink-0">
        <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Policy Coverage</span>
        <span className="text-[10px] tabular-nums text-white/30 bg-white/6 rounded-full px-2 py-px">
          {coveredCount}/{total}
        </span>
      </div>

      {/* progress bar + pct */}
      <div className="px-3.5 pt-2.5 pb-1 shrink-0">
        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-right text-[10px] text-white/25 mt-1">{pct}% covered</div>
      </div>

      {/* filter */}
      <div className="flex gap-1.5 px-3.5 pb-2.5 shrink-0">
        {(["all", "covered", "missing"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={[
              "flex-1 py-1 text-[10px] rounded border cursor-pointer transition-colors",
              filter === f
                ? "bg-white/12 border-white/20 text-white/90"
                : "bg-transparent border-white/10 text-white/35 hover:text-white/55 hover:border-white/20",
            ].join(" ")}
          >
            {f === "all" ? "All" : f === "covered" ? "Covered" : "Missing"}
          </button>
        ))}
      </div>

      {/* list */}
      <div className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-3">
        {loading ? (
          <div className="py-6 text-center text-white/25">불러오는 중…</div>
        ) : filtered.length === 0 ? (
          <div className="py-6 text-center text-white/25">항목 없음</div>
        ) : (
          [...groups.entries()].map(([group, items]) => (
            <div key={group}>
              <div className="px-3.5 pt-3 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-widest">
                {GROUP_LABEL[group] ?? group}
              </div>
              {items.map((p) => {
                const covered = coveredIds.has(p.id);
                return (
                  <div key={p.id} className="flex items-start gap-2 px-3.5 py-1.5 border-b border-white/4">
                    <span
                      className={[
                        "w-2 h-2 rounded-full shrink-0 mt-0.5",
                        covered ? "bg-emerald-500" : "bg-white/15",
                      ].join(" ")}
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] tabular-nums text-white/25 mb-px">{p.id}</div>
                      <div className="text-[11px] text-white/60 leading-snug">{p.title}</div>
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
