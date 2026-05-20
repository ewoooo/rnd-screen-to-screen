"use client";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useEffect, useState } from "react";
import { EditorLayout } from "@/components/EditorLayout";
import { TouchUpHeader } from "@/components/TouchUpHeader";
import { puckConfig } from "@/puck/config";
import { clearData, loadData, saveData } from "@/puck/storage";
import type { Data } from "@puckeditor/core";

export default function EditorPage() {
  const [initialData, setInitialData] = useState<Data | null>(null);

  const handleReset = () => { clearData(); window.location.reload(); };

  useEffect(() => {
    setInitialData(loadData());
  }, []);

  if (!initialData) {
    return (
      <div style={loadingStyle}>Loading…</div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <TouchUpHeader onReset={handleReset} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Puck
          config={puckConfig}
          data={initialData}
          onPublish={saveData}
          overrides={{ header: () => null, drawer: () => null }}
        >
          <EditorLayout />
        </Puck>
      </div>
    </div>
  );
}

const loadingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100dvh",
  fontFamily: "system-ui, sans-serif",
  color: "#666",
} as const;
