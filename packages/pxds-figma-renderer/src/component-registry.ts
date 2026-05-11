import type { ComponentSpecDraft } from "./types";
import {
	dividerFigmaSpec,
	placeholderFigmaSpec,
	textBlockFigmaSpec,
} from "./specs/atoms";
import {
	infoListRowFigmaSpec,
	filterTabsFigmaSpec,
	formFieldFigmaSpec,
	mediaBlockFigmaSpec,
	queryBarFigmaSpec,
	selectFieldFigmaSpec,
	termsAgreementRowFigmaSpec,
} from "./specs/molecules";
import {
	flowHeroFigmaSpec,
	flowNoticeFigmaSpec,
	flowResultActionsFigmaSpec,
	flowSummaryCardFigmaSpec,
	ncContinueBarFigmaSpec,
	ncHeroFigmaSpec,
	ncTopBarFigmaSpec,
	termsAgreementGroupFigmaSpec,
} from "./specs/organisms";

export type FigmaRendererComponentRegistryEntry = {
	componentId: string;
	spec: ComponentSpecDraft;
};

export type FigmaRendererComponentRegistry =
	readonly FigmaRendererComponentRegistryEntry[];

export const figmaRendererComponentRegistry = [
	{ componentId: "text-block", spec: textBlockFigmaSpec },
	{ componentId: "divider", spec: dividerFigmaSpec },
	{ componentId: "placeholder", spec: placeholderFigmaSpec },
	{ componentId: "info-list-row", spec: infoListRowFigmaSpec },
	{ componentId: "media-block", spec: mediaBlockFigmaSpec },
	{ componentId: "query-bar", spec: queryBarFigmaSpec },
	{ componentId: "filter-tabs", spec: filterTabsFigmaSpec },
	{ componentId: "form-field", spec: formFieldFigmaSpec },
	{ componentId: "select-field", spec: selectFieldFigmaSpec },
	{ componentId: "terms-agreement-row", spec: termsAgreementRowFigmaSpec },
	{ componentId: "flow-hero", spec: flowHeroFigmaSpec },
	{ componentId: "flow-summary-card", spec: flowSummaryCardFigmaSpec },
	{ componentId: "flow-notice", spec: flowNoticeFigmaSpec },
	{ componentId: "flow-result-actions", spec: flowResultActionsFigmaSpec },
	{ componentId: "nc-top-bar", spec: ncTopBarFigmaSpec },
	{ componentId: "nc-hero", spec: ncHeroFigmaSpec },
	{ componentId: "terms-agreement-group", spec: termsAgreementGroupFigmaSpec },
	{ componentId: "nc-continue-bar", spec: ncContinueBarFigmaSpec },
] as const satisfies readonly FigmaRendererComponentRegistryEntry[];

export function getFigmaRendererComponentSpec(
	componentId: string | null | undefined,
	registry: FigmaRendererComponentRegistry = figmaRendererComponentRegistry,
): ComponentSpecDraft | null {
	if (!componentId) return null;
	return (
		registry.find(
			(entry) => entry.componentId === componentId,
		)?.spec ?? null
	);
}
