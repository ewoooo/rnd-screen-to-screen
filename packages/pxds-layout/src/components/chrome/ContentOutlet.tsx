import type { CSSProperties, PropsWithChildren } from "react";
import type { FigmaLayoutBridgeAttributes } from "../../types/figma-bridge";
import type { AppScreenActionBarPreset } from "./AppScreen.types";
import { ContentLayoutProvider } from "./ContentLayout";

type Props = PropsWithChildren<{
	inlineInset: string;
	actionBarPreset?: AppScreenActionBarPreset;
	style?: CSSProperties;
}> &
	FigmaLayoutBridgeAttributes;

/**
 * Shell 안의 스크롤 가능한 콘텐츠 슬롯.
 * fixed chrome(상단 헤더 / 하단 GNB) 사이를 채운다.
 *
 * 기본은 `flex: 1` + `overflow-y: auto` + 세로 flex.
 * padding(헤더·GNB safe area) 과 gap 같은 콘텐츠 레이아웃은 호출자가 style 로 주입.
 */
export function ContentOutlet({
	actionBarPreset,
	children,
	inlineInset,
	style,
	"data-figma-render": dataFigmaRender = "layout",
	"data-figma-component-id": dataFigmaComponentId = "content-outlet",
	"data-figma-layout-kind": dataFigmaLayoutKind = "chrome",
	"data-figma-layout-layer": dataFigmaLayoutLayer = "content",
	"data-figma-layout-auto": dataFigmaLayoutAuto = "true",
	"data-figma-layout-direction": dataFigmaLayoutDirection = "vertical",
	"data-figma-layout-align": dataFigmaLayoutAlign = "stretch",
	"data-figma-layout-sizing": dataFigmaLayoutSizing = "fill",
	"data-figma-layout-padding": dataFigmaLayoutPadding,
	"data-figma-property-action-bar-preset": dataFigmaActionBarPreset,
}: Props) {
	return (
		<div
			className="content-outlet"
			data-app-screen-action-bar-preset={actionBarPreset}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-kind={dataFigmaLayoutKind}
			data-figma-layout-layer={dataFigmaLayoutLayer}
			data-figma-layout-auto={dataFigmaLayoutAuto}
			data-figma-layout-direction={dataFigmaLayoutDirection}
			data-figma-layout-align={dataFigmaLayoutAlign}
			data-figma-layout-sizing={dataFigmaLayoutSizing}
			data-figma-layout-padding={
				dataFigmaLayoutPadding ?? `0 ${inlineInset} action-bar`
			}
			data-figma-property-action-bar-preset={
				dataFigmaActionBarPreset ?? actionBarPreset
			}
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
