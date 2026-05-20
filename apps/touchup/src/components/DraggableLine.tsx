"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { GripHorizontal, GripVertical } from "lucide-react";

type DragPos = { x: number; y: number };

type Props = {
  direction: "horizontal" | "vertical";
  onDrag: (pos: DragPos) => void;
};

export function DraggableLine({ direction, onDrag }: Props) {
  const isH = direction === "horizontal";
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setActive(true);

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
        setActive(false);
      };

      const onMove = (ev: MouseEvent) => {
        if (ev.buttons === 0) { cleanup(); return; }
        onDrag({ x: ev.clientX, y: ev.clientY });
      };

      const onUp = () => cleanup();

      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [isH, onDrag],
  );

  const containerStyle: CSSProperties = {
    flexShrink: 0,
    width: isH ? 8 : "100%",
    height: isH ? "100%" : 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: isH ? "col-resize" : "row-resize",
    background: "transparent",
  };

  const iconColor = active
    ? "rgba(255,255,255,0.6)"
    : hovered
    ? "rgba(255,255,255,0.4)"
    : "rgba(255,255,255,0.15)";

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={startDrag}
    >
      {isH ? (
        <GripVertical size={12} color={iconColor} strokeWidth={2} />
      ) : (
        <GripHorizontal size={12} color={iconColor} strokeWidth={2} />
      )}
    </div>
  );
}
