"use client";

import { PuckLogo } from "./PuckLogo";

export function TouchUpHeader({ onReset }: { onReset?: () => void }) {
  return (
    <header className="flex items-center justify-between px-4 h-12 shrink-0 bg-neutral-950 border-b border-white/10">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-normal text-white/50 tracking-tight">TouchUp with</span>
        <PuckLogo width={72} height={18} color="white" style={{ marginTop: 4 }} />
      </div>

      <div className="flex items-center gap-2">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-white/50 hover:text-white/80 px-3 py-1 rounded border border-white/15 hover:border-white/30 bg-transparent cursor-pointer transition-colors"
          >
            초기화
          </button>
        )}
      </div>
    </header>
  );
}
