import type { ReactNode } from "react";

import {
	GlobalNavigationBar,
	GlobalNavigationHeader,
	type GnbTab,
} from "@/components/global";
import { ContentOutlet } from "@/components/system";

import { PAGE_BG } from "./tokens";

type Props = {
	children: ReactNode;
	gnbTabs?: GnbTab[];
};

/**
 * 홈 화면 공통 프레임.
 * 위치한 layer 만 셸이 책임지고, 실제 chrome/콘텐츠는 하위 컴포넌트에 위임.
 * - GlobalNavigationHeader (상단 absolute)
 * - ContentOutlet (스크롤 영역)
 * - GlobalNavigationBar (하단 absolute)
 */
export function Shell({ children, gnbTabs }: Props) {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				background: PAGE_BG,
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<GlobalNavigationHeader />
			<ContentOutlet
				style={{
					padding: "106px var(--spacing-12) 120px",
					gap: "var(--spacing-4)",
				}}
			>
				{children}
			</ContentOutlet>
			<GlobalNavigationBar tabs={gnbTabs} />
		</div>
	);
}
