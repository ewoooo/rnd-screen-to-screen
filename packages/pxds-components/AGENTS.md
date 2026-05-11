# @pxds/pxds-components

WDS component re-export, PXDS-owned primitive/pattern, component vocabulary registry를 소유한다.

## 책임

- `core` — WDS component re-export, global CSS, Next adapter.
- `typography` — WDS `Typography`에 모바일 line break, `maxLines`, truncate 정책을 얹은 `TextBlock`.
- `feedback` — `Divider`, `Placeholder` 같은 최소 feedback atom.
- `patterns` — 도메인 독립 WDS 조합 패턴. `MediaBlock`, `QueryBar`, `FilterTabs`, `FormField`, `SelectField`, form controls 등.
- `registry` — 구현 세부 없는 component vocabulary registry. 컴포넌트 탐색의 SSOT이며 `id/name/layer/owner/importPath/group/status`만 둔다.

## WDS 사용 정책

- 앱/패키지는 `@wanteddev/wds`를 직접 보지 않고 `@pxds/pxds-components/core`를 우선 진입점으로 사용한다.
- 자체 wrapper는 호출 시그니처 보존이나 PXDS 정책 추가가 있을 때만 둔다.
- 반복되는 WDS 조합은 앱 로컬 shim 대신 이 패키지 `patterns` 공개 진입점으로 승격한다.

## WDS prop 참고

- `FlexBox`/`Card`/`CardContent`: CSS 표준 prop명만 사용한다. `flexDirection`, `alignItems`, `justifyContent`.
- `Typography.variant`: weight 분리. 예: `variant="title3" weight="bold"`.
- `Typography.color`, `IconButton.color`: dotted token path를 사용한다. 예: `semantic.label.normal`.
- `Thumbnail.ratio`: 콜론 표기. 예: `"1:1"`.
