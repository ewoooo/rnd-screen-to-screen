import type { CSSProperties, PropsWithChildren } from "react";

import { createScreenExportAttributes } from "../screen-export";
import { ContentLayoutProvider } from "./ContentLayout";

type Props = PropsWithChildren<{
	inlineInset: string;
	style?: CSSProperties;
}>;

/**
 * Shell 안의 스크롤 가능한 콘텐츠 슬롯.
 * fixed chrome(상단 헤더 / 하단 GNB) 사이를 채운다.
 *
 * 기본은 `flex: 1` + `overflow-y: auto` + 세로 flex.
 * padding(헤더·GNB safe area) 과 gap 같은 콘텐츠 레이아웃은 호출자가 style 로 주입.
 */
export function ContentOutlet({ children, inlineInset, style }: Props) {
	return (
		<div
			className="content-outlet"
			{...createScreenExportAttributes({
				type: "ContentOutlet",
				slot: "content",
				props: { inlineInset },
			})}
			style={{
				"--content-inline-inset": inlineInset,
				display: "flex",
				flexDirection: "column",
				flexGrow: 1,
				overflowY: "auto",
				scrollbarWidth: "none",
				msOverflowStyle: "none",
				...style,
			} as CSSProperties}
		>
			<ContentLayoutProvider inlineInset={inlineInset}>
				{children}
			</ContentLayoutProvider>
		</div>
	);
}
