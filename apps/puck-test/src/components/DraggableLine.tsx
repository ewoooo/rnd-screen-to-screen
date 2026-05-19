"use client";

import type { CSSProperties } from "react";
import { useCallback } from "react";

type DragPos = { x: number; y: number };

type Props = {
  direction: "horizontal" | "vertical";
  onDrag: (pos: DragPos) => void;
  thickness?: number;
  handleLength?: number;
  handleMargin?: number;
  lineColor?: string;
  background?: string;
  style?: CSSProperties;
  className?: string;
};

export function DraggableLine({
  direction,
  onDrag,
  thickness = 12,
  handleLength = 24,
  handleMargin = 8,
  lineColor = "#d1d5db",
  background = "transparent",
  style,
  className,
}: Props) {
  const isH = direction === "horizontal";
  const border = `1px solid ${lineColor}`;

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const overlay = document.createElement("div");
      overlay.style.cssText =
        "position:fixed;inset:0;z-index:9999;cursor:" +
        (isH ? "col-resize" : "row-resize");
      document.body.appendChild(overlay);

      const cleanup = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.body.removeChild(overlay);
        document.body.style.userSelect = "";
      };

      const onMove = (ev: MouseEvent) => {
        if (ev.buttons === 0) { cleanup(); return; }
        onDrag({ x: ev.clientX, y: ev.clientY });
      };

      const onUp = () => { cleanup(); };

      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [isH, onDrag],
  );

  const containerStyle: CSSProperties = {
    flexShrink: 0,
    width: isH ? thickness : "100%",
    height: isH ? "100%" : thickness,
    background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...(isH
      ? { borderLeft: border, borderRight: border }
      : { borderTop: border, borderBottom: border }),
    ...style,
  };

  const handleStyle: CSSProperties = {
    padding: isH
      ? `${handleMargin}px ${handleMargin * 2}px`
      : `${handleMargin * 2}px ${handleMargin}px`,
    cursor: isH ? "col-resize" : "row-resize",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const lineStyle: CSSProperties = {
    width: isH ? 1 : handleLength,
    height: isH ? handleLength : 1,
    background: lineColor,
    pointerEvents: "none",
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={handleStyle} onMouseDown={startDrag}>
        <div style={lineStyle} />
      </div>
    </div>
  );
}
