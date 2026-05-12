# @pxds/pxds-tokens

PXDS 런타임 시각 token 값의 SSOT다. color, spacing, typography scale, radius, shadow, opacity, surface, project extension token을 소유한다.

## 원칙

- 레지스트리 원천은 `registry/tokens.original.json`이다. Tokens Studio single-file 포맷(3 Set: `foundation`/`semantic`/`project` + `$metadata.tokenSetOrder` + DTCG `$type`/`$value` 리프 + `{set.path}` alias).
- 값은 JSON에만 산다. 런타임 소비자는 generated CSS custom property만 사용한다. TS token helper/alias를 신규 생성하지 않는다.
- generated CSS는 `src/tokens.css`로 노출하고 package export는 `./tokens.css`를 제공한다. var 이름은 WDS 명명 그대로(`--atomic-…`, `--semantic-…`, `--spacing-…`, `--opacity-…`, `--pxds-…`). Set 이름은 prefix에 박지 않는다.
- WDS token/theme 값은 별도 alias 패키지로 분산하지 않고 이 패키지에서 흡수/재노출한다.
- 앱/패키지 로컬 `*tokens.ts`나 CSS token 파일을 새로 만들지 않는다.
- WDS에 없는 런타임 시각 값은 `project` Set으로 흡수한다 (`--pxds-*` var로 emit).
- 새 코드는 CSS var를 직접 사용한다. TS deprecated alias는 신규 생성하지 않는다.

## 소비 경로

- CSS 변수: `var(--semantic-*)`, `var(--atomic-*)`, `var(--spacing-*)`, `var(--semantic-spacing-*)`, `var(--opacity-*)`, `var(--pxds-*)`
- registry JSON: `@pxds/pxds-tokens/registry/tokens.original.json`
- CSS: `@pxds/pxds-tokens/tokens.css`
- Tokens Studio: `@pxds/pxds-tokens/tokens-studio` (registry 그대로 export)

## 조회 규칙

- WDS typography/size/color 수치는 이 패키지 registry에서 확인한다.
- 이 문서나 다른 메모에 수치 표를 베이크하지 않는다. stale 위험이 크다.
- `semantic.surface.page.normal/semi`는 AppScreen page background의 프로젝트 확장 token이다.
