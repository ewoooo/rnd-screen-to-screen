# @pxds/cx-components

CX DS component package placeholder다. 아직 소비처를 이 패키지로 전환하지 않는다.

## 현재 상태

- package name: `@pxds/cx-components`
- token dependency: `@pxds/cx-tokens`
- 공개 진입점: `src/index.ts`

## 운영 원칙

- `@pxds/pxds-components`에서 실제 전환할 컴포넌트 범위가 정해지기 전까지는 빈 골격을 유지한다.
- CX DS 원천 컴포넌트가 들어오면 token, primitive, component vocabulary 책임을 분리해서 이 패키지에 반영한다.
- 앱 import 전환은 별도 작업으로 진행한다.
