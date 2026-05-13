# @pxds/cx-tokens

PXDS 런타임 시각 token 값의 SSOT다. CX primitive token set을 흡수해 color, spacing, radius, font-size, font-weight를 emit한다.

## 원칙

- 레지스트리 원천은 `registry/tokens.original.json`이다. Tokens Studio single-file 포맷, root set `_skt/primitive/default` 하나. DTCG `$type`/`$value` 리프 + `{path}` alias. 원천 set 이름은 `_skt`로 남아 있어도 제품/시스템 명칭은 CX DS로 부른다.
- 값은 JSON에만 산다. 런타임 소비자는 generated CSS custom property만 사용한다. TS token helper/alias를 신규 생성하지 않는다.
- generated CSS는 `src/tokens.css`로 노출하고 package export는 `./tokens.css`를 제공한다. var 이름은 카테고리 prefix(`--color-…`, `--spacing-…`, `--radius-…`, `--font-size-…`, `--font-weight-…`). Set 이름은 prefix에 박지 않는다.
- 색상은 `--color-*-rgb` (R, G, B) 변종도 같이 emit한다. alpha 합성용.
- typography composite은 emit하지 않는다. 소비처가 `--font-size-*` + `--font-weight-*` + line-height/letter-spacing 조합으로 표현한다.
- semantic intent layer(예: `--semantic-text-*`, `--semantic-bg-*`)는 컴포넌트 재구축과 함께 별도 레이어로 도입한다. 본 패키지는 primitive만 책임진다.
- 앱/패키지 로컬 `*tokens.ts`나 CSS token 파일을 새로 만들지 않는다.

## 소비 경로

- CSS 변수: `var(--color-*)`, `var(--spacing-*)`, `var(--radius-*)`, `var(--font-size-*)`, `var(--font-weight-*)`
- registry JSON: `@pxds/cx-tokens/registry/tokens.original.json`
- CSS: `@pxds/cx-tokens/tokens.css`
- Tokens Studio: `@pxds/cx-tokens/tokens-studio` (registry 그대로 export)

## 보관 자료

- `registry/_legacy-backup.json` — 이전 WDS 토큰 단일 파일 전체 백업. 참조 전용. 소비 금지.
- `registry/legacy-extras.json` — 이전 WDS의 `opacity`/`breakpoint`/`zIndex` 보관. SKT primitive에 없는 카테고리. generated CSS에 emit하지 않으며 컴포넌트 재구축 중 참조용으로만 사용한다.

## 조회 규칙

- typography/size/color 수치는 이 패키지 registry에서 확인한다.
- 이 문서나 다른 메모에 수치 표를 베이크하지 않는다. stale 위험이 크다.
- noise(`E42939`, `FFFFFF 10%` 같은 hex-이름 leaf, `guide` token, typography primitive `fontFamilies`/`lineHeights` 등)는 emit하지 않는다.
