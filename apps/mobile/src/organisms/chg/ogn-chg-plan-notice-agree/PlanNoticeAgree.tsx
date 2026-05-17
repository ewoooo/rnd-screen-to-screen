import { Checkbox, ListText, SectionItem, TitleSection } from "@pxds/cx-components";
import { FieldStack, PageStackContents } from "@pxds/cx-layout/components";
import { VStack } from "@pxds/cx-layout/components/primitives";

const noticeItems = [
	"월 중 변경 시 이용 기간에 따라 요금이 일할 계산될 수 있어요.",
	"할인 또는 결합 혜택 금액이 변경되거나 종료될 수 있어요.",
	"일부 부가서비스는 변경할 요금제에서 이용이 제한될 수 있어요.",
] as const;

export type PlanNoticeAgreeProps = {
	agreed: boolean;
	onAgreedChange: (agreed: boolean) => void;
};

export function PlanNoticeAgree({
	agreed,
	onAgreedChange,
}: PlanNoticeAgreeProps) {
	return (
		<PageStackContents
			data-ogn-id="ogn-chg-plan-notice-agree"
			title={<TitleSection title="변경 전 유의사항" />}
		>
			<SectionItem>
				<VStack gap="var(--spacing-12)">
					{noticeItems.map((item) => (
						<ListText key={item} text={item} showRightItem={false} />
					))}
					<FieldStack>
						<Checkbox
							checked={agreed}
							label="유의사항을 모두 확인했어요"
							onCheckedChange={onAgreedChange}
						/>
					</FieldStack>
				</VStack>
			</SectionItem>
		</PageStackContents>
	);
}
