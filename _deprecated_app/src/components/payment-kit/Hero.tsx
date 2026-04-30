import { Heading20, ListSub } from "@/components/home-kit";

/**
 * 페이지 상단 hero — 좌우 padding 없음 (DetailShell 의 좌우 var(--spacing-20)이 책임).
 */
export function Hero({ title, sub }: { title: readonly string[]; sub?: string }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-6)",
			}}
		>
			<Heading20>{title.join("\n")}</Heading20>
			{sub ? <ListSub>{sub}</ListSub> : null}
		</div>
	);
}
