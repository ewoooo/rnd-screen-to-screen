/**
 * iOS 키보드 자리 placeholder. 실제 키보드는 렌더하지 않고 동일 높이 회색 블록.
 * step 02, 03, 04, 07, 08, 09, 10 에서 사용.
 */
export function KeyboardPlaceholder() {
	return (
		<div
			style={{
				height: 300,
				background: "#D1D5DB",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--semantic-label-alternative)",
				fontSize: 12,
				fontWeight: 500,
				borderTop: "1px solid rgba(0, 0, 0, 0.08)",
			}}
		>
			iOS keyboard
		</div>
	);
}
