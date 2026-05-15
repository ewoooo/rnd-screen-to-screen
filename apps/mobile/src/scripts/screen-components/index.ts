/**
 * Screen component refs — used by preview figma-sync for TSX traversal.
 * Separate from @screen/mobile/screens (metadata-only export).
 */
import type { ComponentType } from "react";
import { ProgressAppBar } from "../../patterns/mbr";
import { SectionHeaderPage, TextFieldMemberInfo } from "../../organisms/mbr";

type RegistryEntry = {
	component: ComponentType<Record<string, unknown>>;
	figmaName: string;
	figmaVariant?: string;
	mapProps?: (props: Record<string, unknown>) => Record<string, unknown>;
	figmaTextNodes?: Record<string, string>;
	figmaProps?: Record<string, boolean | string>;
};

export { Screen as NovaMbrPg002Screen, screenConfig as novaMbrPg002Config } from "../../app/(mbr)/NOVA-MBR-PG-002-0";

export const novaMbrPg002Registry: readonly RegistryEntry[] = [
	{
		// ProgressAppBar → AppBar 컴포넌트 셋의 특정 variant
		component: ProgressAppBar as ComponentType<Record<string, unknown>>,
		figmaName: "AppBar",
		figmaVariant: "RightItem=Off, Title=On, LeftItem=On, Logo=Off",
		// title prop(string)을 titleText 키로 전달, 나머지는 variant 선택용 boolean
		mapProps: (props) => ({
			leftItem: true,
			rightItem: false,
			logo: false,
			titleText: typeof props.title === "string" ? props.title : "",
		}),
		// titleText → Figma "Title" TEXT 레이어
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
		// SubTitle/LeftItem/RightItem 기본값이 true여서 명시적으로 off
		figmaProps: {
			"SubTitle#10095:12": false,
			"LeftItem#10095:13": false,
			"RightItem#10095:14": false,
		},
	},
	{
		// TextFieldMemberInfo → TextField 컴포넌트 셋의 Default 상태 variant
		component: TextFieldMemberInfo as ComponentType<Record<string, unknown>>,
		figmaName: "TextField",
		figmaVariant: "States=Default, Error=off, Label=on, HelpText=on",
		mapProps: () => ({ states: "Default", showLabel: true, error: false, helpText: false }),
	},
];
