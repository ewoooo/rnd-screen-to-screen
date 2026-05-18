# RQRListOption 후보 추가 기록

## 배경

- 대상 화면: `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-001-0-CX`
- 화면 성격: 회원가입 본인인증 수단 선택
- 관찰된 문제: 기존 CX 전환 화면에서 `ListSelected` 기반 선택지가 모바일 폭에서 읽기 어려운 형태로 렌더링됨.
- 참고: 대화 중 처음 언급된 `LEGACY-MBR-PG-003-0-CX`는 실제로는 탈퇴 완료 화면이었고, 본인인증 수단 선택 화면은 `LEGACY-MBR-PG-001-0-CX`였다.

## 문제

기존 구현은 인증 수단 행을 `ListSelected`로 조립했다.

```tsx
<ListSelected
  label={method.label}
  subText={method.subText}
  showSubText
  checked={selected === method.id}
  rightItem={{ type: "buttonXsmallSolid", label: "추천" }}
/>
```

이 조합은 본인인증 선택지의 정보 구조와 맞지 않았다.

1. `label`과 `subText`가 같은 가로 행에 놓여 모바일 폭에서 텍스트가 컬럼처럼 밀렸다.
2. `subText`는 선택지의 보조 설명인데, 우측 값처럼 보였다.
3. `label`은 `overflow-wrap: anywhere` 영향을 받아 짧은 한글도 글자 단위로 찢어질 수 있었다.
4. `추천`은 비행동성 상태 표지인데 `buttonXsmallSolid`로 렌더되어 액션 버튼처럼 보였다.

결과적으로 정보는 정책서에서 온 것이어도, 화면은 “선택 가능한 인증 수단”이라는 과업 구조를 충분히 보존하지 못했다.

## 판단

이 문제는 단순 화면 보정으로 처리하지 않았다.

- route에서 margin, width, raw style로 보정하면 같은 유형의 선택지에서 반복될 가능성이 높다.
- 기존 `ListSelected`는 Figma bridge 성격과 `ListSelectedRightItem` 계약이 강해, 바로 수정하면 기존 사용처에 영향을 줄 수 있다.
- 필요한 어휘는 도메인 전용 `AuthMethodRow`가 아니라, 재사용 가능한 선택형 리스트 행이다.

따라서 정식 컴포넌트 승격 전 단계로 `packages/cx-components/src/candidate/rqr-list-option/`에 `RQRListOption` 후보를 추가했다.

## 개선 방식

새 후보의 정보 구조는 아래와 같다.

```txt
RQRListOption
├─ leading: RadioButton | CheckBox
├─ body
│  ├─ title: Text(listTitle)
│  └─ description: Text(bodySubtle)
└─ trailing: Badge | custom slot
```

회원가입 본인인증 화면에서는 다음처럼 소비한다.

```tsx
<RQRListOption
  type="radio"
  name="identity-method"
  title={method.label}
  description={method.subText}
  checked={selected === method.id}
  onCheckedChange={(next) => {
    if (next) setSelected(method.id);
  }}
  badgeText={method.recommended ? "추천" : undefined}
/>
```

주요 의도:

- 제목과 설명은 세로 2행 구조로 읽히게 한다.
- 설명은 우측 값이 아니라 선택지의 보조 설명으로 표현한다.
- `추천`은 버튼이 아닌 `Badge`로 표현한다.
- 행의 padding, gap, control 정렬, focus outline은 후보 컴포넌트가 소유한다.
- 화면 route는 정책 의미와 상태 선택만 전달한다.

## 변경 파일

- `packages/cx-components/src/candidate/rqr-list-option/`
- `packages/cx-components/src/candidate/index.ts`
- `packages/cx-components/src/index.ts`
- `packages/cx-components/src/styles.css`
- `packages/cx-components/package.json`
- `packages/cx-components/src/preview/examples.tsx`
- `packages/cx-components/src/preview/registry.ts`
- `apps/mobile/src/app/(legacy-converted-mbr)/LEGACY-MBR-PG-001-0-CX/Screen.tsx`

## 검증

통과:

```sh
npm run lint -w @pxds/cx-components
npm run build -w @screen/mobile
```

부분 실패:

```sh
npm run lint -w @screen/mobile
```

실패 사유는 이번 변경과 무관한 기존 page folder contract 누락이었다.

- `apps/mobile/src/app/(cx)/CX-EXAMPLE-COMPLETE-ACTIVATION`
- `apps/mobile/src/app/(cx)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- `apps/mobile/src/app/(mbr)/NOVA-MBR-PG-001-0`
- `apps/mobile/src/app/(mbr)/NOVA-MBR-PG-002-0`
- `apps/mobile/src/app/(mbr)/NOVA-MBR-PG-003-0`
- `apps/mobile/src/app/(mbr)/NOVA-MBR-PG-005-0`

## 후속 검토

- `RQRListOption`이 인증 수단 외 배송지, 결제수단, 약관 선택 등에서도 반복되면 `components/list-option`으로 승격한다.
- 승격 시 `RQR` prefix를 제거하고 `ListSelected`와의 역할 경계를 문서화한다.
- `trailing` slot은 현재 `Badge` 또는 custom slot 중심이다. 실제 액션이 필요한 경우에만 button 계열을 허용한다.
