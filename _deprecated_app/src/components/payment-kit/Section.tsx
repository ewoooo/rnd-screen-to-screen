import type { ReactNode } from "react";

import { DividerPilot } from "@/components/pilot-kit/DividerPilot";

/**
 * 카드 리스트 + 라벨이 한 그룹으로 묶이는 섹션 컨테이너.
 * 좌우 padding 없음 — PayContent 가 인셋(12)을 책임진다.
 */
export function PaySection({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-8)",
			}}
		>
			{children}
		</div>
	);
}

/**
 * 같은 섹션 내부에서 좌우 인셋 안에서만 도는 가는 선.
 * WDS Divider 1px (DividerPilot type="light") 사용.
 */
export function ThinDivider() {
	return (
		<div style={{ margin: "var(--spacing-8) 0" }}>
			<DividerPilot type="light" />
		</div>
	);
}

/**
 * 풀폭 두꺼운 구분면. PayContent 인셋(12)을 음수 margin 으로 무효화해 화면 끝까지 닿게 한다.
 * WDS Divider 10px (DividerPilot type="heavy") 사용.
 */
export function ThickDivider() {
	return (
		<div style={{ margin: "0 calc(-1 * var(--spacing-12))" }}>
			<DividerPilot type="heavy" />
		</div>
	);
}
