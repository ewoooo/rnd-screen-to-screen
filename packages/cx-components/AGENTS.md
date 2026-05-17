# @pxds/cx-components

최신 CX DS component package다. 신규 화면/컴포넌트 제작의 기준 어휘와 구현 surface는 이 패키지를 따른다. `@pxds/pxds-components`는 deprecated legacy 호환 경계다.

## 현재 상태

- package name: `@pxds/cx-components`
- token dependency: `@pxds/cx-tokens`
- 공개 진입점: `src/index.ts`

## 운영 원칙

- 신규 구현은 `@pxds/pxds-components`가 아니라 이 패키지의 public surface를 우선한다.
- CX DS 원천 컴포넌트, token, primitive, component vocabulary 책임을 이 패키지에 반영한다.
- `src/candidate`는 재사용/신규 생성 결정이 필요한 staging 영역이다. 기존 `components/*` 또는 `candidate/*`로 표현 가능하면 `reuse` 결정으로 기록하고, 요구사항 때문에 신규 candidate를 만들 때만 `RQR{Name}` / `rqr-{name}` 식별자를 붙인다.
- `RQR` candidate는 정식 승격 전 이름이다. `components/*`로 승격할 때는 `RQR` prefix를 제거하고 active component vocabulary로 옮긴다.
- deprecated `@pxds/pxds-components`에 남은 구현은 migration reference로만 사용하고, 신규 variant/slot을 그 패키지에 추가하지 않는다.
- 앱 import 전환은 작업 범위에 맞게 점진적으로 진행하되, 새 화면의 기준은 `@pxds/cx-components`다.

## 계층과 slot 책임

이 패키지는 `Component -> Pattern -> Organism -> Screen` 중 `Component`와 시각 compound 일부를 소유한다.

- 기초 component는 화면 route의 직접 조립 단위가 아니라 pattern/organism slot 안에서 소비되는 어휘다.
- 화면 구조, section boundary, scroll, chrome, bottom sheet/popup runtime은 `@pxds/cx-layout` 책임이다.
- 정책 의미와 도메인 OGN은 `apps/mobile/src/organisms/<domain>/` 책임이다.
- `ActionButton`, `PopupActionButton`, `TitleBottomSheet`, `ListText`, `ListSelected`처럼 조합 의미가 있는 component는 자체 내부 spacing과 slot contract를 소유하고, route가 raw padding으로 보정하지 않게 한다.
- component spacing 수치는 `DESIGN_FOUNDATION.md` token을 기반으로 하며, 실측 적용 규칙은 `DESIGN_PATTERNS.md`의 layout/spacing contract를 따른다.
- `space/5`처럼 정식 token이 아닌 실측값은 package token으로 임의 추가하지 않고 문서 evidence로 남긴다.
