import {
	RQRContentsDetail,
	TitleMain,
	type RQRContentsDetailRow,
} from "@pxds/cx-components";
import { PageStackContents } from "@pxds/cx-layout/components";

const completionRows = [
	{ id: "changed-plan", label: "변경한 요금제", value: "5GX 프라임" },
	{ id: "request-status", label: "신청 결과", value: "변경 신청 완료" },
	{ id: "effective-date", label: "적용 시점", value: "2026.05.18" },
	{ id: "monthly-price", label: "월정액", value: "89,000원" },
] as const satisfies readonly RQRContentsDetailRow[];

export function ChangeComplete() {
	return (
		<PageStackContents
			data-ogn-id="ogn-chg-change-complete"
			title={
				<TitleMain
					type="complete"
					title="요금제 변경 신청이 완료되었어요"
					subTitle="변경된 요금제는 안내된 적용 시점부터 이용할 수 있어요."
				/>
			}
		>
			<RQRContentsDetail title="변경 신청 정보" rows={completionRows} />
		</PageStackContents>
	);
}
