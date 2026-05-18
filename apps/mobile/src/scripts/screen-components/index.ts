/**
 * Screen component refs — used by preview figma-sync for TSX traversal.
 * Separate from @screen/mobile/screens (metadata-only export).
 */
import type { ComponentType, ReactElement } from "react";
import { AppBar, Button, Checkbox, ListText, StatusBar, TextField, TitleMain, TitleSection as TitleSectionCx } from "@pxds/cx-components";
import { FieldStack } from "@pxds/cx-layout/components/compositions";
import { PageStackContents } from "@pxds/cx-layout/components/contents";
import { SectionDivider } from "@pxds/cx-layout/components/patterns";
import { VStack } from "@pxds/cx-layout/components/primitives";
import { ProgressAppBar } from "../../patterns/nova-mbr-legacy";
import { SectionHeaderPage } from "../../organisms/nova-mbr-legacy";
import { Screen as NovaMbrPg002Screen, screenConfig as novaMbrPg002Config } from "../../app/(nova-mbr-legacy)/NOVA-MBR-PG-002-0";
import { Screen as CxExamplePersonalInfoScreen, screenConfig as cxExamplePersonalInfoConfig } from "../../app/(cx-example)/CX-EXAMPLE-PERSONAL-INFO-INPUT";

type FigmaPropsValue = Record<string, boolean | string>;
type FigmaTextNodesValue = Record<string, string>;
type NestedInstanceOverride = { properties?: FigmaPropsValue; textOverrides?: FigmaTextNodesValue };

type LayoutEntry = {
	component: ComponentType<Record<string, unknown>>;
	name: string;
	direction?: "VERTICAL" | "HORIZONTAL";
	mapLayout?: (props: Record<string, unknown>) => {
		gap?: number;
		paddingTop?: number;
		paddingBottom?: number;
		paddingLeft?: number;
		paddingRight?: number;
	};
	/** children 외에 추가로 재귀 탐색할 JSX prop 이름 목록 */
	propsToTraverse?: string[];
};

type RegistryEntry = {
	component: ComponentType<Record<string, unknown>>;
	figmaName: string;
	figmaVariant?: string | ((mappedProps: Record<string, unknown>) => string | undefined);
	mapProps?: (props: Record<string, unknown>) => Record<string, unknown>;
	figmaTextNodes?:
		| FigmaTextNodesValue
		| ((mappedProps: Record<string, unknown>) => FigmaTextNodesValue);
	figmaProps?:
		| FigmaPropsValue
		| ((mappedProps: Record<string, unknown>) => FigmaPropsValue);
	figmaNestedProps?:
		| Record<string, NestedInstanceOverride>
		| ((mappedProps: Record<string, unknown>) => Record<string, NestedInstanceOverride> | undefined);
};

export { NovaMbrPg002Screen, novaMbrPg002Config };

export const novaMbrPg002Registry: readonly RegistryEntry[] = [
	{
		// StatusBar → Figma StatusBar (단일 variant, props 없음)
		component: StatusBar as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "StatusBar",
		figmaVariant: "State=Default",
	},
	{
		// ProgressAppBar → AppBar 컴포넌트 셋의 특정 variant
		component: ProgressAppBar as ComponentType<Record<string, unknown>>,
		figmaName: "AppBar",
		figmaVariant: "RightItem=Off, Title=On, LeftItem=On, Logo=Off",
		mapProps: (props) => ({
			titleText: typeof props.title === "string" ? props.title : "",
		}),
		figmaTextNodes: { titleText: "Title" },
	},
	{
		// SectionHeaderPage → TitleSection/Default (단독 컴포넌트, variant 없음)
		component: SectionHeaderPage as ComponentType<Record<string, unknown>>,
		figmaName: "TitleSection/Default",
		mapProps: (props) => ({
			titleText: typeof props.title === "string" ? props.title : "",
		}),
		figmaTextNodes: { titleText: "Title" },
		figmaProps: {
			"SubTitle#10095:12": false,
			"LeftItem#10095:13": false,
			"RightItem#10095:14": false,
		},
	},
	{
		// TextField → TextFieldMemberInfo 내부 5개 TextField 각각에 매핑
		// traverse가 TextFieldMemberInfo() 호출 → VStack → 5×TextField 추출
		component: TextField as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "TextField",
		figmaVariant: "States=Default, Error=off, Label=on, HelpText=on",
		mapProps: (props) => {
			const ab = props.actionButton as Record<string, unknown> | undefined;
			return {
				labelText:       typeof props.label       === "string" ? props.label       : "",
				placeholderText: typeof props.placeholder === "string" ? props.placeholder : "",
				helperTextValue: typeof props.helperText  === "string" ? props.helperText  : "",
				hasHelperText:   Boolean(props.helperText),
				hasLabel:        Boolean(props.label),
				hasButton:       Boolean(props.actionButton),
				buttonLabel:     ab && typeof ab.label === "string" ? ab.label : "",
			};
		},
		// 레이어 이름 기반 텍스트 override (동적 — helperText 없으면 생략)
		figmaTextNodes: (mp) => ({
			"Label":              mp.labelText as string,
			"텍스트를 입력하세요": mp.placeholderText as string,
			...(mp.hasHelperText ? { "Help Text": mp.helperTextValue as string } : {}),
		}),
		figmaProps: (mp) => ({
			"Show Label#9695:0": mp.hasLabel      as boolean,
			"HelpText#9706:0":   mp.hasHelperText as boolean,
		}),
		// 중첩 인스턴스 override — actionButton 있는 경우 TextFieldDefault에 Button=on
		figmaNestedProps: (mp) => mp.hasButton ? {
			"TextFieldDefault": {
				properties: { "Button": "on" },
				textOverrides: { "버튼": mp.buttonLabel as string },
			},
		} : undefined,
	},
];

export const novaMbrPg002LayoutRegistry: readonly LayoutEntry[] = [
	{
		// VStack → Figma VERTICAL Auto Layout frame
		component: VStack as unknown as ComponentType<Record<string, unknown>>,
		name: "VStack",
		direction: "VERTICAL",
		mapLayout: (props) => ({
			gap: typeof props.gap === "number" ? props.gap : 0,
		}),
	},
];

// ── CX-EXAMPLE-PERSONAL-INFO-INPUT ──────────────────────────────────────────

export const cxExamplePersonalInfoRegistry: readonly RegistryEntry[] = [
	{
		component: StatusBar as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "StatusBar",
		figmaVariant: "State=Default",
	},
	{
		component: AppBar as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "AppBar",
		figmaVariant: "RightItem=Off, Title=On, LeftItem=On, Logo=Off",
		mapProps: (props) => ({
			titleText: typeof props.title === "string" ? props.title : "",
		}),
		figmaTextNodes: { titleText: "Title" },
	},
	{
		// 인트로 섹션 큰 제목 (개인정보 입력)
		component: TitleMain as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "TitleSection/Default",
		mapProps: (props) => ({
			titleText: typeof props.title === "string" ? props.title : "",
		}),
		figmaTextNodes: { titleText: "Title" },
		figmaProps: {
			"SubTitle#10095:12": false,
			"LeftItem#10095:13": false,
			"RightItem#10095:14": false,
		},
	},
	{
		// 섹션 소제목 (기기변경 휴대폰 번호, 본인인증 완료 등)
		component: TitleSectionCx as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "TitleSection/Default",
		mapProps: (props) => ({
			titleText: typeof props.title === "string" ? props.title : "",
		}),
		figmaTextNodes: { titleText: "Title" },
		figmaProps: {
			"SubTitle#10095:12": false,
			"LeftItem#10095:13": false,
			"RightItem#10095:14": false,
		},
	},
	{
		// 섹션 구분선
		component: SectionDivider as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "Divider",
		figmaVariant: "Type=Section",
	},
	{
		component: ListText as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "ListText",
		figmaVariant: "Table=off",
		mapProps: (props) => ({
			textValue:     typeof props.text === "string" ? props.text : "",
			showRightItem: props.showRightItem !== false,
		}),
		figmaTextNodes: (mp) => ({
			"text": mp.textValue as string,
		}),
		figmaProps: (mp) => ({
			"RightItem#10038:0": mp.showRightItem as boolean,
		}),
	},
	{
		// 동의 체크박스 — Checked=On, Disabled=Off, Text=True
		component: Checkbox as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "CheckBox",
		figmaVariant: "Checked=On, Disabled=Off, Text=True",
		mapProps: (props) => ({
			labelText: typeof props.label === "string" ? props.label : "",
			isChecked: Boolean(props.checked),
		}),
		figmaTextNodes: { labelText: "텍스트" },
	},
	{
		// 텍스트 입력 필드 — state에 따라 Figma variant 동적 선택
		component: TextField as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "TextField",
		figmaVariant: (mp) => {
			const state = mp.state as string | undefined;
			const helpText = mp.hasHelperText ? "on" : "on"; // HelpText variant는 항상 on으로 유지
			if (state === "disabled") return `States=Disabled, Error=off, Label=on, HelpText=${helpText}`;
			if (state === "typed")    return `States=Typed, Error=off, Label=on, HelpText=${helpText}`;
			return `States=Default, Error=off, Label=on, HelpText=${helpText}`;
		},
		mapProps: (props) => {
			const ab = props.actionButton as Record<string, unknown> | undefined;
			return {
				labelText:       typeof props.label        === "string" ? props.label        : "",
				placeholderText: typeof props.placeholder  === "string" ? props.placeholder  : "",
				// defaultValue → disabled/typed 상태의 입력값 텍스트
				valueText:       typeof props.defaultValue === "string" ? props.defaultValue : "",
				helperTextValue: typeof props.helperText   === "string" ? props.helperText   : "",
				hasHelperText:   Boolean(props.helperText),
				hasLabel:        Boolean(props.label),
				hasButton:       Boolean(props.actionButton),
				buttonLabel:     ab && typeof ab.label === "string" ? ab.label : "",
				state:           typeof props.state === "string" ? props.state : "default",
			};
		},
		figmaTextNodes: (mp) => ({
			"Label":              mp.labelText as string,
			// placeholder 또는 입력값 — valueText 있으면 우선
			"텍스트를 입력하세요": (mp.valueText || mp.placeholderText) as string,
			...(mp.hasHelperText ? { "Help Text": mp.helperTextValue as string } : {}),
		}),
		figmaProps: (mp) => ({
			"Show Label#9695:0": mp.hasLabel      as boolean,
			"HelpText#9706:0":   mp.hasHelperText as boolean,
		}),
		figmaNestedProps: (mp) => mp.hasButton ? {
			"TextFieldDefault": {
				properties: { "Button": "on" },
				textOverrides: { "버튼": mp.buttonLabel as string },
			},
		} : undefined,
	},
	{
		// 하단 CTA 버튼 (다음)
		component: Button as unknown as ComponentType<Record<string, unknown>>,
		figmaName: "ActionButton",
		figmaVariant: "Type=Default, Button=1",
		mapProps: (props) => ({
			buttonLabel: typeof props.children === "string" ? props.children : "",
		}),
		figmaTextNodes: { buttonLabel: "버튼" },
	},
];

export const cxExamplePersonalInfoLayoutRegistry: readonly LayoutEntry[] = [
	{
		// PageStackContents → Figma "PageStackContents" frame (Figma node 4:697)
		// title prop은 ReactNode이므로 propsToTraverse로 별도 탐색
		component: PageStackContents as unknown as ComponentType<Record<string, unknown>>,
		name: "PageStackContents",
		direction: "VERTICAL",
		mapLayout: () => ({ paddingLeft: 12, paddingRight: 12, paddingTop: 32, paddingBottom: 32 }),
		propsToTraverse: ["title"],
	},
	{
		// FieldStack → Figma VERTICAL Auto Layout frame (gap=8)
		component: FieldStack as unknown as ComponentType<Record<string, unknown>>,
		name: "FieldStack",
		direction: "VERTICAL",
		mapLayout: () => ({ gap: 8 }),
	},
	{
		// VStack → Figma VERTICAL Auto Layout frame
		component: VStack as unknown as ComponentType<Record<string, unknown>>,
		name: "VStack",
		direction: "VERTICAL",
		mapLayout: (props) => ({
			gap: typeof props.gap === "number" ? props.gap : 0,
		}),
	},
];

export { CxExamplePersonalInfoScreen, cxExamplePersonalInfoConfig };

// ── Screen Figma Export Map ──────────────────────────────────────────────────

type ScreenFigmaExportEntry = {
	Screen: () => ReactElement;
	registry: readonly RegistryEntry[];
	layoutRegistry: readonly LayoutEntry[];
	config: { id: string; name: string; width?: number; height?: number };
};

export const screenFigmaExportMap: Record<string, ScreenFigmaExportEntry> = {
	"NOVA-MBR-PG-002-0": {
		Screen: NovaMbrPg002Screen,
		registry: novaMbrPg002Registry,
		layoutRegistry: novaMbrPg002LayoutRegistry,
		config: {
			id: novaMbrPg002Config.id,
			name: novaMbrPg002Config.name,
			width: novaMbrPg002Config.figma?.width,
			height: novaMbrPg002Config.figma?.height,
		},
	},
	"CX-EXAMPLE-PERSONAL-INFO-INPUT": {
		Screen: CxExamplePersonalInfoScreen,
		registry: cxExamplePersonalInfoRegistry,
		layoutRegistry: cxExamplePersonalInfoLayoutRegistry,
		config: {
			id: cxExamplePersonalInfoConfig.id,
			name: cxExamplePersonalInfoConfig.name,
			width: cxExamplePersonalInfoConfig.figma?.width,
			height: cxExamplePersonalInfoConfig.figma?.height,
		},
	},
};
