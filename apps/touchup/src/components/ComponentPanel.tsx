"use client";

import { createUsePuck } from "@puckeditor/core";
import { useState } from "react";
import { ORGANISM_CATEGORY_NAMES, puckConfig } from "@/puck/config";

const usePuck = createUsePuck();
const ROOT_ZONE = "root:default-zone";

type Mode = "components" | "organisms";

export function ComponentPanel() {
  const dispatch = usePuck((s) => s.dispatch);
  const data = usePuck((s) => s.appState.data);
  const [mode, setMode] = useState<Mode>("components");

  function insertComponent(componentType: string) {
    dispatch({
      type: "insert",
      componentType,
      destinationZone: ROOT_ZONE,
      destinationIndex: data.content.length,
    } as Parameters<typeof dispatch>[0]);
  }

  const allCategories = Object.entries(puckConfig.categories ?? {});
  const categories = allCategories.filter(([name]) =>
    mode === "organisms"
      ? ORGANISM_CATEGORY_NAMES.has(name)
      : !ORGANISM_CATEGORY_NAMES.has(name),
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden px-3.5">
      {/* 탭 토글 */}
      <div className="py-2.5 shrink-0">
        <div className="flex items-center gap-0.5 bg-white/6 rounded-md p-0.5 w-full">
          {(["components", "organisms"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={[
                "flex-1 text-center py-1 text-[11px] font-medium rounded transition-colors cursor-pointer",
                mode === m
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/65",
              ].join(" ")}
            >
              {m === "components" ? "Components" : "Organisms"}
            </button>
          ))}
        </div>
      </div>

      {/* 목록 */}
      <div className="flex-1 min-h-0 pb-4">
        <div className="relative h-full rounded-lg border border-white/10 bg-black/20 p-2">
          <div className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-8">
            {categories.map(([categoryName, category], i) => {
              const components = category.components ?? [];
              // organism 카테고리는 OGN/ prefix 제거해서 표시
              const displayName = mode === "organisms"
                ? categoryName
                : categoryName;
              return (
                <div key={categoryName}>
                  {i > 0 && <div className="mx-2 my-1 border-t border-white/8" />}
                  <div className="px-1 pt-1 pb-0.5">
                    <div className="px-1.5 py-1 text-sm font-medium text-white/25 select-none cursor-default">
                      {displayName}
                    </div>
                    {components.map((componentType) => {
                      // "OGN/AuthSelect" → "AuthSelect"
                      const label = String(componentType).replace(/^OGN\//, "");
                      return (
                        <button
                          key={String(componentType)}
                          type="button"
                          onClick={() => insertComponent(String(componentType))}
                          className="w-full text-left text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 px-1.5 py-1 rounded-md cursor-pointer transition-colors"
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 rounded-b-lg bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </div>
  );
}
