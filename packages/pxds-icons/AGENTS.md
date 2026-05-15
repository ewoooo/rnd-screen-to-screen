# @pxds/pxds-icons

Deprecated legacy WDS icon adapter다. 최신 아이콘 패키지는 `@pxds/cx-icons`이며, 신규 화면/컴포넌트 제작의 기준 icon vocabulary와 React `Icon` wrapper는 이 패키지가 아니라 `packages/cx-icons`를 따른다.

## 원칙

- 신규 구현은 `@pxds/pxds-icons`가 아니라 `@pxds/cx-icons` 또는 `@pxds/cx-components`의 icon public surface를 우선한다.
- 기존 호환이 필요한 영역에서만 이 패키지 진입점을 제한적으로 소비한다.
- 앱/패키지는 `@wanteddev/wds-icon`을 직접 import하지 않는다. 기존 WDS icon 호환은 이 deprecated adapter 경계 안에 격리한다.
- import 전 `registry/wds-icon-registry.json`에서 이름을 검증한다.
- 없는 아이콘명을 추측하지 않는다. 예: `IconAdd`가 없으면 registry에서 `IconPlus` 같은 실제 이름을 찾는다.
- 신규 아이콘이 필요하면 `@pxds/cx-icons` registry/originals에 추가하는 방향을 우선 검토한다.

## 책임

- legacy WDS icon registry 노출
- legacy WDS icon adapter
- `Logo`, `Status*`처럼 아직 이관되지 않은 PXDS-owned frame icon의 호환 제공
