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
	mapProps?: (props: Record<string, unknown>) => Record<string, unknown>;
};

export { Screen as NovaMbrPg002Screen, screenConfig as novaMbrPg002Config } from "../../app/(mbr)/NOVA-MBR-PG-002-0";

export const novaMbrPg002Registry: readonly RegistryEntry[] = [
	{
		// ProgressAppBar is a MBR-specific pattern; maps to the base AppBar Figma component.
		// leftItem=true: back chevron. title=true: page title text. No right item or logo.
		component: ProgressAppBar as ComponentType<Record<string, unknown>>,
		figmaName: "AppBar",
		mapProps: () => ({ leftItem: true, title: true, rightItem: false, logo: false }),
	},
	{
		// SectionHeaderPage renders PageStackContents + TitleSection internally.
		// Figma component is "TitleSection/Default"; plain page title = no subTitle/leftItem/rightItem.
		component: SectionHeaderPage as ComponentType<Record<string, unknown>>,
		figmaName: "TitleSection/Default",
		mapProps: () => ({ subTitle: false, leftItem: false, rightItem: false }),
	},
	{
		// TextFieldMemberInfo renders 5 TextField atoms inside a VStack.
		// Mapped to one TextField entry for now; expand when per-field fidelity is needed.
		component: TextFieldMemberInfo as ComponentType<Record<string, unknown>>,
		figmaName: "TextField",
		mapProps: () => ({ states: "Default", showLabel: true, error: false, helpText: false }),
	},
];
