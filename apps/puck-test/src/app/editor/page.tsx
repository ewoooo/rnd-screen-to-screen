"use client";

import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useEffect, useState } from "react";
import { EditorLayout } from "@/components/EditorLayout";
import { puckConfig } from "@/puck/config";
import { loadData, saveData } from "@/puck/storage";
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
      headerTitle="PXDX · Puck Editor"
      headerPath="/preview"
    >
      <EditorLayout />
    </Puck>
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
