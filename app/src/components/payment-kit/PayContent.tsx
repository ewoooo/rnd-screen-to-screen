import type { ReactNode } from "react";

/**
 * 결제 화면 scroll content wrapper.
 * DetailShell 의 scroll 영역(좌우 padding `var(--spacing-20)`, 자식 gap `var(--spacing-16)`)
 * 위에 음수 margin 8 을 적용해 home-kit Shell 과 동일한 톤으로 보정한다.
 *
 * - 좌우 inset: 20 − 8 = 12 (`var(--spacing-12)`, home-kit Shell 좌우와 일치)
 * - 자식 gap: 8 (홈 4 보다 살짝 여유, DetailShell 16 보다 조밀)
 *
 * 풀폭이 필요한 자식(예: ThickDivider)은 `var(--spacing-12)` 만큼 추가 음수 margin 을 줘서
 * 화면 끝까지 닿게 한다.
 */
export function PayContent({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-8)",
				margin: "0 calc(-1 * var(--spacing-8))",
			}}
		>
			{children}
		</div>
	);
}
