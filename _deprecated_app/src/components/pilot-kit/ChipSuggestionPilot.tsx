type Props = {
	label: string;
};

/**
 * 가로 스크롤용 AI 프롬프트 제안 chip (search step 01, 06).
 * 얇은 테두리, 불투명 배경.
 */
export function ChipSuggestionPilot({ label }: Props) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				padding: "var(--spacing-8) var(--spacing-14)",
				borderRadius: 999,
				background: "rgba(255, 255, 255, 0.7)",
				border: "1px solid var(--semantic-line-solid-alternative)",
				fontSize: 13,
				fontWeight: 500,
				color: "var(--semantic-label-normal)",
				letterSpacing: "-0.52px",
				whiteSpace: "nowrap",
			}}
		>
			{label}
		</span>
	);
}
