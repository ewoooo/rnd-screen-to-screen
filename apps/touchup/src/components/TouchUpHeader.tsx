"use client";

import { PuckLogo } from "./PuckLogo";

export function TouchUpHeader({ onReset }: { onReset?: () => void }) {
  return (
    <header style={styles.header}>
      {/* 로고 */}
      <div style={styles.logo}>
        <span style={styles.logoText}>TouchUp with</span>
        <PuckLogo width={72} height={18} color="white" style={{ marginTop: 4 }} />
      </div>

      {/* 액션 */}
      <div style={styles.actions}>
        {onReset && (
          <button type="button" onClick={onReset} style={styles.resetBtn}>
            초기화
          </button>
        )}
      </div>
    </header>
  );
}


const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    height: 48,
    flexShrink: 0,
    background: "#1a1a2e",
    borderBottom: "1px solid #2d2d44",
  } as const,

  logo: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  } as const,

  logoText: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: 400,
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "-0.2px",
  } as const,

  actions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  } as const,

  resetBtn: {
    padding: "5px 12px",
    background: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontFamily: "system-ui, sans-serif",
  } as const,

};
