import { actionAreaTermsFigmaSpec } from "./action-area-terms/figma";
import actionAreaTermsMeta from "./action-area-terms/meta.json";
import { actionAreaTermsRender } from "./action-area-terms/render";
import { checkboxTermsFigmaSpec } from "./checkbox-terms/figma";
import checkboxTermsMeta from "./checkbox-terms/meta.json";
import { checkboxTermsRender } from "./checkbox-terms/render";
import { listCellAuthMethodFigmaSpec } from "./list-cell-auth-method/figma";
import listCellAuthMethodMeta from "./list-cell-auth-method/meta.json";
import { listCellAuthMethodRender } from "./list-cell-auth-method/render";
import { asMbrComponentMeta } from "./registry-meta";
import { sectionHeaderPageFigmaSpec } from "./section-header-page/figma";
import sectionHeaderPageMeta from "./section-header-page/meta.json";
import { sectionHeaderPageRender } from "./section-header-page/render";
import { sectionMessageEntryBranchFigmaSpec } from "./section-message-entry-branch/figma";
import sectionMessageEntryBranchMeta from "./section-message-entry-branch/meta.json";
import { sectionMessageEntryBranchRender } from "./section-message-entry-branch/render";
import { sectionMessageJoinCompleteViewFigmaSpec } from "./section-message-join-complete-view/figma";
import sectionMessageJoinCompleteViewMeta from "./section-message-join-complete-view/meta.json";
import { sectionMessageJoinCompleteViewRender } from "./section-message-join-complete-view/render";
import { textFieldGuardianRequestFigmaSpec } from "./text-field-guardian-request/figma";
import textFieldGuardianRequestMeta from "./text-field-guardian-request/meta.json";
import { textFieldGuardianRequestRender } from "./text-field-guardian-request/render";
import { textFieldMemberInfoFigmaSpec } from "./text-field-member-info/figma";
import textFieldMemberInfoMeta from "./text-field-member-info/meta.json";
import { textFieldMemberInfoRender } from "./text-field-member-info/render";

export const mbrRegistryEntries = [
	{
		...asMbrComponentMeta(sectionHeaderPageMeta),
		render: () => sectionHeaderPageRender,
		figmaSpec: () => sectionHeaderPageFigmaSpec,
	},
	{
		...asMbrComponentMeta(checkboxTermsMeta),
		render: () => checkboxTermsRender,
		figmaSpec: () => checkboxTermsFigmaSpec,
	},
	{
		...asMbrComponentMeta(actionAreaTermsMeta),
		render: () => actionAreaTermsRender,
		figmaSpec: () => actionAreaTermsFigmaSpec,
	},
	{
		...asMbrComponentMeta(textFieldGuardianRequestMeta),
		render: () => textFieldGuardianRequestRender,
		figmaSpec: () => textFieldGuardianRequestFigmaSpec,
	},
	{
		...asMbrComponentMeta(textFieldMemberInfoMeta),
		render: () => textFieldMemberInfoRender,
		figmaSpec: () => textFieldMemberInfoFigmaSpec,
	},
	{
		...asMbrComponentMeta(listCellAuthMethodMeta),
		render: () => listCellAuthMethodRender,
		figmaSpec: () => listCellAuthMethodFigmaSpec,
	},
	{
		...asMbrComponentMeta(sectionMessageEntryBranchMeta),
		render: () => sectionMessageEntryBranchRender,
		figmaSpec: () => sectionMessageEntryBranchFigmaSpec,
	},
	{
		...asMbrComponentMeta(sectionMessageJoinCompleteViewMeta),
		render: () => sectionMessageJoinCompleteViewRender,
		figmaSpec: () => sectionMessageJoinCompleteViewFigmaSpec,
	},
] as const;
