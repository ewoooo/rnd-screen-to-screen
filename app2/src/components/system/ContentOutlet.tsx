import type { CSSProperties, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	style?: CSSProperties;
}>;

/**
 * Shell 안의 스크롤 가능한 콘텐츠 슬롯.
 * fixed chrome(상단 헤더 / 하단 GNB) 사이를 채운다.
 *
 * 기본은 `flex: 1` + `overflow-y: auto` + 세로 flex.
 * padding(헤더·GNB safe area) 과 gap 같은 콘텐츠 레이아웃은 호출자가 style 로 주입.
 */
export function ContentOutlet({ children, style }: Props) {
	return (
		<div
			className="content-outlet"
			style={{
				flex: 1,
				overflowY: "auto",
				display: "flex",
				flexDirection: "column",
				scrollbarWidth: "none",
				msOverflowStyle: "none",
				...style,
			}}
		>
			{children}
		</div>
	);
}
