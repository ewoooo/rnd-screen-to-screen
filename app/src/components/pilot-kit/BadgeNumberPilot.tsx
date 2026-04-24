"use client";

import type { ReactNode } from "react";
import { PushBadge } from "@wanteddev/wds";

// Figma badge-number (atom) → WDS PushBadge variant=number
// Source: data/binding/overrides/badge-number.json
export function BadgeNumberPilot({
	count,
	target,
}: {
	count: number;
	target?: ReactNode;
}) {
	return (
		<PushBadge variant="number" count={count} position="top-right" size="small">
			{target ?? <span style={{ display: "inline-block", width: 24, height: 24 }} />}
		</PushBadge>
	);
}
