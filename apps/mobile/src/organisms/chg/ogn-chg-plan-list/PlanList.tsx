import {
	Badge,
	RQRNotice,
	RadioButton,
	Text,
	TitleSection,
} from "@pxds/cx-components";
import {
	ContentSection,
	PageStackContents,
	PageStackList,
} from "@pxds/cx-layout/components";
import { VStack } from "@pxds/cx-layout/components/primitives";

const plans = [
	{
		id: "plan-prime",
		label: "5GX 프라임",
		price: "월 89,000원",
		specs: ["데이터 무제한", "공유/테더링 50GB"],
		badge: "추천",
		checked: true,
	},
	{
		id: "plan-regular",
		label: "5GX 레귤러",
		price: "월 69,000원",
		specs: ["데이터 110GB", "소진 후 5Mbps"],
		badge: null,
		checked: false,
	},
] as const;

type PlanCardProps = {
	plan: (typeof plans)[number];
};

function ProductPlanCard({ plan }: PlanCardProps) {
	return (
		<div
			className="chg-product-plan-card"
			data-selected={plan.checked ? "true" : "false"}
			data-figma-render="component"
			data-figma-component-id="list-product-horizontal"
			data-figma-property-selected={plan.checked ? "true" : "false"}
		>
			<RadioButton
				checked={plan.checked}
				name="plan"
				value={plan.id}
				onCheckedChange={() => undefined}
				data-figma-render="slot"
				data-figma-component-id="list-product-horizontal-selection"
			/>
			<span className="chg-product-plan-card__body" data-figma-render="layout">
				<span className="chg-product-plan-card__header">
					<Text
						as="span"
						className="chg-product-plan-card__title"
						variant="listTitle"
					>
						{plan.label}
					</Text>
					<Text
						as="span"
						className="chg-product-plan-card__price"
						variant="label"
					>
						{plan.price}
					</Text>
				</span>
				<span className="chg-product-plan-card__specs">
					{plan.specs.map((spec) => (
						<Text
							key={spec}
							as="span"
							className="chg-product-plan-card__spec"
							variant="bodySubtle"
						>
							{spec}
						</Text>
					))}
				</span>
				{plan.badge ? (
					<Badge
						className="chg-product-plan-card__badge"
						text={plan.badge}
						type="blue"
					/>
				) : null}
			</span>
		</div>
	);
}

export function PlanList() {
	return (
		<VStack data-ogn-id="ogn-chg-plan-list" gap="var(--spacing-0)">
			<ContentSection inset="bleed">
				<PageStackList title={<TitleSection title="추천 요금제" />}>
					<VStack className="chg-product-list-group" gap="var(--spacing-12)">
						{plans.map((plan) => (
							<ProductPlanCard key={plan.id} plan={plan} />
						))}
					</VStack>
				</PageStackList>
			</ContentSection>
			<PageStackContents>
				<RQRNotice title="선택 안내" tone="info">
					회선 조건에 맞지 않는 요금제는 선택 후에도 사유 안내와 함께
					선택이 해제될 수 있어요.
				</RQRNotice>
			</PageStackContents>
		</VStack>
	);
}

export const planCount = plans.length;
