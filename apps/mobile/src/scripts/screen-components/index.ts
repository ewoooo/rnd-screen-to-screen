/**
 * Screen component refs — used by preview figma-sync for TSX traversal.
 * Separate from @screen/mobile/screens (metadata-only export).
 */
import type { ComponentType } from "react";
import { TextField } from "@pxds/cx-components";
import { ProgressAppBar } from "../../patterns/mbr";
import { SectionHeaderPage } from "../../organisms/mbr";

type FigmaPropsValue = Record<string, boolean | string>;
type FigmaTextNodesValue = Record<string, string>;
type NestedInstanceOverride = { properties?: FigmaPropsValue; textOverrides?: FigmaTextNodesValue };

type RegistryEntry = {
	component: ComponentType<Record<string, unknown>>;
	figmaName: string;
	figmaVariant?: string;
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

export { Screen as NovaMbrPg002Screen, screenConfig as novaMbrPg002Config } from "../../app/(mbr)/NOVA-MBR-PG-002-0";

export const novaMbrPg002Registry: readonly RegistryEntry[] = [
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
