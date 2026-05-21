"use client";

import { Puck, createUsePuck } from "@puckeditor/core";
import { useEffect, useState } from "react";
import { ORGANISM_CATEGORY_NAMES, puckConfig } from "@/puck/config";

const usePuck = createUsePuck();

type Mode = "components" | "organisms";

export function ComponentPanel() {
  const dispatch = usePuck((s) => s.dispatch);
  const [mode, setMode] = useState<Mode>("components");

  useEffect(() => {
    const componentList = Object.fromEntries(
      Object.entries(puckConfig.categories ?? {})
        .filter(([name]) =>
          mode === "organisms"
            ? ORGANISM_CATEGORY_NAMES.has(name)
            : !ORGANISM_CATEGORY_NAMES.has(name),
        )
        .map(([name, category]) => [
          name,
          {
            title: name,
            components: category.components,
            expanded: true,
            visible: true,
          },
        ]),
    );

    dispatch({
      type: "setUi",
      ui: { componentList },
      recordHistory: false,
    } as Parameters<typeof dispatch>[0]);
  }, [dispatch, mode]);

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
            <div className="touchup-component-drawer">
              <Puck.Components />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 rounded-b-lg bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </div>
  );
}
