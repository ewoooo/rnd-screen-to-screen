import {
	RQRContentsDetail,
	type RQRContentsDetailRow,
} from "@pxds/cx-components";

const currentPlanRows = [
	{ id: "plan-name", label: "현재 요금제", value: "5GX 프라임" },
	{ id: "monthly-price", label: "월정액", value: "89,000원" },
	{ id: "data", label: "데이터", value: "무제한" },
	{ id: "discount", label: "할인", value: "선택약정 적용 중" },
] as const satisfies readonly RQRContentsDetailRow[];

export function CurrentPlanSummary() {
	return (
		<RQRContentsDetail
			data-ogn-id="ogn-chg-current-plan-summary"
			title="현재 이용 상품"
			rows={currentPlanRows}
		/>
	);
}
