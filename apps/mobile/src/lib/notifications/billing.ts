/**
 * 외부 알림 카피 사전 (앱 푸시 + SMS).
 * source: 기능 명세서 NOVA-PAY-FO-AP-001~005 + SMS-001
 * pattern source was moved to the repo-level backup with other deprecated specs.
 */

export type BillingEvent =
	| "billing-due"
	| "billing-success"
	| "billing-failure"
	| "billing-canceled"
	| "method-changed";

export type BillingNotification = {
	event: BillingEvent;
	channels: ("app-push" | "sms-mms")[];
	title: string;
	body: string;
	payloadFields: string[];
};

export const BILLING_NOTIFICATIONS: Record<BillingEvent, BillingNotification> = {
	"billing-due": {
		event: "billing-due",
		channels: ["app-push", "sms-mms"],
		title: "결제 예정 안내",
		body: "{product} {amount}원이 {date}에 {method}로 결제될 예정이에요.",
		payloadFields: ["결제 상품", "결제 수단", "결제 예정 금액", "결제 예정일"],
	},
	"billing-success": {
		event: "billing-success",
		channels: ["app-push", "sms-mms"],
		title: "결제 성공",
		body: "{product} {amount}원이 {method}로 정상 결제되었어요.",
		payloadFields: ["결제 상품", "결제 수단", "결제 금액", "결제 일시"],
	},
	"billing-failure": {
		event: "billing-failure",
		channels: ["app-push", "sms-mms"],
		title: "결제 실패",
		body: "{product} 결제에 실패했어요. 사유: {reason}. 결제 수단을 확인해 주세요.",
		payloadFields: [
			"결제 상품",
			"결제 수단",
			"결제 시도 금액",
			"실패 사유",
			"결제 일시",
		],
	},
	"billing-canceled": {
		event: "billing-canceled",
		channels: ["app-push", "sms-mms"],
		title: "결제 취소",
		body: "{product} {amount}원의 결제가 취소되었어요.",
		payloadFields: ["결제 상품", "결제 수단", "결제 금액", "취소 일시"],
	},
	"method-changed": {
		event: "method-changed",
		channels: ["app-push", "sms-mms"],
		title: "결제 수단 변경",
		body: "{product}의 결제 수단이 {from}에서 {to}로 변경되었어요.",
		payloadFields: [
			"결제 상품",
			"변경 전/후 결제 수단",
			"결제 예정 금액",
			"결제 예정일",
		],
	},
};

export const FALLBACK_RULE = {
	primary: "app-push",
	fallbackTo: "sms-mms",
	trigger: "푸시 미설정 또는 발송 실패",
	smsConsentRequired: false,
} as const;
