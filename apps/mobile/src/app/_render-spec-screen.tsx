"use client";

import {
	ActionAreaTerms,
	CheckboxTerms,
	ListCellAuthMethod,
	SectionHeaderPage,
	SectionMessageEntryBranch,
	SectionMessageJoinCompleteView,
	TextFieldGuardianRequest,
	TextFieldMemberInfo,
} from "@pxds/pxds-components/mbr";
import { PrimaryCTABar } from "@pxds/pxds-components/molecules";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import type {
	RenderPropValue,
	RenderScreenSpec,
	RenderSectionLayout,
	RenderSpecNode,
} from "@/screens/render-spec";
import { normalizeComponentId } from "@/screens/render-spec";

type Props = {
	spec: RenderScreenSpec;
};

type RenderProps = Record<string, RenderPropValue>;

export function RenderSpecScreen({ spec }: Props) {
	const { slots } = spec;

	return (
		<AppScreen>
			{slots.systemHeader === false ? null : <AppScreen.SystemHeader />}
			{slots.header ? (
				<AppScreen.Header>{renderNode(slots.header, "header")}</AppScreen.Header>
			) : null}
			<AppScreen.Content>
				{(slots.content ?? []).map((node, index) =>
					renderNode(node, `content-${index}`),
				)}
			</AppScreen.Content>
			{Array.isArray(slots.bottom) && slots.bottom.length > 0 ? (
				<AppScreen.Bottom>
					{slots.bottom.map((node, index) => renderNode(node, `bottom-${index}`))}
				</AppScreen.Bottom>
			) : null}
		</AppScreen>
	);
}

function renderNode(node: RenderSpecNode, key: string) {
	const componentId = normalizeComponentId(node.component);
	const props = (node.props ?? {}) as RenderProps;

	switch (componentId) {
		case "progress-top-bar":
			return (
				<ProgressTopBar
					key={key}
					title={stringProp(props.title) ?? ""}
					leading={props.leading === "close" ? "close" : "back"}
					progress={progressProp(props.progress)}
				/>
			);
		case "ogn-mbr-section-header-page":
			return <SectionHeaderPage key={key} title={stringProp(props.title) ?? ""} />;
		case "ogn-mbr-checkbox-terms":
			return <CheckboxTerms key={key} />;
		case "ogn-mbr-text-field-guardian-request":
			return (
				<TextFieldGuardianRequest
					key={key}
					visible={booleanProp(props.visible, false)}
				/>
			);
		case "ogn-mbr-text-field-member-info":
			return (
				<TextFieldMemberInfo
					key={key}
					state={props.state === "error" ? "error" : "default"}
				/>
			);
		case "ogn-mbr-section-message-entry-branch":
			return (
				<SectionMessageEntryBranch
					key={key}
					visible={booleanProp(props.visible, true)}
					kind={entryBranchKindProp(props.kind)}
				/>
			);
		case "ogn-mbr-list-cell-auth-method":
			return (
				<ListCellAuthMethod
					key={key}
					state={authStateProp(props.state)}
					slot={props.slot === "bottom" ? "bottom" : "content"}
					section={sectionProp(node.section)}
				/>
			);
		case "ogn-mbr-section-message-join-complete-view":
			return (
				<SectionMessageJoinCompleteView
					key={key}
					slot={props.slot === "bottom" ? "bottom" : "content"}
				/>
			);
		case "ogn-mbr-action-area-terms":
			return (
				<ActionAreaTerms
					key={key}
					disabled={booleanProp(props.disabled, true)}
				/>
			);
		case "primary-cta-bar":
			return (
				<PrimaryCTABar
					key={key}
					primaryLabel={stringProp(props.primaryLabel) ?? ""}
					secondaryLabel={stringProp(props.secondaryLabel)}
					tertiaryLabel={stringProp(props.tertiaryLabel)}
					disabled={booleanProp(props.disabled, false)}
					tone={props.tone === "destructive" ? "destructive" : "default"}
				/>
			);
		default:
			throw new Error(`Unsupported render spec component: ${node.component}`);
	}
}

function stringProp(value: RenderPropValue | undefined) {
	return typeof value === "string" ? value : undefined;
}

function booleanProp(value: RenderPropValue | undefined, fallback: boolean) {
	return typeof value === "boolean" ? value : fallback;
}

function entryBranchKindProp(value: RenderPropValue | undefined) {
	if (value === "dormant" || value === "retry") return "dormant";
	if (value === "rejoin-blocked") return "rejoin-blocked";
	return "existing-member";
}

function progressProp(value: RenderPropValue | undefined) {
	if (!isRenderRecord(value)) return undefined;
	return {
		label: stringProp(value.label) ?? "",
		percent: typeof value.percent === "number" ? value.percent : 0,
		showLabel: booleanProp(value.showLabel, true),
	};
}

function isRenderRecord(
	value: RenderPropValue | undefined,
): value is Readonly<Record<string, RenderPropValue>> {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function authStateProp(value: RenderPropValue | undefined) {
	if (
		value === "loading" ||
		value === "error" ||
		value === "blocked" ||
		value === "default"
	) {
		return value;
	}
	return "default";
}

function sectionProp(section: RenderSectionLayout | undefined) {
	if (!section) return undefined;
	return {
		inset: section.inset,
		rail: railProp(section.rail),
		measure: section.measure,
	};
}

function railProp(rail: RenderSectionLayout["rail"]) {
	if (rail === "inset" || rail === "measure" || rail === "full") return rail;
	return undefined;
}
