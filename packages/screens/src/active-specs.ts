import homeBenefitSpec from "../spec/active/home-benefit.json";
import homeDeviceChangeSpec from "../spec/active/home-device-change.json";
import homeGuestSpec from "../spec/active/home-guest.json";
import homeManageSpec from "../spec/active/home-manage.json";
import homeSeniorSpec from "../spec/active/home-senior.json";
import membershipIdentityVerificationSpec from "../spec/active/membership-identity-verification.json";
import membershipIdentityVerificationRenderableSpec from "../spec/active/membership-identity-verification.sdui.json";
import membershipJoinCompleteSpec from "../spec/active/membership-join-complete.json";
import membershipJoinCompleteRenderableSpec from "../spec/active/membership-join-complete.sdui.json";
import membershipLeaveCompleteSpec from "../spec/active/membership-leave-complete.json";
import membershipLeaveCompleteRenderableSpec from "../spec/active/membership-leave-complete.sdui.json";
import membershipLeaveImpactSpec from "../spec/active/membership-leave-impact.json";
import membershipLeaveImpactRenderableSpec from "../spec/active/membership-leave-impact.sdui.json";
import membershipLeaveReasonSpec from "../spec/active/membership-leave-reason.json";
import membershipLeaveReasonRenderableSpec from "../spec/active/membership-leave-reason.sdui.json";
import membershipPersonalInfoSpec from "../spec/active/membership-personal-info.json";
import membershipPersonalInfoRenderableSpec from "../spec/active/membership-personal-info.sdui.json";
import membershipTermsConsentSpec from "../spec/active/membership-terms-consent.json";
import membershipTermsConsentRenderableSpec from "../spec/active/membership-terms-consent.sdui.json";
import productDetailSpec from "../spec/active/product-detail.json";
import productDetailRenderableSpec from "../spec/active/product-detail.sdui.json";
import searchResultSpec from "../spec/active/search-result.json";
import tuDiscoverySpec from "../spec/active/tu-dsp-main-mo-02-pg-001-2.json";
import tuPermissionSpec from "../spec/active/tu-dsp-main-mo-02-pg-002.json";
import tuAgreementBottomSheetSpec from "../spec/active/tu-my-agr-mo-02-bs-001.json";

import type { RenderableScreenSpecV1, ScreenSpecV2 } from "./spec";

const asScreenSpec = (spec: unknown) => spec as ScreenSpecV2;
const asRenderableScreenSpec = (spec: unknown) =>
	spec as RenderableScreenSpecV1;

export const activeScreenSpecs = {
	"home-benefit": asScreenSpec(homeBenefitSpec),
	"home-device-change": asScreenSpec(homeDeviceChangeSpec),
	"home-guest": asScreenSpec(homeGuestSpec),
	"home-manage": asScreenSpec(homeManageSpec),
	"home-senior": asScreenSpec(homeSeniorSpec),
	"membership-identity-verification": asScreenSpec(
		membershipIdentityVerificationSpec,
	),
	"membership-join-complete": asScreenSpec(membershipJoinCompleteSpec),
	"membership-leave-complete": asScreenSpec(membershipLeaveCompleteSpec),
	"membership-leave-impact": asScreenSpec(membershipLeaveImpactSpec),
	"membership-leave-reason": asScreenSpec(membershipLeaveReasonSpec),
	"membership-personal-info": asScreenSpec(membershipPersonalInfoSpec),
	"membership-terms-consent": asScreenSpec(membershipTermsConsentSpec),
	"product-detail": asScreenSpec(productDetailSpec),
	"search-result": asScreenSpec(searchResultSpec),
	"tu-dsp-main-mo-02-pg-001-2": asScreenSpec(tuDiscoverySpec),
	"tu-dsp-main-mo-02-pg-002": asScreenSpec(tuPermissionSpec),
	"tu-my-agr-mo-02-bs-001": asScreenSpec(tuAgreementBottomSheetSpec),
} as const satisfies Record<string, ScreenSpecV2>;

export type ActiveScreenSpecId = keyof typeof activeScreenSpecs;

export const activeRenderableScreenSpecs = {
	"membership-identity-verification": asRenderableScreenSpec(
		membershipIdentityVerificationRenderableSpec,
	),
	"membership-join-complete": asRenderableScreenSpec(
		membershipJoinCompleteRenderableSpec,
	),
	"membership-leave-complete": asRenderableScreenSpec(
		membershipLeaveCompleteRenderableSpec,
	),
	"membership-leave-impact": asRenderableScreenSpec(
		membershipLeaveImpactRenderableSpec,
	),
	"membership-leave-reason": asRenderableScreenSpec(
		membershipLeaveReasonRenderableSpec,
	),
	"membership-personal-info": asRenderableScreenSpec(
		membershipPersonalInfoRenderableSpec,
	),
	"membership-terms-consent": asRenderableScreenSpec(
		membershipTermsConsentRenderableSpec,
	),
	"product-detail": asRenderableScreenSpec(productDetailRenderableSpec),
} as const satisfies Partial<Record<ActiveScreenSpecId, RenderableScreenSpecV1>>;

export type ActiveRenderableScreenSpecId =
	keyof typeof activeRenderableScreenSpecs;
