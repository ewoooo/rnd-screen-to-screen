# pilot-kit

Figma 04_ADP_P3-T1_Library 컴포넌트를 WDS(@wanteddev/wds)로 1:1 매핑한 React 래퍼 모음. **개별 화면이 아니라 디자인-시스템 매핑 검증 키트**다. 카탈로그는 `app/src/app/pilot-kit/` 라우트에서 시각 확인 가능.

## 무엇이 Pilot 인가

Pilot 은 _"Figma 컴포넌트를 우리 코드 스택에서 어떻게 만들 것인가"_ 의 1차 답안이다. 한 Pilot 은 다음 3개 산출물의 묶음:

| 파일 위치 | 역할 |
|---|---|
| `data/design/components/<kebab>.json` | Figma 메타데이터 + structure + tokens + typography 명세 (디자이너 의도의 사본) |
| `data/binding/overrides/<kebab>.json` | Figma → WDS 매핑 strategy + token_overrides + open_questions (개발자 결정 사본) |
| `app/src/components/pilot-kit/<PascalName>Pilot.tsx` | 실제 React 구현 (WDS + 다른 Pilot 합성) |

3개 모두 있어야 한 Pilot 으로 본다. design.json 만 있고 구현이 없으면 _backlog_, 구현만 있고 명세가 없으면 _ad-hoc_ 으로 분류한다.

## 네이밍 규약

- 파일: `<FigmaName>Pilot.tsx` — Figma 명을 PascalCase 로 (`card-vertical-product/medium` → `CardVerticalProductMediumPilot`)
- export: 동일명 named export (`export function CardVerticalProductMediumPilot(...)`)
- design/binding json: kebab-case + `/` 는 `-` (`card-vertical-product-medium.json`)
- "Pilot" 접미어는 의도된 시그널 — _"순수 WDS 컴포넌트가 아닌, 디자인 매핑 검증용 래퍼"_ 임을 표시. 나중에 정식 컴포넌트 승격되면 접미어 제거.

## prop 컨벤션

Figma 의 `textBrandName` / `areaXxx` 같은 명을 그대로 옮기지 않고, React 에 자연스러운 짧은 명으로 재명명:

| Figma | Pilot |
|---|---|
| `textBrandName` | `brand` |
| `textTitle` | `title` |
| `textPrice` | `price` |
| `textMonth` | `month` |
| `areaXxx: boolean` | `showXxx: boolean` |
| `slotXxx: ReactNode` | `slotXxx: ReactNode` (그대로) |
| 핸들러 | `onClick` / `onAdd` / `onAction` 등 |

`flexShrink={0}` 는 가로 스크롤 컨테이너 안 안 줄어들도록 카드류에 디폴트로 설정.

## 의존 그래프

```
data/design/components/*.json   ─┐
                                  ├─→ Pilot tsx ─→ app/src/app/pilot-kit/*/page.tsx (카탈로그)
data/binding/overrides/*.json   ─┘                ↳ 실 화면에서 import 가능
                                                   (예: app/src/app/discover/v2-pilot/)
@wanteddev/wds                  ─┘
```

- Pilot 끼리 합성 가능. 예: `CardHorizontalDeliveryPilot` 이 `ImgRectanglePilot` + `ButtonChipPilot` 사용.
- 절대로 Pilot 이 아닌 raw 화면 코드를 import 하지 말 것 (역방향 금지).

## 새 Pilot 추가 워크플로우

1. **Figma 명세 fetch**: `mcp__plugin_figma_figma__get_design_context` 로 노드 ID 조회.
2. **design.json 작성**: `data/design/components/<name>.json`. `meta.section` 은 atom/molecule/organism, `canonical_atomic_level` 명시.
3. **WDS 매핑 결정**: `registry/wds-component-registry.json`, `registry/wds-token-registry.json` 직접 조회 (변환 표 외우지 말 것).
4. **binding.json 작성**: `data/binding/overrides/<name>.json`. 각 부분의 `wds:` 타깃 명시. WDS 부재 부분은 `open_questions` 에 기록.
5. **Pilot tsx 작성**: 위 컨벤션 따라 작성. `import` 는 `@/components/pilot-kit/*` 사용.
6. **카탈로그 등록**: `app/src/app/pilot-kit/<category>/page.tsx` 에 `Row` 추가.
7. **타입체크**: `pnpm exec tsc --noEmit`. 반드시 통과.
8. **시각 검증**: `pnpm dev` → `/pilot-kit/<category>` 에서 확인.

## 현재 매핑 통계 (2026-04-24, n=50)

`grep` 기반 정적 audit. WDS import 보유 = `from "@wanteddev/wds"` 또는 `@wanteddev/wds-icon` import 존재. Pilot 합성 = 같은 디렉터리 다른 Pilot import 존재. raw HTML = `<div>` `<span>` `<button>` `<p>` 등 직접 사용 (multi-line 포함).

| 지표 | 수 | 비율 |
|---|---|---|
| **WDS 전환율** (WDS import 보유) | 49 / 50 | **98%** |
| **Pure WDS** (raw 0 + Pilot 합성 0) | 24 / 50 | **48%** |
| **Pilot 참조율** (다른 Pilot 합성) | 12 / 50 | **24%** |
| **raw HTML 사용** | 21 / 50 | **42%** |

> ⚠️ **이전 측정(n=43)** 의 raw 16% 는 grep 정규식 버그 (`<div\n` 미스). 실제는 42%. 비율 자체보다 패턴이 4종으로 정리된다는 점이 중요.

### WDS import 없는 Pilot (1)
- `IndicatorDotPilot.tsx` — 단순 색 점 표현으로 inline-style 만 사용 (재검토 후보)

### 다른 Pilot 합성 (12)
주로 카드/Information molecule 들이 atom·molecule Pilot 을 재사용.

| Pilot | 합성하는 Pilot |
|---|---|
| CardHorizontalDeliveryPilot | ButtonChipPilot, ImgRectanglePilot |
| CardHorizontalProductBarcodeInformationPilot | ImageBrandLogoRoundPilot |
| CardHorizontalProductInformationPilot | BtnTextPilot |
| CardHorizontalProductOptionPilot | BtnTextPilot, ImgRectanglePilot |
| CardHorizontalProductPassPilot | BtnTextPilot |
| CardVerticalProductMediumPilot | ImgRectanglePilot |
| CardVerticalProductSmallPilot | ButtonChipPilot, ImgRectanglePilot |
| CardVerticalPromotionPilot | ImgRectanglePilot |
| ListPilot | TextAreaPilot, LinkPilot |
| InformationBarcodePilot | BtnTextPilot |
| InformationMembershipPilot | ButtonChipPilot |
| ImageBrandLogoPilot | ImageBrandLogoRoundPilot |

### raw HTML 사용 Pilot (21)

다수가 placeholder 용 wrapper div (썸네일/슬롯/배경) — WDS 매칭이 없거나 단순 div 가 더 짧아 의도적으로 raw 유지.

| Pilot | raw 회수 | 패턴 분류 |
|---|---|---|
| CardVerticalProductSmallPilot | 8 | thumbnail wrapper + add overlay + slot-badge + price span |
| BannerContentsPilot | 6 | button 외곽 + 가격 라인 |
| CardHorizontalProductPilot | 6 | thumbnail wrapper + add 버튼 + 가격 span |
| CardVerticalProductMediumPilot | 4 | slot-badge + price span |
| CardVerticalPromotionPilot | 3 | image+card 겹침 wrapper |
| InformationBarcodePilot | 3 | barcode placeholder div |
| ImageBrandLogoPilot | 3 | logo overlap wrapper + badge |
| InputPilot | 3 | input 컨테이너 + caret |
| AccordionPilot | 2 | container + header button |
| CardHorizontalProductOptionPilot | 2 | price span |
| CardVerticalProductListPilot | 2 | slot 영역 |
| BadgeNumberPilot | 1 | absolute 위치 div |
| ButtonTabbarPilot | 1 | tab 컨테이너 |
| CardHorizontalProductBarcodeInformationPilot | 1 | divider 1px |
| CardHorizontalProductSelectPilot | 1 | slot 영역 |
| HeaderBottomsheetPilot | 1 | 외곽 div |
| ImageBrandLogoRoundPilot | 1 | placeholder div |
| ImgRectanglePilot | 1 | placeholder div |
| BannerPilot | 1 | 외곽 button |
| TextIconPilot | 1 | icon placeholder |
| IndicatorDotPilot | 1 | 색 점 div |

raw 패턴 분류 (헬퍼 추출 후보):

| 패턴 | 등장 횟수 | 후보 헬퍼 |
|---|---|---|
| placeholder 영역 (slot / barcode / image area) | ~10 | `<SlotPlaceholder>` / `<ImagePlaceholder>` |
| price-composite (info+price+month span) | 4 | `<PriceComposite>` |
| 외곽 button (clickable card 전체) | 3 | `<ClickableCard>` 또는 Card.onClick 활용 |
| absolute overlay (button-add, badge, image-card overlap) | 3 | (특수, 추출 가치 낮음) |

### 측정 재실행

`app/scripts/audit-pilot-kit.mjs` 미작성. 다음 명령으로 즉석 산출 가능 (multi-line `<div\n` 까지 포함하는 정규식):

```bash
cd app/src/components/pilot-kit
RAWPAT='<(div|span|button|p|a|img|ul|li|section|header|main|nav|h[1-6]|input|form|label)([[:space:]/>]|$)'
total=$(ls *Pilot.tsx | wc -l)
wds=$(for f in *Pilot.tsx; do grep -q "from \"@wanteddev/wds" "$f" && echo 1; done | wc -l)
pilot=$(for f in *Pilot.tsx; do grep -qE "from \"\./.*Pilot\"" "$f" && echo 1; done | wc -l)
raw=$(for f in *Pilot.tsx; do grep -qE "$RAWPAT" "$f" && echo 1; done | wc -l)
echo "total=$total wds=$wds pilot=$pilot raw=$raw"
```

## 카테고리 구조 (현재)

| 라우트 | Figma section | 종 수 | 비고 |
|---|---|---|---|
| `/pilot-kit/atoms-buttons` | atom | 7 | btn-search, button-chip 등 |
| `/pilot-kit/atoms-badges` | atom | 5 | |
| `/pilot-kit/atoms-form` | atom | 4 | input, dropdown, accordion |
| `/pilot-kit/atoms-display` | atom | 5 | divider, img/rectangle 등 |
| `/pilot-kit/atoms-misc` | atom | 4 | tabbar, banner 등 |
| `/pilot-kit/molecules-cards` | molecule (12:8103) | 10 | vertical 4 + horizontal 6 |
| `/pilot-kit/molecules-misc` | molecule (12:8103) | 9 | button-icon · banner-contents · header-bottomsheet · information × 2 · image/brand-logo · text-icon · accordion · input |
| `/pilot-kit/header` | organism | 1 | HeaderPilot 단독 |

총 50 Pilot. **molecule section (12:8103) 20 종 100% 커버**. atom 단계에서 만들어둔 ButtonIconPilot · BannerContentsPilot 도 molecules-misc 에 정식 등록 완료 (파일 위치는 그대로 두되 카탈로그만 분류 정정).

## 추후 레지스트리 등록 시 메타데이터

`registry/pilot-kit-registry.json` (가칭) 으로 정식 등록할 때 각 Pilot 항목당 권장 필드:

```json
{
  "name": "CardVerticalProductMediumPilot",
  "figma_node_id": "1:26922",
  "figma_name": "card-vertical-product/medium",
  "atomic_level": "molecule",
  "category": "molecules-cards",
  "design_spec": "data/design/components/card-vertical-product-medium.json",
  "binding_override": "data/binding/overrides/card-vertical-product-medium.json",
  "implementation": "app/src/components/pilot-kit/CardVerticalProductMediumPilot.tsx",
  "wds_dependencies": ["Card", "CardCaption", "CardContent", "CardTitle", "Typography"],
  "pilot_dependencies": ["ImgRectanglePilot"],
  "raw_html_parts": ["slot-badge", "price-composite"],
  "open_questions": ["…"],
  "status": "verified" | "draft" | "deprecated"
}
```

생성 스크립트는 `app/scripts/` 에 추가 (예: `generate-pilot-kit-registry.mjs`). design/binding/Pilot 3-tuple 을 자동으로 매칭해 위 형태로 출력.

## 다른 키트와 통합

여러 키트(예: `pilot-kit-mobile`, `pilot-kit-web`)를 합칠 가능성에 대비:

- **충돌 방지**: 키트별 prefix 또는 namespace import 사용 권장. 예: `import * as PilotMobile from "pilot-kit-mobile"`.
- **공통 layer 추출**: `Card` 위에 얹는 slot-badge / price-composite 같은 공통 패턴은 나중에 `pilot-shared` 로 추출 가능. 현재는 raw `<div>` + Typography 로 인라인 (binding override `open_questions` 에 명시됨).
- **라우트 분리**: `/pilot-kit/*` 는 본 키트 전용. 다른 키트 통합 시 `/pilot-mobile/*` 식 별도 prefix.
- **레이아웃 처리**: `app/src/app/layout.tsx` 의 `isScreenRoute()` 가 `/pilot-kit` 로 시작하는 경로를 풀스크린(non-mobile-frame) 으로 분기 중. 새 키트 prefix 추가 시 같은 분기 업데이트 필요.

## 알려진 제약 (raw HTML 잔존)

WDS 에 1:1 대응 컴포넌트가 없어 `<div>` / `<span>` 으로 구현 중인 부분. 추후 WDS 보강 또는 공용 헬퍼로 추출 후보:

| 패턴 | 사용처 | 후보 헬퍼 |
|---|---|---|
| slot-badge (#ffeaea + 안내문) | medium / small / list / select | `<SlotBadge>` |
| price-composite (info + price + month 인라인) | medium / small / option / horizontal-product | `<PriceComposite>` |
| image+card 겹침 | promotion | (구조 자체 특수, 추출 불필요) |
| button-add absolute overlay | small | Card 내장 슬롯 추가 시 흡수 |

## 관련 문서

- `app/AGENTS.md` — WDS prop 규약, 토큰 참조 규칙
- `app/CLAUDE.md` — 본 README 를 가리키는 진입점 (`@AGENTS.md`)
- `registry/wds-component-registry.json` — WDS 컴포넌트 인벤토리
- `registry/wds-token-registry.json` — WDS 디자인 토큰 (typography, color, radius 등) source of truth
- `data/design/components/` — Figma 명세 사본
- `data/binding/overrides/` — WDS 매핑 결정 사본
