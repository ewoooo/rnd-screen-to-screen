import type { ReactNode } from "react";

import { FONT } from "./tokens";

/**
 * 14 / 600 / label-normal — 리스트 행 제목 ("왕과 사는 남자") / 메뉴 라벨 ("T 가족모아데이터")
 */
export function ListTitlePilot({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.listTitle,
				color: "var(--semantic-label-normal)",
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			}}
		>
			{children}
		</span>
	);
}
