# @policy/core

Policy / UseCase 순수 문서 도메인이다.

## 원칙

- Screen, route, component, UI runtime을 모른다.
- 정책서 원문, use case, section, evidence reference 같은 순수 문서 개념만 소유한다.
- 정책 문장을 화면으로 번역하는 판단은 `SCREEN_GENERATION_FLOW.md`의 생성 산출물과 `Screen.config.ts`의 `generation` 블록에서 검증한다.
- 정책 core는 `DESIGN_FOUNDATION.md`, `DESIGN_PATTERNS.md`, `SPACING_PATTERNS.md` 자체를 해석하지 않는다. 다만 screen generation 검증에서 해당 문서 확인 여부와 policyRefs/ognIds/diagram 정합성은 검사할 수 있다.

## 검증 스크립트

- `check-compliance-between-policy-source-and-definition.mjs` — 정책 `.policy.ts`의 `sourceText`가 원문 `.md`에 실제 존재하는지 확인한다.
- `check-compliance-between-policy-sb-diagram-and-screen.mjs` — `SCREEN_GENERATION_FLOW.md` 기준으로 화면별 `Screen.config.ts`의 `generation` 블록, `Screen.diagram.md`, OGN config, `Screen.tsx`, route catalog 사이의 정합성을 확인한다.

`npm run check:compliance -w @policy/core`는 위 두 검사를 순서대로 실행한다. `check:screen-generation`은 adoption mode로 동작해 기존 화면의 생성 산출물 누락을 warning으로 보고하고, `check:screen-generation:strict`는 같은 누락을 실패로 처리한다.
