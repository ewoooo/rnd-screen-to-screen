import { RQRContentsDetail, TitleMain } from "@pxds/cx-components";
import { PageStackContents } from "@pxds/cx-layout/components/contents";

const COMPLETION_SUMMARY_ROWS = [
	{ id: "member-state", label: "회원 상태", value: "일반 회원" },
	{ id: "login", label: "로그인", value: "자동 로그인" },
	{ id: "session", label: "세션 유효시간", value: "24시간" },
	{ id: "destination", label: "이동 경로", value: "홈" },
] as const;

export function JoinCompleteResult() {
	return (
		<PageStackContents
			title={
				<TitleMain
					type="complete"
					title="가입이 완료되었어요"
					subTitle="잠시 후 홈으로 이동해요."
				/>
			}
		>
			<RQRContentsDetail title="가입 정보" rows={COMPLETION_SUMMARY_ROWS} />
		</PageStackContents>
	);
}
