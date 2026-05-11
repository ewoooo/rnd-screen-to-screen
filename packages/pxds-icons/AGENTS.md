# @pxds/pxds-icons

WDS icon adapter와 PXDS-owned frame icon을 소유한다.

## 원칙

- 앱/패키지는 `@wanteddev/wds-icon`을 직접 import하지 않는다.
- 아이콘이 필요하면 이 패키지 진입점을 통과한다.
- import 전 `registry/wds-icon-registry.json`에서 이름을 검증한다.
- 없는 아이콘명을 추측하지 않는다. 예: `IconAdd`가 없으면 registry에서 `IconPlus` 같은 실제 이름을 찾는다.

## 책임

- WDS icon registry 노출
- WDS icon adapter
- `Logo`, `Status*`처럼 PXDS가 소유하는 frame icon
