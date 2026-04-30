import { Chip, ContentBadge } from "@wanteddev/wds";
import type { ReactNode } from "react";

/**
 * StatBadge / PillChip — WDS 위임 wrapper. 자체 스타일 포기 (forced WDS migration).
 * 호출 시그니처(`<StatBadge>{children}</StatBadge>` / `<PillChip tone>`)는 화면 코드 보존을 위해 유지.
 */

export function StatBadge({ children }: { children: ReactNode }) {
	return (
		<ContentBadge size="small" color="neutral" variant="outlined">
			{children}
		</ContentBadge>
	);
}

type PillTone = "neutral" | "violet";

export function PillChip({
	children,
	tone = "neutral",
}: {
	children: ReactNode;
	tone?: PillTone;
}) {
	return (
		<Chip
			size="small"
			variant={tone === "violet" ? "solid" : "outlined"}
		>
			{children}
		</Chip>
	);
}
