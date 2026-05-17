import {
	Badge,
	RQRListOption,
	RQRNotice,
	SectionItem,
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
		description: "데이터 무제한 · 공유/테더링 50GB",
		checked: true,
	},
	{
		id: "plan-regular",
		label: "5GX 레귤러",
		price: "월 69,000원",
		description: "데이터 110GB · 소진 후 5Mbps",
		checked: false,
	},
] as const;

export function PlanList() {
	return (
		<VStack data-ogn-id="ogn-chg-plan-list" gap="var(--spacing-0)">
			<ContentSection inset="bleed">
				<PageStackList title={<TitleSection title="추천 요금제" />}>
					<SectionItem variant="card">
						<VStack gap="var(--spacing-0)">
							{plans.map((plan) => (
								<RQRListOption
									key={plan.id}
									type="radio"
									name="plan"
									value={plan.id}
									title={plan.label}
									description={plan.description}
									checked={plan.checked}
									trailing={<Badge text={plan.price} type="blue" />}
									data-figma-component-id="list-product-horizontal-candidate"
								/>
							))}
						</VStack>
					</SectionItem>
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
