import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { Button, SectionMessage } from "@pxds/pxds-components/core";
import { MbrOgnSectionLayout } from "../_layout";

export function SectionMessageJoinCompleteView() {
	return (
		<MbrOgnSectionLayout>
			<SectionMessage
				variant="positive"
				description="가입이 정상 처리되었습니다. 일반 회원으로 자동 로그인됩니다."
			>
				가입이 완료되었습니다
			</SectionMessage>
			<TextBlock variant="bodySubtle" text="가입 후 이용 안내" />
			<TextBlock variant="caption" text="· 세션 유효시간 24시간" />
			<TextBlock variant="caption" text="· 가입 완료 후 홈으로 이동합니다" />
			<Button variant="solid" size="large">
				홈으로 이동
			</Button>
		</MbrOgnSectionLayout>
	);
}
