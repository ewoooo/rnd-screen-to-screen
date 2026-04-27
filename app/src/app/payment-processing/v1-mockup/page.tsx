import type { CSSProperties } from "react";

import { ListSub } from "@/components/home-kit";
import { PayContent, T_BRAND } from "@/components/payment-kit";
import { DetailShell } from "@/components/search-kit";

import { paymentProcessingV1MockupMock as mock, type ProcessingStep } from "./_mock";

export default function PaymentProcessingV1MockupPage() {
	return (
		<DetailShell title={mock.header}>
			<PayContent>
				<div style={timelineStyle}>
					{mock.steps.map((step, i) => (
						<StepItem key={step.id} step={step} isLast={i === mock.steps.length - 1} />
					))}
				</div>
				<LoadingBlock title={mock.loadingTitle} sub={mock.loadingSub} />
			</PayContent>
		</DetailShell>
	);
}

function StepItem({ step, isLast }: { step: ProcessingStep; isLast: boolean }) {
	const isInProgress = step.state === "in-progress";
	return (
		<div style={{ display: "flex", gap: "var(--spacing-12)", alignItems: "stretch" }}>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "0 0 auto" }}>
				<div
					style={{
						width: 28,
						height: 28,
						borderRadius: 14,
						background: isInProgress ? "transparent" : T_BRAND,
						border: isInProgress ? `2px solid ${T_BRAND}` : "none",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: isInProgress ? T_BRAND : "#FFFFFF",
						fontSize: 11,
						fontWeight: 700,
					}}
				>
					{isInProgress ? "·" : "✓"}
				</div>
				{isLast ? null : (
					<div
						style={{
							width: 2,
							flex: 1,
							minHeight: 32,
							background: isInProgress ? "var(--semantic-line-normal-normal, #ecf1ff)" : T_BRAND,
							marginTop: 4,
							marginBottom: 4,
						}}
					/>
				)}
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 4, paddingBottom: 16 }}>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
					}}
				>
					{step.title}
				</span>
				<span
					style={{
						fontSize: 12,
						color: isInProgress ? T_BRAND : "var(--semantic-label-alternative)",
						fontWeight: isInProgress ? 700 : 400,
					}}
				>
					{step.desc}
				</span>
			</div>
		</div>
	);
}

function LoadingBlock({ title, sub }: { title: string; sub: string }) {
	return (
		<div style={loadingStyle}>
			<div style={spinnerStyle} />
			<span style={loadingTitleStyle}>{title}</span>
			<div style={{ textAlign: "center", whiteSpace: "pre-line" }}>
				<ListSub>{sub}</ListSub>
			</div>
		</div>
	);
}

const timelineStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	paddingTop: "var(--spacing-16)",
};

const loadingStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "var(--spacing-12)",
	padding: "var(--spacing-32) 0",
};

const spinnerStyle: CSSProperties = {
	width: 48,
	height: 48,
	borderRadius: 24,
	border: `4px solid ${T_BRAND}`,
	borderTopColor: "transparent",
	animation: "payment-processing-spin 1s linear infinite",
};

const loadingTitleStyle: CSSProperties = {
	fontSize: 16,
	fontWeight: 600,
	color: "var(--semantic-label-normal)",
};
