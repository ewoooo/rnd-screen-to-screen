"use client";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useEffect, useState } from "react";
import { EditorLayout } from "@/components/EditorLayout";
import { puckConfig } from "@/puck/config";
import { clearData, loadData, saveData } from "@/puck/storage";
import type { Data } from "@puckeditor/core";

export default function EditorPage() {
  const [initialData, setInitialData] = useState<Data | null>(null);

  useEffect(() => {
    setInitialData(loadData());
  }, []);

  if (!initialData) {
    return (
      <div style={loadingStyle}>Loading…</div>
    );
  }

  return (
    <Puck
      config={puckConfig}
      data={initialData}
      onPublish={saveData}
      headerTitle=""
      headerPath="/preview"
      overrides={{
        header: ({ actions }) => (
          <div style={headerStyle}>
            <div style={headerLogoStyle}>
              <span style={headerTitleStyle}>TouchUp with</span>
              <PuckWordmark />
            </div>
            <div style={headerActionsStyle}>
              <button
                type="button"
                onClick={() => { clearData(); window.location.reload(); }}
                style={resetBtnStyle}
              >
                초기화
              </button>
              {actions}
            </div>
          </div>
        ),
      }}
    >
      <EditorLayout />
    </Puck>
  );
}

function PuckWordmark() {
  return (
    <svg
      width="54"
      height="22"
      viewBox="0 0 54 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Puck"
      style={{ display: "block" }}
    >
      <text
        x="0"
        y="16"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="-0.5"
        fill="white"
      >
        Puck
      </text>
    </svg>
  );
}

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  height: "48px",
  background: "var(--puck-color-grey-01, #1a1a2e)",
  borderBottom: "1px solid var(--puck-color-grey-03, #2d2d44)",
} as const;

const headerLogoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
} as const;

const headerTitleStyle = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontWeight: 500,
  fontSize: "14px",
  color: "rgba(255,255,255,0.6)",
  letterSpacing: "-0.2px",
  whiteSpace: "nowrap" as const,
} as const;

const headerActionsStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
} as const;

const resetBtnStyle = {
  padding: "6px 12px",
  background: "none",
  border: "1px solid #e5e7eb",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 12,
  color: "#6b7280",
  fontFamily: "system-ui, sans-serif",
} as const;

const loadingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100dvh",
  fontFamily: "system-ui, sans-serif",
  color: "#666",
} as const;
