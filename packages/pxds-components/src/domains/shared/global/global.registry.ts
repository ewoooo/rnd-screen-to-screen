import { flowContinueBarRegistryEntry } from "./flow-continue-bar/registry";
import { flowHeroRegistryEntry } from "./flow-hero/registry";
import { flowNoticeRegistryEntry } from "./flow-notice/registry";
import { flowPersonalInfoFormRegistryEntry } from "./flow-personal-info-form/registry";
import { flowReasonFormRegistryEntry } from "./flow-reason-form/registry";
import { flowResultActionsRegistryEntry } from "./flow-result-actions/registry";
import { flowSummaryCardRegistryEntry } from "./flow-summary-card/registry";
import { globalNavigationBarRegistryEntry } from "./global-navigation-bar/registry";
import { globalNavigationHeaderRegistryEntry } from "./global-navigation-header/registry";
import { globalSearchRegistryEntry } from "./global-search/registry";
import { progressTopBarRegistryEntry } from "./progress-top-bar/registry";
import { termsAgreementGroupRegistryEntry } from "./terms-agreement-group/registry";

export const globalRegistryEntries = [
	globalNavigationHeaderRegistryEntry,
	globalNavigationBarRegistryEntry,
	globalSearchRegistryEntry,
	progressTopBarRegistryEntry,
	flowHeroRegistryEntry,
	flowNoticeRegistryEntry,
	flowSummaryCardRegistryEntry,
	termsAgreementGroupRegistryEntry,
	flowPersonalInfoFormRegistryEntry,
	flowReasonFormRegistryEntry,
	flowContinueBarRegistryEntry,
	flowResultActionsRegistryEntry,
] as const;
