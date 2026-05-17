"use client";

import { useState } from "react";
import { Notice, TextField } from "@pxds/cx-components";
import { FieldStack } from "@pxds/cx-layout/components/compositions";
import { VStack } from "@pxds/cx-layout/primitives";

/**
 * ogn-mbr-member-input — NEW organism.
 *
 * Owns the policy-backed member input validation for NOVA-MBR-FP-002-0.
 * Five TextFields grouped in a single FieldStack semantic group.
 *
 * Policy-backed (Screen.map.md Section A, verbatim copy):
 * - 아이디:   INFO-002-03 (영문/숫자) + INFO-002-04 (6~20자)
 * - 비밀번호: INFO-002-05 (10~20자) + INFO-002-06 (3종 이상 조합)
 * - 휴대폰번호: INFO-002-08 (숫자 11자리)
 *
 * SB-only (no policy text fabricated): 비밀번호 확인 (SB-MI-02, form-integrity
 * mismatch only), 이메일 (SB-MI-03, no format rule invented), 중복 검증
 * (SB-MI-04, server response copy only — not authored here).
 *
 * C1: per-field format/length errors live in each TextField's `error` +
 * `helperText` slot. The single submit-level negative Notice covers only the
 * cross-field 필수값 누락 종합 (E1) that cannot bind to one field.
 */

const ID_PATTERN = /^[A-Za-z0-9]+$/;
const PHONE_PATTERN = /^[0-9]{11}$/;

const passwordCharClasses = (value: string) => {
	let classes = 0;
	if (/[A-Z]/.test(value)) classes += 1;
	if (/[a-z]/.test(value)) classes += 1;
	if (/[0-9]/.test(value)) classes += 1;
	if (/[^A-Za-z0-9]/.test(value)) classes += 1;
	return classes;
};

type Touched = {
	userId: boolean;
	password: boolean;
	passwordConfirm: boolean;
	email: boolean;
	phone: boolean;
};

const initialTouched: Touched = {
	userId: false,
	password: false,
	passwordConfirm: false,
	email: false,
	phone: false,
};

export function MemberInput() {
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [touched, setTouched] = useState<Touched>(initialTouched);
	const [submitAttempted, setSubmitAttempted] = useState(false);

	const markTouched = (key: keyof Touched) =>
		setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));

	// 아이디 — INFO-002-03 (문자 종류) → INFO-002-04 (길이). 우선순위: 빈값 → 형식 → 길이.
	const userIdError = (() => {
		if (!userId) return "아이디를 입력해 주세요";
		if (!ID_PATTERN.test(userId)) return "아이디는 영문과 숫자만 입력해 주세요";
		if (userId.length < 6 || userId.length > 20)
			return "아이디는 6~20자로 입력해 주세요";
		return undefined;
	})();

	// 비밀번호 — INFO-002-05 (길이) / INFO-002-06 (조합).
	const passwordError = (() => {
		if (!password) return "비밀번호를 입력해 주세요";
		if (password.length < 10 || password.length > 20)
			return "비밀번호는 10~20자로 입력해 주세요";
		if (passwordCharClasses(password) < 3)
			return "영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요";
		return undefined;
	})();

	// 비밀번호 확인 — SB-only (SB-MI-02). 폼 무결성 보조: 불일치만 판정, 정책 형식 발명 금지.
	const passwordConfirmError = (() => {
		if (!passwordConfirm) return "비밀번호를 다시 입력해 주세요";
		if (passwordConfirm !== password)
			return "비밀번호가 일치하지 않아요. 다시 입력해 주세요";
		return undefined;
	})();

	// 이메일 — SB-only (SB-MI-03). 형식 규칙 정책 부재 → 빈값 필수(SB-MI-01)만 판정.
	const emailError = email ? undefined : "이메일을 입력해 주세요";

	// 휴대폰번호 — INFO-002-08 (숫자만 11자리).
	const phoneError = (() => {
		if (!phone) return "휴대폰번호를 입력해 주세요";
		if (!PHONE_PATTERN.test(phone))
			return "휴대폰번호는 숫자 11자리로 입력해 주세요";
		return undefined;
	})();

	const show = (key: keyof Touched) => touched[key] || submitAttempted;

	const missingRequired =
		!userId || !password || !passwordConfirm || !email || !phone;

	return (
		<VStack gap="var(--semantic-spacing-gap-loose)">
			<FieldStack data-section-id="memberInput">
				<TextField
					label="아이디"
					value={userId}
					placeholder="영문·숫자 6~20자"
					helperText={
						show("userId") && userIdError ? userIdError : "영문·숫자, 6~20자"
					}
					error={show("userId") && Boolean(userIdError)}
					actionButton={{ label: "중복확인" }}
					maxLength={20}
					onChange={(event) => setUserId(event.target.value)}
					onBlur={() => markTouched("userId")}
				/>
				<TextField
					label="비밀번호"
					type="password"
					value={password}
					placeholder="영문 대/소문자·숫자·특수문자 중 3종 이상, 10~20자"
					helperText={
						show("password") && passwordError
							? passwordError
							: "영문 대/소문자·숫자·특수문자 중 3종 이상, 10~20자"
					}
					error={show("password") && Boolean(passwordError)}
					maxLength={20}
					onChange={(event) => setPassword(event.target.value)}
					onBlur={() => markTouched("password")}
				/>
				<TextField
					label="비밀번호 확인"
					type="password"
					value={passwordConfirm}
					placeholder="비밀번호 재입력"
					helperText={
						show("passwordConfirm") && passwordConfirmError
							? passwordConfirmError
							: undefined
					}
					error={show("passwordConfirm") && Boolean(passwordConfirmError)}
					maxLength={20}
					onChange={(event) => setPasswordConfirm(event.target.value)}
					onBlur={() => markTouched("passwordConfirm")}
				/>
				<TextField
					label="이메일"
					type="email"
					value={email}
					placeholder="example@plus-ex.com"
					helperText={
						show("email") && emailError ? emailError : undefined
					}
					error={show("email") && Boolean(emailError)}
					onChange={(event) => setEmail(event.target.value)}
					onBlur={() => markTouched("email")}
				/>
				<TextField
					label="휴대폰번호"
					inputMode="numeric"
					value={phone}
					placeholder="01012345678"
					helperText={
						show("phone") && phoneError ? phoneError : "숫자 11자리"
					}
					error={show("phone") && Boolean(phoneError)}
					maxLength={11}
					onChange={(event) => setPhone(event.target.value)}
					onBlur={() => {
						markTouched("phone");
						setSubmitAttempted(true);
					}}
				/>
			</FieldStack>
			{submitAttempted && missingRequired ? (
				<Notice tone="negative">
					입력하지 않은 필수 항목이 있어요. 모든 항목을 입력해 주세요
				</Notice>
			) : null}
		</VStack>
	);
}
