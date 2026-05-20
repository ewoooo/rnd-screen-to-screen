"use client";

import type { Data } from "@puckeditor/core";

const STORAGE_KEY = "puck-editor-data";

export function saveData(data: Data): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors (private mode, quota)
  }
}

export function loadData(): Data {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Data;
  } catch {
    // ignore
  }
  return { content: [], root: { props: {} } };
}

export function clearData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
