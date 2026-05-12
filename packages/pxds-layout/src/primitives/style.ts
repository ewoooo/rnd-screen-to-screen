import type { CSSProperties } from "react";

export type SpacingProps = {
	p?: CSSProperties["padding"];
	px?: CSSProperties["paddingInline"];
	py?: CSSProperties["paddingBlock"];
	pt?: CSSProperties["paddingTop"];
	pr?: CSSProperties["paddingRight"];
	pb?: CSSProperties["paddingBottom"];
	pl?: CSSProperties["paddingLeft"];
	gap?: CSSProperties["gap"];
};

export type FlexShorthandProps = {
	direction?: CSSProperties["flexDirection"];
	wrap?: CSSProperties["flexWrap"] | true;
	align?: CSSProperties["alignItems"];
	justify?: CSSProperties["justifyContent"];
	grow?: number | true;
	shrink?: number | true;
};

/**
 * Box 표면 페인팅 prop. Seed `Box`의 `background`/`borderRadius`/`borderColor`/
 * `borderWidth`/`boxShadow`/`bgGradient` 대응. 호출부는 토큰 문자열
 * (`var(--semantic-*)`, `var(--radius-*)` 등)을 통과시키는 것을 권장.
 */
export type SurfaceProps = {
	background?: CSSProperties["background"];
	bgGradient?: CSSProperties["backgroundImage"];
	borderRadius?: CSSProperties["borderRadius"];
	borderColor?: CSSProperties["borderColor"];
	borderWidth?: CSSProperties["borderWidth"];
	boxShadow?: CSSProperties["boxShadow"];
};

export function surfaceStyle(p: SurfaceProps): CSSProperties {
	const s: CSSProperties = {};
	if (p.background !== undefined) s.background = p.background;
	if (p.bgGradient !== undefined) s.backgroundImage = p.bgGradient;
	if (p.borderRadius !== undefined) s.borderRadius = p.borderRadius;
	if (p.borderColor !== undefined) s.borderColor = p.borderColor;
	if (p.borderWidth !== undefined) s.borderWidth = p.borderWidth;
	if (p.boxShadow !== undefined) s.boxShadow = p.boxShadow;
	return s;
}

export type CommonLayoutProps = {
	width?: CSSProperties["width"];
	height?: CSSProperties["height"];
	minWidth?: CSSProperties["minWidth"];
	maxWidth?: CSSProperties["maxWidth"];
	minHeight?: CSSProperties["minHeight"];
	maxHeight?: CSSProperties["maxHeight"];
	display?: CSSProperties["display"];
	position?: CSSProperties["position"];
	overflow?: CSSProperties["overflow"];
	overflowX?: CSSProperties["overflowX"];
	overflowY?: CSSProperties["overflowY"];
};

export function spacingStyle(p: SpacingProps): CSSProperties {
	const s: CSSProperties = {};
	if (p.p) s.padding = p.p;
	if (p.px) {
		s.paddingLeft = p.px;
		s.paddingRight = p.px;
	}
	if (p.py) {
		s.paddingTop = p.py;
		s.paddingBottom = p.py;
	}
	if (p.pt) s.paddingTop = p.pt;
	if (p.pr) s.paddingRight = p.pr;
	if (p.pb) s.paddingBottom = p.pb;
	if (p.pl) s.paddingLeft = p.pl;
	if (p.gap) s.gap = p.gap;
	return s;
}

export function commonLayoutStyle(p: CommonLayoutProps): CSSProperties {
	const s: CSSProperties = {};
	if (p.width !== undefined) s.width = p.width;
	if (p.height !== undefined) s.height = p.height;
	if (p.minWidth !== undefined) s.minWidth = p.minWidth;
	if (p.maxWidth !== undefined) s.maxWidth = p.maxWidth;
	if (p.minHeight !== undefined) s.minHeight = p.minHeight;
	if (p.maxHeight !== undefined) s.maxHeight = p.maxHeight;
	if (p.display !== undefined) s.display = p.display;
	if (p.position !== undefined) s.position = p.position;
	if (p.overflow !== undefined) s.overflow = p.overflow;
	if (p.overflowX !== undefined) s.overflowX = p.overflowX;
	if (p.overflowY !== undefined) s.overflowY = p.overflowY;
	return s;
}

export function flexStyle(p: FlexShorthandProps): CSSProperties {
	const s: CSSProperties = {};
	if (p.direction !== undefined) s.flexDirection = p.direction;
	if (p.wrap !== undefined) s.flexWrap = p.wrap === true ? "wrap" : p.wrap;
	if (p.align !== undefined) s.alignItems = p.align;
	if (p.justify !== undefined) s.justifyContent = p.justify;
	if (p.grow !== undefined) s.flexGrow = p.grow === true ? 1 : p.grow;
	if (p.shrink !== undefined) s.flexShrink = p.shrink === true ? 1 : p.shrink;
	return s;
}
