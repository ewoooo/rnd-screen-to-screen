# @pxds/cx-icons

CX DS icon package placeholder다. 아직 소비처를 이 패키지로 전환하지 않는다.

## 현재 상태

- package name: `@pxds/cx-icons`
- 공개 진입점: `src/index.ts`
- 원천 SVG 보관 위치: `src/originals/`

## 운영 원칙

- `@pxds/pxds-icons`에서 실제 전환할 아이콘 범위가 정해지기 전까지는 빈 골격을 유지한다.
- CX DS 원천 아이콘 SVG는 `src/originals/`에 보관하고, registry, adapter, owned icon 책임을 분리해서 이 패키지에 반영한다.
- 앱 import 전환은 별도 작업으로 진행한다.
