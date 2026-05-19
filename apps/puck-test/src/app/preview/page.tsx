"use client";

import { Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { puckConfig } from "@/puck/config";
import { clearData, loadData } from "@/puck/storage";
import type { Data } from "@puckeditor/core";

export default function PreviewPage() {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100dvh",
          fontFamily: "system-ui, sans-serif",
          color: "#666",
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#1a1a1a",
          color: "#fff",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "system-ui, sans-serif",
          fontSize: "13px",
        }}
      >
        <Link href="/editor" style={{ color: "#aaa", textDecoration: "none" }}>
          ← 에디터
        </Link>
        <span style={{ color: "#555" }}>|</span>
        <span>미리보기</span>
        <button
          type="button"
          onClick={() => {
            clearData();
            setData({ content: [], root: { props: {} } });
          }}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "1px solid #555",
            color: "#aaa",
            borderRadius: "4px",
            padding: "3px 10px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          초기화
        </button>
      </nav>

      <div style={{ paddingTop: "37px" }}>
        <Render config={puckConfig} data={data} />
      </div>
    </>
  );
}
