# @pxds/pxds-components

WDS component re-export, PXDS-owned atoms/molecules/domains, component vocabulary registry를 소유한다.

## 책임

- `core` — WDS component re-export, global CSS, Next adapter.
- `atoms/typography` — WDS `Typography`에 모바일 line break, `maxLines`, truncate 정책을 얹은 `TextBlock`.
- `atoms/feedback` — `Divider`, `Placeholder` 같은 최소 feedback atom.
- `molecules` — 여러 도메인이 함께 쓰는 도메인 독립 조합. `MediaBlock`, `QueryBar`, `FilterTabs`, `FormField`, `SelectField`, form controls, `InfoList`, `SelectableList`, `ConsentList`, `PromoBlock`, `NoticeBlock`, `SectionCard`, `SummaryCard`, `ChipGroup`, CTA bars 등.
- `domains/shared/global` — 앱 전역 화면 chrome/flow section. 특정 비즈니스 도메인이 아니라 여러 화면이 공유하는 global surface다.
- `domains/<domain>` — 모바일 화면 영역 단위 컴포넌트. `home`, `product`, `search`, `nc-simple`, `tu`를 소유한다.
- `registry` — 구현 세부 없는 component vocabulary registry. 컴포넌트 탐색의 SSOT이며 `id/name/layer/owner/importPath/group/status`만 둔다.

## WDS 사용 정책

- 앱/패키지는 `@wanteddev/wds`를 직접 보지 않고 `@pxds/pxds-components/core`를 우선 진입점으로 사용한다.
- 자체 wrapper는 호출 시그니처 보존이나 PXDS 정책 추가가 있을 때만 둔다.
- 반복되는 WDS 조합은 앱 로컬 shim 대신 이 패키지 `molecules`와 `@pxds/pxds-components/molecules` 공개 진입점으로 승격한다.
- 전역 chrome/flow section은 domain이 아니라 `domains/shared/global`와 `@pxds/pxds-components/shared/global` 공개 진입점으로 둔다.
- 모바일 화면 영역 컴포넌트도 앱 로컬이 아니라 이 패키지 `domains/<domain>`와 `@pxds/pxds-components/<domain>` 공개 진입점으로 승격한다.
- domain 구현은 `@pxds/pxds-layout` primitives/app-screen을 의존할 수 있다.

## WDS prop 참고

- `FlexBox`/`Card`/`CardContent`: CSS 표준 prop명만 사용한다. `flexDirection`, `alignItems`, `justifyContent`.
- `Typography.variant`: weight 분리. 예: `variant="title3" weight="bold"`.
- `Typography.color`, `IconButton.color`: dotted token path를 사용한다. 예: `semantic.label.normal`.
- `Thumbnail.ratio`: 콜론 표기. 예: `"1:1"`.
