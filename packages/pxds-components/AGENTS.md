# @pxds/pxds-components

Deprecated legacy PXDS/WDS component adapter다. 최신 컴포넌트 패키지는 `@pxds/cx-components`이며, 신규 화면/컴포넌트 제작의 기준 어휘는 이 패키지가 아니라 `packages/cx-components`를 따른다.

이 패키지는 기존 호환, migration reference, WDS 격리 경계로만 다룬다. 신규 component, variant, slot, public vocabulary를 이 패키지에 추가하지 않는다.

최신 화면 생성 계층은 `Component -> Pattern -> Organism -> Screen`이다. 이 패키지의 legacy `atoms/*`, `molecules/*` 명칭은 historical folder structure로만 해석하고, 신규 설계 문서의 계층명으로 전파하지 않는다.

## 책임

- `core` — legacy WDS component adapter, global CSS, Next adapter.
- `atoms/*`, `molecules/*`, `domains/shared/global/*` — 기존 화면 호환용 legacy 구현.
- `registry` — legacy component vocabulary reference. 신규 SB/component 매핑의 SSOT로 사용하지 않는다.

## WDS 사용 정책

- 신규 앱/패키지는 `@wanteddev/wds`와 `@pxds/pxds-components`를 직접 보지 않고 `@pxds/cx-components`를 우선 진입점으로 사용한다.
- 기존 호환이 필요한 경우에만 `@pxds/pxds-components/core`를 제한적으로 사용한다.
- `@wanteddev/wds` 직접 import는 `src/core/wds-adapter.ts` 안으로 격리한다. 개별 wrapper는 adapter를 통해 WDS에 위임한다.
- 반복되는 WDS/PXDS legacy 조합은 이 패키지로 승격하지 말고 `@pxds/cx-components` vocabulary 보강 후보로 기록한다.
- 실제 인스턴스로 재사용되는 모바일 화면 영역 컴포넌트는 우선 앱 organism에 두고, 여러 화면에서 안정된 계약이 확인될 때 `@pxds/cx-components` 승격을 검토한다.

## WDS prop 참고

- `FlexBox`/`Card`/`CardContent`: CSS 표준 prop명만 사용한다. `flexDirection`, `alignItems`, `justifyContent`.
- `Typography.variant`: weight 분리. 예: `variant="title3" weight="bold"`.
- `Typography.color`, `IconButton.color`: dotted token path를 사용한다. 예: `semantic.label.normal`.
- `Thumbnail.ratio`: 콜론 표기. 예: `"1:1"`.

## 컴포넌트 폴더 규약

신규 컴포넌트는 이 패키지에 만들지 않는다. 아래 구조는 이 패키지에 남아 있는 legacy 컴포넌트를 읽거나 최소 수정할 때의 참고다. `config`는 bridge/editor 대비 discovery metadata만 담고, render-tree/spec language를 만들지 않는다.

```txt
button/
├─ Button.tsx
├─ Button.config.ts
├─ Button.types.ts
└─ index.ts
```

기존 `*.mock.tsx`는 preview 보조 파일로 남길 수 있다. 컴포넌트 discovery metadata는 `*.config.ts`에 둔다.
