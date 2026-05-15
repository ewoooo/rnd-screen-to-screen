import { ListText, Notice, TitleContents } from "@pxds/cx-components";
import { VStack } from "@pxds/pxds-layout/primitives";

const POST_JOIN_NOTES = [
	{ id: "session", text: "세션 유효시간은 24시간입니다." },
	{ id: "home", text: "가입 완료 후 홈으로 이동합니다." },
] as const;

export function SectionMessageJoinCompleteView() {
	return (
		<VStack gap="var(--semantic-spacing-block)">
			<Notice tone="positive" title="가입이 정상 처리되었습니다">
				일반 회원으로 자동 로그인됩니다.
			</Notice>
			<VStack>
				<TitleContents title="가입 후 이용 안내" />
				{POST_JOIN_NOTES.map((item) => (
					<ListText key={item.id} text={item.text} />
				))}
			</VStack>
		</VStack>
	);
}
