import type { ReactNode } from "react";

import { Placeholder } from "./Placeholder";
import { ListSub, ListTitle, PillChip } from "./text";

type Props = {
	thumb: { w: number; h: number; label: string };
	title: string;
	sub: string;
	pill?: string;
	trailing?: ReactNode;
};

/**
 * 썸네일 + 타이틀/서브 + 우측 pill(또는 커스텀 trailing) 행.
 * 혜택(영화·쿠폰), 비로그인(구독상품) 등에서 재사용.
 */
export function ListRow({ thumb, title, sub, pill, trailing }: Props) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-14)",
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "var(--spacing-14)",
					flex: 1,
					minWidth: 0,
				}}
			>
				<Placeholder w={thumb.w} h={thumb.h} label={thumb.label} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						flex: 1,
						minWidth: 0,
					}}
				>
					<ListTitle>{title}</ListTitle>
					<ListSub>{sub}</ListSub>
				</div>
			</div>
			{trailing ?? (pill ? <PillChip>{pill}</PillChip> : null)}
		</div>
	);
}
