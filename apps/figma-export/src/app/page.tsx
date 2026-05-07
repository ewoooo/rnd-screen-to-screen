"use client";

import type { ComponentType } from "react";
import {
	activeRenderableScreenSpecs,
	screens,
	type ActiveRenderableScreenSpecId,
	type RenderableScreenSpecV1,
	type ScreenEntry,
	type ScreenGroup,
} from "@screen/screens";

import { BillingArrearsStatusScreen } from "@/app/billing-arrears-status/_sdui-renderer";
import { BillingDetailScreen } from "@/app/billing-detail/_sdui-renderer";
import { BillingMscHistoryScreen } from "@/app/billing-msc-history/_sdui-renderer";
import { BillingPayConfirmScreen } from "@/app/billing-pay-confirm/_sdui-renderer";
import { BillingPayFailureScreen } from "@/app/billing-pay-failure/_sdui-renderer";
import { BillingPayMethodScreen } from "@/app/billing-pay-method/_sdui-renderer";
import { BillingPayMethodAuthScreen } from "@/app/billing-pay-method-auth/_sdui-renderer";
import { BillingPayPrepayScreen } from "@/app/billing-pay-prepay/_sdui-renderer";
import { BillingPayPrepayResultScreen } from "@/app/billing-pay-prepay-result/_sdui-renderer";
import { BillingPayProxyScreen } from "@/app/billing-pay-proxy/_sdui-renderer";
import { BillingPayProxyExecuteScreen } from "@/app/billing-pay-proxy-execute/_sdui-renderer";
import { BillingPayProxyResultScreen } from "@/app/billing-pay-proxy-result/_sdui-renderer";
import { BillingPayResultScreen } from "@/app/billing-pay-result/_sdui-renderer";
import { BillingPayScheduleScreen } from "@/app/billing-pay-schedule/_sdui-renderer";
import { BillingPayScheduleResultScreen } from "@/app/billing-pay-schedule-result/_sdui-renderer";
import { BillingPayThirdPartyConsentScreen } from "@/app/billing-pay-third-party-consent/_sdui-renderer";
import { BillingPaymentHistoryScreen } from "@/app/billing-payment-history/_sdui-renderer";
import { BillingRealtimeScreen } from "@/app/billing-realtime/_sdui-renderer";
import { BillingReceiptResultScreen } from "@/app/billing-receipt-result/_sdui-renderer";
import { BillingSetAutoPrepayScreen } from "@/app/billing-set-auto-prepay/_sdui-renderer";
import { BillingSetContentLimitScreen } from "@/app/billing-set-content-limit/_sdui-renderer";
import { BillingSetMethodScreen } from "@/app/billing-set-method/_sdui-renderer";
import { BillingSetMethodCancelScreen } from "@/app/billing-set-method-cancel/_sdui-renderer";
import { BillingSetMethodCancelResultScreen } from "@/app/billing-set-method-cancel-result/_sdui-renderer";
import { BillingSetMscLimitScreen } from "@/app/billing-set-msc-limit/_sdui-renderer";
import { BillingSetStatementScreen } from "@/app/billing-set-statement/_sdui-renderer";
import { BillingStatementScreen } from "@/app/billing-statement/_sdui-renderer";
import { BillingStatementResultScreen } from "@/app/billing-statement-result/_sdui-renderer";
import { BillingSummaryScreen } from "@/app/billing-summary/_sdui-renderer";
import { BillingTargetSelectScreen } from "@/app/billing-target-select/_sdui-renderer";
import { BillingArrearsStatusScreen as BillingArrearsStatusScreenHtml } from "@/app/billing-html-arrears-status/_sdui-renderer";
import { BillingDetailScreen as BillingDetailScreenHtml } from "@/app/billing-html-detail/_sdui-renderer";
import { BillingMscHistoryScreen as BillingMscHistoryScreenHtml } from "@/app/billing-html-msc-history/_sdui-renderer";
import { BillingPayConfirmScreen as BillingPayConfirmScreenHtml } from "@/app/billing-html-pay-confirm/_sdui-renderer";
import { BillingPayFailureScreen as BillingPayFailureScreenHtml } from "@/app/billing-html-pay-failure/_sdui-renderer";
import { BillingPayMethodScreen as BillingPayMethodScreenHtml } from "@/app/billing-html-pay-method/_sdui-renderer";
import { BillingPayMethodAuthScreen as BillingPayMethodAuthScreenHtml } from "@/app/billing-html-pay-method-auth/_sdui-renderer";
import { BillingPayPrepayScreen as BillingPayPrepayScreenHtml } from "@/app/billing-html-pay-prepay/_sdui-renderer";
import { BillingPayPrepayResultScreen as BillingPayPrepayResultScreenHtml } from "@/app/billing-html-pay-prepay-result/_sdui-renderer";
import { BillingPayProxyScreen as BillingPayProxyScreenHtml } from "@/app/billing-html-pay-proxy/_sdui-renderer";
import { BillingPayProxyExecuteScreen as BillingPayProxyExecuteScreenHtml } from "@/app/billing-html-pay-proxy-execute/_sdui-renderer";
import { BillingPayProxyResultScreen as BillingPayProxyResultScreenHtml } from "@/app/billing-html-pay-proxy-result/_sdui-renderer";
import { BillingPayResultScreen as BillingPayResultScreenHtml } from "@/app/billing-html-pay-result/_sdui-renderer";
import { BillingPayScheduleScreen as BillingPayScheduleScreenHtml } from "@/app/billing-html-pay-schedule/_sdui-renderer";
import { BillingPayScheduleResultScreen as BillingPayScheduleResultScreenHtml } from "@/app/billing-html-pay-schedule-result/_sdui-renderer";
import { BillingPayThirdPartyConsentScreen as BillingPayThirdPartyConsentScreenHtml } from "@/app/billing-html-pay-third-party-consent/_sdui-renderer";
import { BillingPaymentHistoryScreen as BillingPaymentHistoryScreenHtml } from "@/app/billing-html-payment-history/_sdui-renderer";
import { BillingRealtimeScreen as BillingRealtimeScreenHtml } from "@/app/billing-html-realtime/_sdui-renderer";
import { BillingReceiptResultScreen as BillingReceiptResultScreenHtml } from "@/app/billing-html-receipt-result/_sdui-renderer";
import { BillingSetAutoPrepayScreen as BillingSetAutoPrepayScreenHtml } from "@/app/billing-html-set-auto-prepay/_sdui-renderer";
import { BillingSetContentLimitScreen as BillingSetContentLimitScreenHtml } from "@/app/billing-html-set-content-limit/_sdui-renderer";
import { BillingSetMethodScreen as BillingSetMethodScreenHtml } from "@/app/billing-html-set-method/_sdui-renderer";
import { BillingSetMethodCancelScreen as BillingSetMethodCancelScreenHtml } from "@/app/billing-html-set-method-cancel/_sdui-renderer";
import { BillingSetMethodCancelResultScreen as BillingSetMethodCancelResultScreenHtml } from "@/app/billing-html-set-method-cancel-result/_sdui-renderer";
import { BillingSetMscLimitScreen as BillingSetMscLimitScreenHtml } from "@/app/billing-html-set-msc-limit/_sdui-renderer";
import { BillingSetStatementScreen as BillingSetStatementScreenHtml } from "@/app/billing-html-set-statement/_sdui-renderer";
import { BillingStatementScreen as BillingStatementScreenHtml } from "@/app/billing-html-statement/_sdui-renderer";
import { BillingStatementResultScreen as BillingStatementResultScreenHtml } from "@/app/billing-html-statement-result/_sdui-renderer";
import { BillingSummaryScreen as BillingSummaryScreenHtml } from "@/app/billing-html-summary/_sdui-renderer";
import { BillingTargetSelectScreen as BillingTargetSelectScreenHtml } from "@/app/billing-html-target-select/_sdui-renderer";

const EXPORT_GROUPS: readonly ScreenGroup[] = ["billing", "billing-html"];

type Renderer = ComponentType<{ spec: RenderableScreenSpecV1 }>;

const RENDERERS: Record<string, Renderer> = {
	"billing-summary": BillingSummaryScreen,
	"billing-detail": BillingDetailScreen,
	"billing-realtime": BillingRealtimeScreen,
	"billing-msc-history": BillingMscHistoryScreen,
	"billing-statement": BillingStatementScreen,
	"billing-statement-result": BillingStatementResultScreen,
	"billing-target-select": BillingTargetSelectScreen,
	"billing-payment-history": BillingPaymentHistoryScreen,
	"billing-receipt-result": BillingReceiptResultScreen,
	"billing-arrears-status": BillingArrearsStatusScreen,
	"billing-pay-method": BillingPayMethodScreen,
	"billing-pay-method-auth": BillingPayMethodAuthScreen,
	"billing-pay-confirm": BillingPayConfirmScreen,
	"billing-pay-result": BillingPayResultScreen,
	"billing-pay-schedule": BillingPayScheduleScreen,
	"billing-pay-schedule-result": BillingPayScheduleResultScreen,
	"billing-pay-proxy": BillingPayProxyScreen,
	"billing-pay-proxy-execute": BillingPayProxyExecuteScreen,
	"billing-pay-proxy-result": BillingPayProxyResultScreen,
	"billing-pay-third-party-consent": BillingPayThirdPartyConsentScreen,
	"billing-pay-prepay": BillingPayPrepayScreen,
	"billing-pay-prepay-result": BillingPayPrepayResultScreen,
	"billing-pay-failure": BillingPayFailureScreen,
	"billing-set-statement": BillingSetStatementScreen,
	"billing-set-method": BillingSetMethodScreen,
	"billing-set-method-cancel": BillingSetMethodCancelScreen,
	"billing-set-method-cancel-result": BillingSetMethodCancelResultScreen,
	"billing-set-msc-limit": BillingSetMscLimitScreen,
	"billing-set-content-limit": BillingSetContentLimitScreen,
	"billing-set-auto-prepay": BillingSetAutoPrepayScreen,
	"billing-html-arrears-status": BillingArrearsStatusScreenHtml,
	"billing-html-detail": BillingDetailScreenHtml,
	"billing-html-msc-history": BillingMscHistoryScreenHtml,
	"billing-html-pay-confirm": BillingPayConfirmScreenHtml,
	"billing-html-pay-failure": BillingPayFailureScreenHtml,
	"billing-html-pay-method": BillingPayMethodScreenHtml,
	"billing-html-pay-method-auth": BillingPayMethodAuthScreenHtml,
	"billing-html-pay-prepay": BillingPayPrepayScreenHtml,
	"billing-html-pay-prepay-result": BillingPayPrepayResultScreenHtml,
	"billing-html-pay-proxy": BillingPayProxyScreenHtml,
	"billing-html-pay-proxy-execute": BillingPayProxyExecuteScreenHtml,
	"billing-html-pay-proxy-result": BillingPayProxyResultScreenHtml,
	"billing-html-pay-result": BillingPayResultScreenHtml,
	"billing-html-pay-schedule": BillingPayScheduleScreenHtml,
	"billing-html-pay-schedule-result": BillingPayScheduleResultScreenHtml,
	"billing-html-pay-third-party-consent": BillingPayThirdPartyConsentScreenHtml,
	"billing-html-payment-history": BillingPaymentHistoryScreenHtml,
	"billing-html-realtime": BillingRealtimeScreenHtml,
	"billing-html-receipt-result": BillingReceiptResultScreenHtml,
	"billing-html-set-auto-prepay": BillingSetAutoPrepayScreenHtml,
	"billing-html-set-content-limit": BillingSetContentLimitScreenHtml,
	"billing-html-set-method": BillingSetMethodScreenHtml,
	"billing-html-set-method-cancel": BillingSetMethodCancelScreenHtml,
	"billing-html-set-method-cancel-result": BillingSetMethodCancelResultScreenHtml,
	"billing-html-set-msc-limit": BillingSetMscLimitScreenHtml,
	"billing-html-set-statement": BillingSetStatementScreenHtml,
	"billing-html-statement": BillingStatementScreenHtml,
	"billing-html-statement-result": BillingStatementResultScreenHtml,
	"billing-html-summary": BillingSummaryScreenHtml,
	"billing-html-target-select": BillingTargetSelectScreenHtml,
};

const FLOW_DEFINITIONS = [
	{
		id: "chk",
		label: "check",
		matches: (screen: ScreenEntry) =>
			!screen.id.includes("-pay-") && !screen.id.includes("-set-"),
	},
	{
		id: "pay",
		label: "pay",
		matches: (screen: ScreenEntry) => screen.id.includes("-pay-"),
	},
	{
		id: "set",
		label: "set",
		matches: (screen: ScreenEntry) => screen.id.includes("-set-"),
	},
] as const;

export default function FigmaExportPage() {
	const exportScreens = screens.filter(
		(screen) => EXPORT_GROUPS.includes(screen.group) && RENDERERS[screen.id],
	);

	return (
		<main className="batch-export-root">
			<header className="batch-export-header">
				<p>Screen-to-Screen · Figma middleware</p>
				<h1>Billing / Billing HTML batch export</h1>
				<span>{exportScreens.length} rendered screens · iframe-free DOM</span>
			</header>

			{EXPORT_GROUPS.map((group) => {
				const groupScreens = exportScreens.filter((screen) => screen.group === group);
				return (
					<section className="batch-domain" key={group}>
						<h2>{group}</h2>
						{FLOW_DEFINITIONS.map((flow) => {
							const flowScreens = groupScreens.filter(flow.matches);
							if (flowScreens.length === 0) return null;
							return (
								<section className="batch-flow" key={`${group}-${flow.id}`}>
									<div className="batch-flow-title">
										<h3>{flow.label}</h3>
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
