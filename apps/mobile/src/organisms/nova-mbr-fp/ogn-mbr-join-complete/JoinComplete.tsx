import {
	RQRContentsDetail,
	type RQRContentsDetailRow,
	RQRNotice,
	TitleMain,
} from "@pxds/cx-components";
import { PageStackContents } from "@pxds/cx-layout/components/contents";

export type JoinCompleteProps = {
	/**
	 * S3 result-summary (R5, conditional / Summary Card Decision Rule).
	 * SB provides no result fields (`서버 제어 항목: -`). Render the card only
	 * when result key-value data is supplied; never invent 요금제/금액/적용일.
	 */
	summaryRows?: readonly RQRContentsDetailRow[];
	/**
	 * S4 session-error-message (R4, out-of-state E3 세션 생성 실패).
	 * When true, render the cautionary notice. Mutually exclusive with the
	 * default success guidance per Distortion Gate 7 (상태 배타성).
	 */
	sessionError?: boolean;
};

export function JoinComplete({
	summaryRows,
	sessionError = false,
}: JoinCompleteProps) {
	const hasSummary = summaryRows !== undefined && summaryRows.length > 0;

	return (
		<PageStackContents
			title={
				<TitleMain
					type="complete"
					title="가입이 완료됐어요"
					subTitle="이제 서비스를 바로 이용할 수 있어요."
				/>
			}
		>
			<RQRNotice tone="positive">가입이 정상적으로 완료됐어요.</RQRNotice>
			{hasSummary ? (
				<RQRContentsDetail title="가입 정보" rows={summaryRows} />
			) : null}
			{sessionError ? (
				<RQRNotice tone="cautionary" title="로그인 세션을 만들지 못했습니다">
					다시 로그인하면 바로 이용할 수 있어요.
				</RQRNotice>
			) : null}
		</PageStackContents>
	);
}
