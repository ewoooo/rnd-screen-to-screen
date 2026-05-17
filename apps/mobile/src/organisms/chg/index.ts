import { defineRegistry } from "@pxds/cx-spec";

import { changeCompleteConfig } from "./ogn-chg-change-complete";
import { changeEligibilityConfig } from "./ogn-chg-change-eligibility";
import { currentPlanSummaryConfig } from "./ogn-chg-current-plan-summary";
import { planComparisonConfig } from "./ogn-chg-plan-comparison";
import { planFilterConfig } from "./ogn-chg-plan-filter";
import { planListConfig } from "./ogn-chg-plan-list";
import { planNoticeAgreeConfig } from "./ogn-chg-plan-notice-agree";

export { ChangeComplete } from "./ogn-chg-change-complete";
export { ChangeEligibility } from "./ogn-chg-change-eligibility";
export { CurrentPlanSummary } from "./ogn-chg-current-plan-summary";
export { PlanComparison } from "./ogn-chg-plan-comparison";
export { PlanFilter } from "./ogn-chg-plan-filter";
export { PlanList, planCount } from "./ogn-chg-plan-list";
export { PlanNoticeAgree } from "./ogn-chg-plan-notice-agree";

export const chgOrganismRegistry = defineRegistry([
	currentPlanSummaryConfig,
	changeEligibilityConfig,
	planFilterConfig,
	planListConfig,
	planComparisonConfig,
	planNoticeAgreeConfig,
	changeCompleteConfig,
] as const);
