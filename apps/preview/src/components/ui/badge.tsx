import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-neutral-200 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-neutral-900",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
