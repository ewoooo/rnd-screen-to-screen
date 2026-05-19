import { RQRNotice } from "@pxds/cx-components";
import { VStack } from "@pxds/cx-layout/components/primitives";

export function ChangeEligibility() {
	return (
		<VStack data-ogn-id="ogn-chg-change-eligibility" gap="var(--spacing-16)">
			<RQRNotice title="변경 가능" tone="positive">
				현재 회선은 앱에서 요금제 변경을 진행할 수 있어요. 최근 변경
				이력, 미납, 정지 상태가 있으면 변경이 제한될 수 있어요.
			</RQRNotice>
			<RQRNotice title="확인해 주세요" tone="cautionary">
				월 중 변경 시 요금과 혜택은 적용 시점에 따라 달라질 수 있어요.
			</RQRNotice>
		</VStack>
	);
}
