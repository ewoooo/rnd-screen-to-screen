"use client";

import type { ComponentType } from "react";
import {
	activeRenderableScreenSpecs,
	screens,
	type ActiveRenderableScreenSpecId,
	type RenderableScreenSpecV1,
	type ScreenGroup,
} from "@screen/screens";

import { NcFullDormancyAuthScreen } from "@/app/nc-full-dormancy-auth/_sdui-renderer";
import { NcFullDormancyLoginScreen } from "@/app/nc-full-dormancy-login/_sdui-renderer";
import { NcFullDormancyResultScreen } from "@/app/nc-full-dormancy-result/_sdui-renderer";
import { NcFullDormancyTermsScreen } from "@/app/nc-full-dormancy-terms/_sdui-renderer";
import { NcFullJoinAuthScreen } from "@/app/nc-full-join-auth/_sdui-renderer";
import { NcFullJoinCompleteScreen } from "@/app/nc-full-join-complete/_sdui-renderer";
import { NcFullJoinInfoScreen } from "@/app/nc-full-join-info/_sdui-renderer";
import { NcFullJoinTermsScreen } from "@/app/nc-full-join-terms/_sdui-renderer";
import { NcFullLeaveAuthScreen } from "@/app/nc-full-leave-auth/_sdui-renderer";
import { NcFullLeaveConfirmScreen } from "@/app/nc-full-leave-confirm/_sdui-renderer";
import { NcFullLeaveNoticeScreen } from "@/app/nc-full-leave-notice/_sdui-renderer";
import { NcFullLeaveReasonScreen } from "@/app/nc-full-leave-reason/_sdui-renderer";
import { NcFullLeaveResultScreen } from "@/app/nc-full-leave-result/_sdui-renderer";
import { NcFullRejoinAuthScreen } from "@/app/nc-full-rejoin-auth/_sdui-renderer";
import { NcFullRejoinCompleteScreen } from "@/app/nc-full-rejoin-complete/_sdui-renderer";
import { NcFullRejoinInfoScreen } from "@/app/nc-full-rejoin-info/_sdui-renderer";
import { NcSimpleDormancyAuthScreen } from "@/app/nc-simple-dormancy-auth/_sdui-renderer";
import { NcSimpleDormancyLoginScreen } from "@/app/nc-simple-dormancy-login/_sdui-renderer";
import { NcSimpleDormancyResultScreen } from "@/app/nc-simple-dormancy-result/_sdui-renderer";
import { NcSimpleDormancyTermsScreen } from "@/app/nc-simple-dormancy-terms/_sdui-renderer";
import { NcSimpleJoinAuthScreen } from "@/app/nc-simple-join-auth/_sdui-renderer";
import { NcSimpleJoinCompleteScreen } from "@/app/nc-simple-join-complete/_sdui-renderer";
import { NcSimpleJoinInfoScreen } from "@/app/nc-simple-join-info/_sdui-renderer";
import { NcSimpleJoinTermsScreen } from "@/app/nc-simple-join-terms/_sdui-renderer";
import { NcSimpleLeaveAuthScreen } from "@/app/nc-simple-leave-auth/_sdui-renderer";
import { NcSimpleLeaveConfirmScreen } from "@/app/nc-simple-leave-confirm/_sdui-renderer";
import { NcSimpleLeaveReasonScreen } from "@/app/nc-simple-leave-reason/_sdui-renderer";
import { NcSimpleLeaveResultScreen } from "@/app/nc-simple-leave-result/_sdui-renderer";
import { NcSimpleRejoinAuthScreen } from "@/app/nc-simple-rejoin-auth/_sdui-renderer";
import { NcSimpleRejoinBlockedScreen } from "@/app/nc-simple-rejoin-blocked/_sdui-renderer";
import { NcSimpleRejoinCompleteScreen } from "@/app/nc-simple-rejoin-complete/_sdui-renderer";
import { NcSimpleRejoinInfoScreen } from "@/app/nc-simple-rejoin-info/_sdui-renderer";

const EXPORT_GROUPS: readonly ScreenGroup[] = ["nc-full", "nc-simple"];

type Renderer = ComponentType<{ spec: RenderableScreenSpecV1 }>;

const RENDERERS: Record<string, Renderer> = {
	"nc-full-dormancy-auth": NcFullDormancyAuthScreen,
	"nc-full-dormancy-login": NcFullDormancyLoginScreen,
	"nc-full-dormancy-result": NcFullDormancyResultScreen,
	"nc-full-dormancy-terms": NcFullDormancyTermsScreen,
	"nc-full-join-auth": NcFullJoinAuthScreen,
	"nc-full-join-complete": NcFullJoinCompleteScreen,
	"nc-full-join-info": NcFullJoinInfoScreen,
	"nc-full-join-terms": NcFullJoinTermsScreen,
	"nc-full-leave-auth": NcFullLeaveAuthScreen,
	"nc-full-leave-confirm": NcFullLeaveConfirmScreen,
	"nc-full-leave-notice": NcFullLeaveNoticeScreen,
	"nc-full-leave-reason": NcFullLeaveReasonScreen,
	"nc-full-leave-result": NcFullLeaveResultScreen,
	"nc-full-rejoin-auth": NcFullRejoinAuthScreen,
	"nc-full-rejoin-complete": NcFullRejoinCompleteScreen,
	"nc-full-rejoin-info": NcFullRejoinInfoScreen,
	"nc-simple-dormancy-auth": NcSimpleDormancyAuthScreen,
	"nc-simple-dormancy-login": NcSimpleDormancyLoginScreen,
	"nc-simple-dormancy-result": NcSimpleDormancyResultScreen,
	"nc-simple-dormancy-terms": NcSimpleDormancyTermsScreen,
	"nc-simple-join-auth": NcSimpleJoinAuthScreen,
	"nc-simple-join-complete": NcSimpleJoinCompleteScreen,
	"nc-simple-join-info": NcSimpleJoinInfoScreen,
	"nc-simple-join-terms": NcSimpleJoinTermsScreen,
	"nc-simple-leave-auth": NcSimpleLeaveAuthScreen,
	"nc-simple-leave-confirm": NcSimpleLeaveConfirmScreen,
	"nc-simple-leave-reason": NcSimpleLeaveReasonScreen,
	"nc-simple-leave-result": NcSimpleLeaveResultScreen,
	"nc-simple-rejoin-auth": NcSimpleRejoinAuthScreen,
	"nc-simple-rejoin-blocked": NcSimpleRejoinBlockedScreen,
	"nc-simple-rejoin-complete": NcSimpleRejoinCompleteScreen,
	"nc-simple-rejoin-info": NcSimpleRejoinInfoScreen,
};

const FLOW_ORDER = [
	"join",
	"leave",
	"rejoin",
	"dormancy",
] as const;

export default function FigmaExportPage() {
	const exportScreens = screens.filter(
		(screen) => EXPORT_GROUPS.includes(screen.group) && RENDERERS[screen.id],
	);

	return (
		<main className="batch-export-root">
			<header className="batch-export-header">
				<p>Screen-to-Screen · Figma middleware</p>
				<h1>NC Full / NC Simple batch export</h1>
				<span>{exportScreens.length} rendered screens · iframe-free DOM</span>
			</header>

			{EXPORT_GROUPS.map((group) => {
				const groupScreens = exportScreens.filter((screen) => screen.group === group);
				return (
					<section className="batch-domain" key={group}>
						<h2>{group}</h2>
						{FLOW_ORDER.map((flow) => {
							const flowScreens = groupScreens
								.filter((screen) => screen.id.includes(`-${flow}-`));
							if (flowScreens.length === 0) return null;
							return (
								<section className="batch-flow" key={`${group}-${flow}`}>
									<div className="batch-flow-title">
										<h3>{flow}</h3>
										<span>{flowScreens.length} screens</span>
									</div>
									<div className="batch-grid">
										{flowScreens.map((screen) => (
											<ScreenFrame key={screen.id} id={screen.id} label={screen.label} />
										))}
									</div>
								</section>
							);
						})}
					</section>
				);
			})}
		</main>
	);
}

function ScreenFrame({ id, label }: { id: string; label: string }) {
	const Renderer = RENDERERS[id];
	const spec = activeRenderableScreenSpecs[id as ActiveRenderableScreenSpecId];

	return (
		<article className="batch-screen-card">
			<div className="batch-screen-meta">
				<strong>{label}</strong>
				<span>{id}</span>
			</div>
			<div className="batch-phone-frame">
				<Renderer spec={spec} />
			</div>
		</article>
	);
}
