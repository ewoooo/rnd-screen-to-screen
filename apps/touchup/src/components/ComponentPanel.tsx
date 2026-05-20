"use client";

import { createUsePuck } from "@puckeditor/core";
import { useState } from "react";
import { puckConfig } from "@/puck/config";

const usePuck = createUsePuck();

const ROOT_ZONE = "root:default-zone";

export function ComponentPanel() {
  const dispatch = usePuck((s) => s.dispatch);
  const data = usePuck((s) => s.appState.data);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(category: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  function insertComponent(componentType: string) {
    const index = data.content.length;
    dispatch({
      type: "insert",
      componentType,
      destinationZone: ROOT_ZONE,
      destinationIndex: index,
    } as Parameters<typeof dispatch>[0]);
  }

  const categories = Object.entries(puckConfig.categories ?? {});

  return (
    <div style={styles.panel}>
      {categories.map(([categoryName, category]) => {
        const isOpen = expanded.has(categoryName);
        const components = category.components ?? [];

        return (
          <div key={categoryName} style={styles.group}>
            <button
              type="button"
              style={styles.groupHeader}
              onClick={() => toggle(categoryName)}
            >
              <span style={styles.chevron}>{isOpen ? "▾" : "▸"}</span>
              <span style={styles.groupName}>{categoryName}</span>
              <span style={styles.groupCount}>{components.length}</span>
            </button>

            {isOpen && (
              <div style={styles.componentList}>
                {components.map((componentType) => (
                  <button
                    key={String(componentType)}
                    type="button"
                    style={styles.componentItem}
                    onClick={() => insertComponent(String(componentType))}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "none";
                    }}
                  >
                    {String(componentType)}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  panel: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 0,
  },

  group: {
    borderBottom: "1px solid #f3f4f6",
  },

  groupHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    width: "100%",
    padding: "8px 0",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    cursor: "pointer",
    fontFamily: "system-ui, sans-serif",
  },

  chevron: {
    fontSize: 9,
    color: "#9ca3af",
    width: 10,
    flexShrink: 0,
  },

  groupName: {
    flex: 1,
    fontSize: 11,
    fontWeight: 500,
    color: "#6b7280",
    letterSpacing: "0.01em",
  },

  groupCount: {
    fontSize: 10,
    color: "#d1d5db",
    flexShrink: 0,
  },

  componentList: {
    display: "flex",
    flexDirection: "column" as const,
    paddingBottom: 4,
  },

  componentItem: {
    width: "100%",
    padding: "6px 0 6px 16px",
    background: "none",
    border: "none",
    textAlign: "left" as const,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    color: "#111827",
    fontFamily: "system-ui, sans-serif",
    borderRadius: 4,
    transition: "background 0.1s",
  },
} as const;
