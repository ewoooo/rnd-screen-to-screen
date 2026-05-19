import {
	Callout,
	ListText,
	RQRContentsDetail,
	SectionItem,
	TitleMain,
	TitleSection,
	type RQRContentsDetailRow,
} from "@pxds/cx-components";
import { PageStackContents, SectionDivider } from "@pxds/cx-layout/components";
import { VStack } from "@pxds/cx-layout/components/primitives";

const currentPlanRows = [
	{ id: "current-plan", label: "요금제", value: "5GX 레귤러" },
	{ id: "current-price", label: "월정액", value: "69,000원" },
	{ id: "current-data", label: "데이터", value: "110GB" },
	{ id: "current-benefit", label: "주요 혜택", value: "공유 데이터 18GB" },
] as const satisfies readonly RQRContentsDetailRow[];

const selectedPlanRows = [
	{ id: "selected-plan", label: "요금제", value: "5GX 프라임" },
	{ id: "selected-price", label: "월정액", value: "89,000원" },
	{ id: "selected-data", label: "데이터", value: "무제한" },
	{ id: "selected-benefit", label: "주요 혜택", value: "스마트기기 1회선 무료" },
] as const satisfies readonly RQRContentsDetailRow[];

export function PlanComparison() {
	return (
		<VStack data-ogn-id="ogn-chg-plan-comparison" gap="var(--spacing-0)">
			<PageStackContents
				title={
					<TitleMain
						title="변경할 요금제를 확인해 주세요"
						subTitle="현재 요금제와 변경 후 요금제의 월정액, 데이터, 주요 혜택을 비교해 보세요."
					/>
				}
			>
				<VStack gap="var(--spacing-16)">
					<RQRContentsDetail title="현재 요금제" rows={currentPlanRows} />
					<RQRContentsDetail title="변경할 요금제" rows={selectedPlanRows} />
				</VStack>
			</PageStackContents>
			<SectionDivider thickness="section" />
			<PageStackContents title={<TitleSection title="예상 변경 정보" />}>
				<SectionItem>
					<VStack gap="var(--spacing-12)">
						<ListText
							table
							text="예상 월정액"
							tableText="89,000원"
							showRightItem={false}
						/>
						<ListText
							table
							text="예상 적용일"
							tableText="2026.05.18"
							showRightItem={false}
						/>
						<Callout title="요금 변동 안내">
							월 중 변경으로 이번 달 청구 금액은 실제 사용 기간과 할인 적용
							조건에 따라 달라질 수 있어요.
						</Callout>
					</VStack>
				</SectionItem>
			</PageStackContents>
		</VStack>
	);
}
