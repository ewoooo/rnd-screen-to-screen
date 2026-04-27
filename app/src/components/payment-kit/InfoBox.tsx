import { ListSub, SectionLabel } from "@/components/home-kit";

/**
 * 회색 안내 박스. 좌우 margin 없음 — DetailShell 좌우 인셋 안에 그대로 박힌다.
 */
export function InfoBox({ title, bullets }: { title?: string; bullets: readonly string[] }) {
	return (
		<div
			style={{
				background: "var(--semantic-fill-normal)",
				padding: "var(--spacing-16)",
				borderRadius: 16,
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-8)",
			}}
		>
			{title ? <SectionLabel>{title}</SectionLabel> : null}
			<ul
				style={{
					margin: 0,
					padding: 0,
					listStyle: "none",
					display: "flex",
					flexDirection: "column",
					gap: 4,
				}}
			>
				{bullets.map((b) => (
					<li
						key={b}
						style={{
							paddingLeft: 10,
							position: "relative",
							lineHeight: 1.55,
						}}
					>
						<span
							style={{
								position: "absolute",
								left: 0,
								top: 0,
								color: "var(--semantic-label-alternative)",
							}}
						>
							·
						</span>
						<ListSub>{b}</ListSub>
					</li>
				))}
			</ul>
		</div>
	);
}
