import { Text } from "@pxds/cx-components";
import { SectionMessage } from "@pxds/pxds-components/core";
import { VStack } from "@pxds/pxds-layout/primitives";

export function SectionMessageJoinCompleteView() {
	return (
		<VStack gap="var(--semantic-spacing-block)">
			<SectionMessage
				variant="positive"
				description="가입이 정상 처리되었습니다. 일반 회원으로 자동 로그인됩니다."
			>
				가입이 완료되었습니다
			</SectionMessage>
			<Text variant="bodySubtle" as="p">
				가입 후 이용 안내
			</Text>
			<Text variant="caption" as="p">
				· 세션 유효시간 24시간
			</Text>
			<Text variant="caption" as="p">
				· 가입 완료 후 홈으로 이동합니다
			</Text>
		</VStack>
	);
}
