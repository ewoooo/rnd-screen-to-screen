<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:wds-gotchas -->
# WDS (@wanteddev/wds) prop 규약 — 추정 금지

타입체크 실패가 잦은 지점. import 전에 `app/node_modules/@wanteddev/wds/dist/components/<name>/types.d.ts` 확인.

- **`FlexBox`/`Card`/`CardContent`**: CSS 표준 prop명만 받음 — `flexDirection`/`alignItems`/`justifyContent`. `direction`/`align`/`justify` ✗
- **`Typography.variant`**: weight 분리. `variant="title3" weight="bold"` ✓ / `"title3-bold"` ✗. 변형 enum: display1-3, title1-3, heading1-2, headline1-2, body1-2, label1-2, caption1-2.
- **`color` prop의 두 종류**:
  - `TopNavigationButton.color`: 자체 enum (`"assistive"` 등) — 사용 가능
  - `IconButton.color` / `Typography.color`: `ThemeColorsToken` (deep dotted path, 예: `"semantic.label.normal"`) — 단순 문자열 금지. 색 커스텀 필요하면 `sx`로 CSS var 직접 주입
- **`Thumbnail.ratio`**: 콜론 표기 `"1:1"` (슬래시 ✗). `src` 필수 — 이미지 없을 땐 div placeholder가 단순
- **아이콘명 검증**: `IconAdd` 없음 → `IconPlus`. import 전 `registry/wds-icon-registry.json`에서 이름 확인
- **TopNavigation `variant`**: `"floating"`이 gradient + backdrop-blur 내장 처리. 단순 헤더는 `"normal"`
<!-- END:wds-gotchas -->

<!-- BEGIN:wds-token-source-of-truth -->
# 토큰/사이즈는 레지스트리에서 직접 조회 — 이 문서에 베이크하지 말 것

WDS variant 의 font-size, color 토큰 값, radius, spacing 등 **수치 정보는 모두 `registry/wds-token-registry.json`이 source of truth**. 이 파일(또는 다른 메모/문서)에 표·치트시트로 캐싱해두면 곧 stale 되어 잘못된 값으로 코드를 작성하게 된다 (실제 발생 사례: title2 를 20px 로 잘못 외우고 작성 → 런타임 28px 로 차이).

## 워크플로우
1. Typography variant 사이즈가 필요하면 → `registry/wds-token-registry.json` 의 `tiers` → `typography` 섹션을 직접 grep/Read.
   - `ts_path`: `typographyStyle[variant]`
   - 원본 파일: `node_modules/@wanteddev/wds/dist/components/typography/style.mjs` (registry가 의심되면 이쪽 재확인)
2. 색상 토큰이 필요하면 → 같은 레지스트리의 `atomic` / `semantic` tier 조회.
3. **레지스트리에 없는 컴포넌트별 디테일**(특정 prop 의 enum, default 등) → `node_modules/@wanteddev/wds/dist/components/<name>/types.d.ts` 직접 Read.
4. Figma 명세 사이즈가 WDS variant 에 정확히 매칭되지 않으면 가까운 variant + `sx={{ fontSize, lineHeight }}` 로 정확값 강제. **임의 다운 금지** (memory: feedback_typography_spec_fidelity).
5. 의심되면 브라우저 DevTools 의 computed font-size 로 검증.

## 금지
- 이 문서에 "title2 = 20px" 같은 사이즈 표를 다시 적지 말 것.
- 다른 메모리 파일에도 베이크 금지 — 모두 레지스트리 참조 한 줄로 끝낼 것.
<!-- END:wds-token-source-of-truth -->

<!-- BEGIN:no-raw-without-check -->
# raw HTML 박기 전 — atom Pilot 매칭 조회 의무

새 Pilot 작성 시 `<div>`/`<span>`/`<button>`/`<p>`/`<a>` 등 raw HTML 요소를 사용하기 **직전에** 다음 체크를 거친다. 빠뜨리면 같은 시각 부품이 raw 와 Pilot 으로 양쪽에 흩어져 일관성이 깨진다 (실제 사례: AI PICK 라벨을 atom Pilot 안 만들고 inline border div 로 처리, BEST 슬롯 라벨도 raw — 둘 다 BadgeLabelTextPilot/BadgeAiPickPilot 으로 갔어야).

## 체크리스트
1. 이 raw 요소가 표현하는 게 **시각적으로 의미 있는 부품** 인가? (예: badge, chip, card, divider, slot placeholder, icon-button) → **2 단계로**.
   - layout-only wrapper (`<div style={{ display: flex }}>`, `<span>` for inline grouping) 는 면제.
2. `app/src/components/pilot-kit/` 에 매칭 후보가 있는지 grep:
   ```bash
   ls src/components/pilot-kit/ | grep -iE "badge|chip|card|button|...핵심키워드"
   ```
3. 매칭 후보 발견 → 그것 사용. 없으면 → **신규 atom Pilot 추가** (3-tuple: design.json + binding.json + Pilot.tsx) 또는 사용자에 확정 후 진행.
4. raw 로 가는 게 정당한 케이스 (정말 1회성 layout, atom 화 가치 없음) 는 design.json 의 해당 sub-block 에 `pilot: null, raw_reason: "..."` 명시.

## 금지
- "급하니까 일단 raw 로" — 다음 작업에서 또 raw 로 박힘. 즉시 atom 으로 추출 또는 사용자 컨펌.
- design.json 의 sub-block 을 `pilot:` 필드 없이 채우기 — composition audit 가 mismatch 잡을 수 있도록 매번 명시.

## 검증
- `pnpm audit:composition` (앞으로 추가) 가 raw 사용처 ↔ design.json `pilot:` 매핑 비교. CI 에 묶을 것.
<!-- END:no-raw-without-check -->
