# (nova-mbr-fp) — DESIGN_PATTERNS 사전 교정안 (Build 강제 계약)

> 출처: `DESIGN_PATTERNS.md` §섹션 패턴 상세_정보 입력(Form Entry) / 완료(Completion) / §10 CTA·폼·오버레이 조합 / §11 Divider 체계 / §13 핵심 원칙.
> 이 문서는 Build(Phase 4)가 6개 화면과 9개 신규 OGN을 구현할 때 **반드시 적용**하는 패턴 교정 계약이다. 각 화면의 `Screen.diagram.md` Distortion Gates에 적용 결과를 1줄로 기록한다.

## C1 · 필드 에러는 TextField help/error slot 소유 (외부 Notice 금지)

`DESIGN_PATTERNS §10 폼 조합`: "에러 메시지는 해당 `TextField` 바로 아래 help text slot에 붙인다. 별도 callout으로 필드 밖에 띄우지 않는다."

- `ogn-mbr-member-input` (FP-002): 아이디/비밀번호/비밀번호확인/이메일/휴대폰의 **형식·길이 검증 에러는 각 `TextField`의 `error` prop**으로 표시한다(INFO-002-03/04/05/06/08 copy.error). 별도 `[inputError]` negative `Notice`는 **제출 차단 요약 1개**(필수값 누락 종합) 또는 서버 중복(E3/E4/E5)처럼 필드 단위로 귀속 불가한 경우로만 한정한다. 형식 에러를 외부 Notice로 빼지 않는다.
- `ogn-mbr-auth-request` (FP-003/008): 인증번호 6자리 미충족·불일치는 `TextField` `error`/`helperText`. `Callout`은 **상태 레벨**(만료=cautionary 복구가능 / 한도초과·시스템오류=negative)만 소유한다.

## C2 · 섹션 구분 Divider 위계 (393×4 section vs 329×1 contents)

`DESIGN_PATTERNS §Form 복수 Pagestack / §11 / §13.6`: Pagestack 섹션 사이는 `Divider` **section band(393×4)**, 카드/리스트 내부 행 사이는 `Divider` **contents(329×1)**.

- OGN 섹션 간 경계(`termList ↔ termAgree`, `authSelect ↔ authRequest`, `memberInput ↔ guardian/entry`)는 **section Divider**로 분리한다. route-level gap/margin으로 흉내내지 않는다.
- 카드 내부 행 구분(인증수단 3행, 개별 약관 행, 전체동의↔개별 사이)은 **contents Divider**.
- 두 종류를 상호 대체 금지(Pattern Analysis Gate 준수).

## C3 · 완료 화면 chrome (FP-005)

`DESIGN_PATTERNS §Completion 주의사항`:

- AppBar 좌측은 **닫기(X) 또는 홈 버튼만**. **뒤로가기 금지**(완료 후 재진입 방지).
- 단순 완료형은 **1뷰포트**(스크롤 없는 단일 화면) 목표. `TitleMain(type="complete")` + (데이터 있을 때만)`RQRContentsDetail` 요약 + `ActionButton`(홈으로) in `Bottom(preset="primary-cta")`.
- 요약 카드 데이터(요금제/금액/적용일 등) 미제공 시 발명 금지 — 카드 미렌더(조건부), 성공 메시지+CTA만.

## C4 · 폼 그룹 제목·컨테이너

`DESIGN_PATTERNS §10 폼 조합 / §Form 기본구조`:

- 관련 `TextField` 묶음은 **그룹 제목(`TitleSection`/`PageStackContents` title)과 함께** 둔다. 제목 없이 필드만 나열 금지.
- 각 OGN 섹션은 `PageStackContents`(repo의 Pagestack) 컨테이너 안에서 `TitleSection` + content slot 구조로 조립한다.
- `TextField` 보조 버튼(중복확인)은 외부 병렬이 아닌 입력 컴포넌트 우측 `actionButton` slot.

## C5 · 약관 동의 순서·연결

`DESIGN_PATTERNS §10 폼 조합`:

- `전체 동의 → Divider(contents) → 필수/선택 항목` 순서 고정(`ogn-mbr-term-agree`).
- 약관 Checkbox는 내용 확인 `AccordionList`/`Accordion`과 연결되어야 한다(`ogn-mbr-term-list` 전문 펼침). 단 약관 전문 본문은 SB-only — 구조만, copy 발명 금지.

## C6 · CTA 위치·위계

`DESIGN_PATTERNS §10 CTA`:

- 화면 진행 Primary는 항상 `Bottom`의 단일 `ActionButton`(`preset="primary-cta"`). 스크롤 콘텐츠 중간 Primary 배치 금지.
- OGN 내부 보조 액션(법정대리인 동의요청 발송, 인증 확인, 재요청)은 보조 위계로 OGN slot 안에 두고 Bottom Primary와 시각 경쟁 금지(2 Primary 금지).

## 컴포넌트 어휘 정합 (Figma 명칭 → cx-components 실제 export)

| DESIGN_PATTERNS(Figma) | cx-components 실제 |
|---|---|
| CheckboxText | `Checkbox` |
| ListSelected | `ListSelected` 또는 후보 `RQRListOption` |
| Callout | `Callout`(상태 메시지) / `Notice`=`RQRNotice`(인접 안내) |
| AccordionList / Accordion | `AccordionList` / `Accordion` |
| Local_Contents 요약 / Card key-value | `RQRContentsDetail` |
| TitleMain(Type=Complete) | `TitleMain type="complete"` |
| ActionButton | `ActionButton` (in `AppScreen.Bottom`) |
| Divider 393×4 / 329×1 | `Divider`(section / contents) |

Build는 후보명이 아니라 layoutContract·Distortion Gate 충족으로 최종 선택하되, 위 교정(C1–C6)은 패턴 계약이므로 우회하지 않는다.
