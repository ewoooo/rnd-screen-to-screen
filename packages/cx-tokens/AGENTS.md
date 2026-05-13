# @pxds/cx-tokens

PXDS 런타임 시각 token 값의 SSOT다. CX raw/semantic/component token set을 흡수해 CSS custom property를 emit한다.

## 원칙

- 레지스트리 원천은 `registry/tokens/`의 Tokens Studio multi-file set export다. 현재 set은 `_skt/primitive/default`, `_skt/semantic/{light,dark}`, `_skt/component/{light,dark}`다. 원천 set 이름은 `_skt`로 남아 있어도 제품/시스템 명칭은 CX DS로 부른다.
- CSS 생성은 Style Dictionary + `@tokens-studio/sd-transforms`의 `tokens-studio` preprocessor/transform group을 따른다. set별 alias 충돌을 피하기 위한 in-memory path normalization만 패키지에서 소유한다.
- 값은 JSON에만 산다. 런타임 소비자는 generated CSS custom property만 사용한다. TS token helper/alias를 신규 생성하지 않는다.
- generated CSS는 `src/tokens.css`로 노출하고 package export는 `./tokens.css`를 제공한다. var 이름은 token path 기반 카테고리 prefix(`--color-…`, `--spacing-…`, `--radius-…`, `--font-size-…`, `--font-weight-…`, `--semantic-…`, `--component-…` 등)를 따른다.
- 색상은 `--color-*-rgb` (R, G, B) 변종도 같이 emit한다. alpha 합성용.
- typography composite은 개별 CSS custom property로 풀어 emit한다. 예: `--16-med-font-size`, `--16-med-font-weight`, `--16-med-line-height`.
- `generate-text-styles`는 typography composite을 `.text-16-med` 같은 합성 class로 emit한다. 앱은 `@pxds/cx-tokens/tokens.css`만 import해도 `text-styles.css`가 같이 포함된다.
- raw / semantic / component layer가 registry에 들어오면 token path를 유지해 CSS custom property로 emit한다.
- 앱/패키지 로컬 `*tokens.ts`나 CSS token 파일을 새로 만들지 않는다.

## 소비 경로

- CSS 변수: `var(--color-*)`, `var(--spacing-*)`, `var(--radius-*)`, `var(--font-size-*)`, `var(--font-weight-*)`
- registry token sets: `packages/cx-tokens/registry/tokens/`
- CSS: `@pxds/cx-tokens/tokens.css`
- Text style CSS: `@pxds/cx-tokens/text-styles.css`
- Tokens Studio: `@pxds/cx-tokens/tokens-studio` (registry 그대로 export)

## 보관 자료

- `registry/legacy-extras.json` — 이전 WDS의 `opacity`/`breakpoint`/`zIndex` 보관. SKT primitive에 없는 카테고리. generated CSS에 emit하지 않으며 컴포넌트 재구축 중 참조용으로만 사용한다.

## 조회 규칙

- typography/size/color 수치는 이 패키지 registry에서 확인한다.
- 이 문서나 다른 메모에 수치 표를 베이크하지 않는다. stale 위험이 크다.
- noise(`E42939`, `FFFFFF 10%` 같은 hex-이름 leaf, `guide` token, typography primitive `fontFamilies`/`lineHeights` 등)는 emit하지 않는다.
