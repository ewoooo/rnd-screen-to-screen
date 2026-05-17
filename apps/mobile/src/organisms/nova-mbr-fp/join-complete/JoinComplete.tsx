import { ListText, Notice, TitleContents } from "@pxds/cx-components";
import { PageStackContents } from "@pxds/cx-layout/components/contents";
import { VStack } from "@pxds/cx-layout/primitives";

// SB ogn-mbr-join-complete: 항상 노출되는 가입 완료 결과 안내 영역 (정책 불요).
// positive 완료 메시지 + 이용 안내 가이드 + 세션 생성 실패 시 cautionary 복구 안내(UXPT_RCV).
const POST_JOIN_NOTES = [
	{ id: "session", text: "· 가입한 계정으로 로그인 상태가 유지돼요" },
	{ id: "home", text: "· 가입 완료 후 홈에서 서비스를 이용해 주세요" },
] as const;

export function JoinComplete() {
	return (
		<PageStackContents showTitle={false}>
			<VStack gap="var(--semantic-spacing-block)">
				<Notice tone="positive" title="회원 가입이 완료됐어요">
					가입한 계정으로 서비스를 이용할 수 있어요
				</Notice>
				<VStack>
					<TitleContents title="이용 안내" showButton={false} />
					{POST_JOIN_NOTES.map((item) => (
						<ListText
							key={item.id}
							text={item.text}
							showRightItem={false}
						/>
					))}
				</VStack>
				<Notice tone="cautionary" title="로그인 정보를 만들지 못했어요">
					다시 로그인해 주세요
				</Notice>
			</VStack>
		</PageStackContents>
	);
}
