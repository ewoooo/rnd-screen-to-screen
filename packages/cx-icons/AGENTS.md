# @pxds/cx-icons

CX DS icon 원천 SVG, icon registry, React `Icon` wrapper를 소유한다. 최신 아이콘 패키지이며, 신규 화면/컴포넌트 제작의 기준 icon vocabulary는 이 패키지를 따른다. `@pxds/pxds-icons`는 deprecated legacy WDS icon adapter다.

## 현재 상태

- package name: `@pxds/cx-icons`
- 공개 진입점: `src/index.ts`
- 원천 SVG 보관 위치: `src/originals/`
- Icon 컴포넌트 위치: `src/components/Icon/`
- registry 위치: `src/registry.ts`

## 운영 원칙

- 신규 구현은 deprecated `@pxds/pxds-icons`가 아니라 이 패키지의 public surface를 우선한다.
- 기존 `@pxds/pxds-icons` 소비처 전환은 작업 범위에 맞게 점진적으로 진행한다.
- CX DS 원천 아이콘 SVG는 `src/originals/`에 보관하고, registry, adapter, owned icon 책임을 분리해서 이 패키지에 반영한다.
- `src/originals/`의 Figma 원천 SVG는 직접 수정하지 않는다.
- 앱 import 전환은 deprecated adapter 호환 범위를 확인하며 별도 작업으로 진행한다.
- 아이콘은 `Component -> Pattern -> Organism -> Screen` 계층에서 기초 component vocabulary다. 화면 route가 raw SVG나 임의 아이콘명을 직접 만들지 않고, pattern/organism slot 안에서 등록된 `Icon`을 소비하도록 한다.
