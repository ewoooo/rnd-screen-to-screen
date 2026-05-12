import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { Button, SectionMessage } from "@pxds/pxds-components/core";
import {
	ConsentList,
	FormField,
	PrimaryCTABar,
	SelectableList,
	TextField,
} from "@pxds/pxds-components/molecules";
import {
	ContentRail,
	ContentSection,
	type ContentRailKind,
	type ContentRailMeasure,
	type ContentSectionInset,
} from "@pxds/pxds-layout/app-screen";
import { VStack } from "@pxds/pxds-layout/primitives";

type MbrContentSectionProps = {
	children: React.ReactNode;
	inset?: ContentSectionInset;
	rail?: ContentRailKind;
	measure?: ContentRailMeasure;
};

export function MbrContentSection({
	children,
	inset = "inherit",
	rail = "inset",
	measure = "body",
}: MbrContentSectionProps) {
	return (
		<ContentSection inset={inset}>
			<ContentRail rail={rail} measure={measure}>
				<VStack gap="var(--semantic-spacing-block)">{children}</VStack>
			</ContentRail>
		</ContentSection>
	);
}

export function MbrPageHeaderSection({ title }: { title: string }) {
	return (
		<MbrContentSection>
			<TextBlock variant="displayTitle" text={title} />
		</MbrContentSection>
	);
}

export function MbrTermsAgreementSection() {
	return (
		<MbrContentSection>
			<ConsentList
				allLabel="전체 동의"
				allCaption="필수·선택 약관을 모두 동의합니다"
				items={[
					{
						id: "service",
						title: "[필수] 서비스 이용약관 동의",
						caption: "회원 가입 및 서비스 이용을 위해 필요합니다.",
						required: true,
					},
					{
						id: "privacy",
						title: "[필수] 개인정보 수집·이용 동의",
						caption: "이름·연락처 등 회원 정보 처리에 필요합니다.",
						required: true,
					},
					{
						id: "marketing",
						title: "[선택] 마케팅 정보 수신 동의",
						caption: "혜택·이벤트 안내를 받습니다.",
						required: false,
					},
				]}
			/>
		</MbrContentSection>
	);
}

export function MbrGuardianConsentSection({ visible = false }: { visible?: boolean }) {
	if (!visible) return null;

	return (
		<MbrContentSection>
			<SectionMessage
				variant="info"
				description="만 14세 미만 고객의 가입은 법정대리인 동의가 필요합니다."
			>
				법정대리인 동의 안내
			</SectionMessage>
			<FormField label="법정대리인 이름">
				<TextField value="" placeholder="법정대리인 이름" readOnly />
			</FormField>
			<FormField label="법정대리인 연락처" helperText="동의 요청 유효시간 24시간">
				<TextField value="" placeholder="법정대리인 연락처" readOnly />
			</FormField>
			<Button variant="solid" size="large">
				동의 요청 보내기
			</Button>
		</MbrContentSection>
	);
}

export function MbrTermsActionArea({ disabled = true }: { disabled?: boolean }) {
	return <PrimaryCTABar primaryLabel="다음" disabled={disabled} />;
}

export function MbrMemberInfoFormSection() {
	return (
		<MbrContentSection>
			<FormField
				label="아이디"
				helperText="영문 소문자 또는 숫자 6~20자"
			>
				<TextField value="" placeholder="영문, 숫자 6~20자" readOnly />
			</FormField>
			<Button variant="outlined" size="large">
				중복확인
			</Button>
			<FormField
				label="비밀번호"
				helperText="영문/숫자/특수문자를 조합해 주세요."
			>
				<TextField
					value=""
					placeholder="영문/숫자/특수문자 조합 10~20자"
					readOnly
				/>
			</FormField>
			<FormField label="비밀번호 확인">
				<TextField value="" placeholder="비밀번호 재입력" readOnly />
			</FormField>
			<FormField label="이메일">
				<TextField value="" placeholder="example@domain.com" readOnly />
			</FormField>
			<FormField label="휴대폰번호">
				<TextField value="" placeholder="숫자만 입력" readOnly />
			</FormField>
		</MbrContentSection>
	);
}

export function MbrEntryBranchMessageSection({
	visible = false,
}: {
	visible?: boolean;
}) {
	if (!visible) return null;

	return (
		<MbrContentSection>
			<SectionMessage
				variant="cautionary"
				description="로그인 화면으로 이동해 주세요."
			>
				이미 가입된 회원
			</SectionMessage>
			<Button variant="outlined" size="large">
				로그인하기
			</Button>
		</MbrContentSection>
	);
}

export function MbrAuthMethodSection() {
	return (
		<MbrContentSection inset="bleed" rail="inset">
			<FormField label="인증번호" helperText="유효시간 3분">
				<TextField value="" placeholder="6자리 숫자" readOnly />
			</FormField>
			<SelectableList
				name="auth-method"
				value="phone"
				density="compact"
				items={[
					{ id: "phone", title: "휴대폰 인증" },
					{ id: "pass", title: "PASS 인증" },
					{ id: "cert", title: "공동인증서" },
				]}
			/>
			<TextBlock variant="caption" text="남은 시간 02:48" />
			<Button variant="solid" size="large">
				인증번호 요청
			</Button>
			<Button variant="outlined" size="large">
				재요청
			</Button>
			<SectionMessage
				variant="negative"
				description="10분 후 다시 시도해 주세요"
			>
				인증 실패 한도 초과
			</SectionMessage>
		</MbrContentSection>
	);
}

export function MbrJoinCompleteSection() {
	return (
		<MbrContentSection>
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
		</MbrContentSection>
	);
}
