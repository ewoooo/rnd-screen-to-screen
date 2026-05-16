import { ListText, Notice, TitleContents } from "@pxds/cx-components";
import { PageStackContents } from "@pxds/cx-layout/components/contents";
import { VStack } from "@pxds/cx-layout/primitives";

const POST_JOIN_NOTES = [
	{ id: "session", text: "· 세션 유효시간은 24시간입니다." },
	{ id: "home", text: "· 가입 완료 후 홈으로 이동합니다." },
] as const;

export function SectionMessageJoinCompleteView() {
	return (
		<PageStackContents showTitle={false}>
			<VStack gap="var(--semantic-spacing-block)">
				<Notice tone="positive" title="가입이 정상 처리되었습니다">
					일반 회원으로 자동 로그인됩니다.
				</Notice>
				<VStack>
					<TitleContents title="가입 후 이용 안내" showButton={false} />
					{POST_JOIN_NOTES.map((item) => (
						<ListText
							key={item.id}
							text={item.text}
							showRightItem={false}
						/>
					))}
				</VStack>
			</VStack>
		</PageStackContents>
	);
}
