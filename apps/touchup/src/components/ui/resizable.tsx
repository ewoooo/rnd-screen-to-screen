"use client"

import { Group, Panel, Separator } from "react-resizable-panels"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  orientation = "horizontal",
  ...props
}: ComponentProps<typeof Group>) {
  return (
    <Group
      data-slot="resizable-panel-group"
      orientation={orientation}
      className={cn("flex h-full w-full", className)}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ComponentProps<typeof Panel>) {
  return <Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ComponentProps<typeof Separator> & { withHandle?: boolean }) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex items-center justify-center bg-transparent",
        "data-[resize-handle-active=pointer]:bg-white/5",
        "focus-visible:outline-hidden",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-1.5 shrink-0 rounded-full bg-white/20" />
      )}
    </Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
