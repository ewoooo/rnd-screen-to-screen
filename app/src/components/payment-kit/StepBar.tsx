import { GNB_BORDER, T_BRAND } from "./tokens";

/**
 * 결제 플로우 진행도 인디케이터.
 *
 * home-kit 톤 — 색은 T_BRAND / GNB_BORDER, gap 은 var(--spacing-2),
 * 좌우 padding 은 PayContent(12) 가 책임. 자체 spacing/색 raw 값은 두지 않는다.
 *
 * line height(3px) 만 raw 픽셀 — home-kit 의 spacing 토큰이 1/2/3px 단위 line 두께를
 * 직접 표현하지 않으므로 raw 정당.
 */
export function StepBar({ index, total }: { index: number; total: number }) {
	return (
		<div style={{ display: "flex", gap: "var(--spacing-2)" }}>
			{Array.from({ length: total }).map((_, i) => (
				<div
					key={i}
					style={{
						flex: 1,
						height: 3,
						borderRadius: 999,
						background: i <= index ? T_BRAND : GNB_BORDER,
					}}
				/>
			))}
		</div>
	);
}
