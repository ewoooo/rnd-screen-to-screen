# SKT SDUI 디자인 패턴 가이드
> 출처: Figma `SKT_SDUI_Test_0513_2` — `pattern-guide` 페이지 (node 12002:21853)  
> 분석 기준: 36개 스크린, 755개 컴포넌트 인스턴스, 74종 컴포넌트 유형  
> 작성일: 2026-05-13

---

## 섹션별 케이스 패턴 가이드

> 유사 케이스 제작 시 참고할 수 있도록 각 섹션별로 **언제 사용하는지 / 필수 구성 / 선택 구성 / 케이스 분기 / 주의사항**을 정리합니다.

- [메인](#section-main)
- [리스트\_카드](#section-list-card)
- [리스트\_텍스트](#section-list-text)
- [상세\_상품](#section-detail-product)
- [상세\_정보 입력](#section-detail-form)
- [완료](#section-complete)
- [바텀시트](#section-bottomsheet)
- [팝업](#section-popup)

---

## 조합 레이어 원칙

화면 제작 시 외부 문서의 `Atom` 분류는 직접 사용하지 않고, 이 repo의 구현 어휘인 `Component -> Pattern -> Organism -> Screen`으로 해석한다.

| 레이어 | 역할 | 화면 route 직접 배치 |
|---|---|---|
| Component | `Button`, `Badge`, `Ico`, `RadioText`, `CheckboxText` 같은 기초 UI 어휘 | 원칙적으로 금지 |
| Pattern | `SinglePrimaryAction`, `PageStackContents`, `FieldStack`, `PopupActionButton` 같은 반복 조합 | 가능 |
| Organism | 정책 의미·도메인 모듈 ID·OGN을 담는 의미 단위 | 가능 |
| Screen | `AppScreen` slot에 chrome/section/organism을 배치하는 지도 | 해당 |

기초 component는 독립 배치보다 pattern이나 organism의 이름 있는 slot 안에서 의미가 선명해진다. 예를 들어 primary `Button`은 콘텐츠 중간에 직접 배치하지 않고 `SinglePrimaryAction`, 카드 CTA slot, `PopupActionButton`, bottom sheet action slot 안에 둔다.

### 컴포넌트 후보 분기

화면 패턴을 정한 뒤 각 SB part는 바로 신규 component로 만들지 않고 `reuse` 또는 `new`로 분기한다.

- `reuse`: 기존 `@pxds/cx-components/components/*`, `@pxds/cx-components/candidate/*`, `@pxds/cx-layout` pattern, 또는 도메인 `Organism` 조합으로 정책 의미와 상태를 표현할 수 있다.
- `new`: 기존 vocabulary로 정책 의미, 선택지, 에러, slot, Figma bridge identity를 표현할 수 없어 신규 candidate가 필요하다.

`new` candidate는 생성 가능하지만 반드시 `RQR` 식별자를 붙인다. React 이름은 `RQR{Name}`, 폴더와 `componentId`, `data-figma-component-id`는 `rqr-{name}`을 사용한다. 정식 component vocabulary로 승격할 때는 `RQR` prefix를 제거한다.

---

## 공통 Layout / Spacing Contract

이 문서는 화면 패턴 구조와 spacing 운영을 함께 소유한다. 과거 spacing 전용 문서의 실측 운영 규칙은 이 섹션과 각 패턴의 `Spacing Contract`로 흡수했다.

정식 spacing token scale과 semantic token의 원천은 `DESIGN_FOUNDATION.md`다. Figma 실측에서 token scale에 없는 값이 보이면 임의 token으로 승격하지 않고 가장 가까운 정식 token 또는 component-owned layout으로 정렬한다.

### Width Rails

| Rail | Width | 용도 |
|---|---:|---|
| Full bleed | 393px | StatusBar, AppBar, ActionButton, Divider, BottomSheet shell |
| Section | 369px | Pagestack, CardCarousel, CardSection, card/list group |
| Content | 361px | 일반 본문, 상세/폼 콘텐츠, 2열 grid |
| Inner content | 329px | TitleSection, ListText, TextField, Accordion |
| Popup text | 297px | 361px Popup card 내부에서 좌우 32px inset |

361px tier는 393/369/329 grid를 대체하지 않는다. 369px는 카드형 section wrapper와 리스트 그룹, 361px는 일반 본문 콘텐츠와 폼/상세 화면의 기본 콘텐츠 폭으로 사용한다.

### Chrome Sizes

| Element | Size / Rhythm |
|---|---|
| StatusBar | 393×59px |
| AppBar | 393×48px |
| Header total | 107px = StatusBar 59 + AppBar 48 |
| BottomNavigation | 393×88px |
| ActionButton | 393×102px |
| Bottom safe area | 36px |

### Component Measurement Cheatsheet

| Component | Contract |
|---|---|
| Button | Small 28px, Medium 36px, Large 48px, XLarge 56px; 버튼은 action pattern 또는 organism slot 안에서 사용 |
| TextField | input 48px, field gap 12px, group title gap 8px, group vertical rhythm 24px |
| Chip | ChipItem 37px, row 57px, icon-text gap 2px, row gap 4px |
| CardSection | outer width 369px, inner padding 28px, inner gap 24px |
| ListText | row 22px + padB 4px, left flex / right fixed, gap 16px |
| InfoTextList | row gap 4px, key-value gap 40px, total row top Divider required |
| BottomSheet | Handle 32px, Title 68px, ActionButton 102px |
| Popup | card 361px, text inset 32px, PopupActionButton 361×60px |

### Spacing 운영 원칙

- 0-4px: 같은 원자적 요소 내부.
- 8-12px: 같은 컴포넌트 내부 인접 요소.
- 16-20px: 카드/컨테이너 내부 padding, 화면 기본 좌우 padding.
- 24-28px: 카드 상하 padding, section 구분.
- 32-40px: 큰 영역 구분, bottom sheet title, footer/filter sorting 계열.
- 컴포넌트 간 간격은 외부 margin보다 부모 container의 `gap` 또는 `padding`으로 제어한다.
- 화면 route에서 raw spacing으로 기준선을 보정해야 하면 pattern 또는 layout primitive로 올릴 수 있는지 먼저 확인한다.
- section 간 구분은 gap 보정보다 `Divider`나 해당 pattern의 section contract를 우선한다.

---

<a name="section-main"></a>
## 섹션 패턴 — 메인 (Main)

### 언제 사용
앱의 진입 허브. 탐색·검색·개인화 콘텐츠를 한 화면에 담을 때 사용.  
메인은 단일 화면이 아니라 **탭 또는 세그먼트로 분기**되는 복수 화면 구조로 설계.

### 케이스 분류

| 케이스 | 화면명 | 특징 |
|---|---|---|
| **검색형** | 메인_검색 | SearchBar 중심, 퀵 카테고리 Chip |
| **쇼핑형** | 메인_쇼핑 | 배너 + 다중 캐러셀 섹션 |
| **관리형 (탭)** | 메인_관리_세그먼트1/2 | UnderlineTab + CardSection 그리드 |

---

### 케이스 A — 검색형 메인

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar                            (393×59)          │
│ AppBar  [Logo / 검색 아이콘]           (393×48)          │
├───────────────────────────────────────────────────────┤
│ Pagestack  (x=0, w=393)                               │
│   ContentsTitle → TitleMain  (검색 유도 메시지)          │
│   ContentsSlot → Image (검색 일러스트)                   │
├───────────────────────────────────────────────────────┤
│ 퀵 카테고리 ChipItem 그룹  (x=12, 가로 스크롤)             │
├───────────────────────────────────────────────────────┤
│ SearchBar  (x=20, w=353, h=52)                        │
├───────────────────────────────────────────────────────┤
│ BottomNavigation                     (393×88)          │
└───────────────────────────────────────────────────────┘
```

**필수 구성요소**
- StatusBar + AppBar (고정 헤더 107px)
- SearchBar (x=20, w=353)
- BottomNavigation (하단 88px)

**선택 구성요소**
- TitleMain (검색 유도 문구)
- ChipItem 퀵 카테고리 바
- Image (빈 상태 또는 추천 일러스트)

**주의사항**
- SearchBar는 반드시 x=20 배치 (내부 콘텐츠 너비 기준)
- BottomNavigation과 ActionButton 동시 사용 금지

---

### 케이스 B — 쇼핑형 메인

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar                            (393×59)          │
│ AppBar  [Logo / 장바구니 아이콘]        (393×48)          │
├───────────────────────────────────────────────────────┤
│ Local_BannerShop                     (393×146)         │
├───────────────────────────────────────────────────────┤
│ Local_Chips (카테고리 탭)              (393×57)          │
├───────────────────────────────────────────────────────┤
│ ↓ 반복 섹션 (x=12, w=369) ─────────────────────────── │
│   Local_CardCarousel                                   │
│     Local_TitleMain  (섹션 제목 + 서브레이블)             │
│     슬롯 (가로 스크롤)                                    │
│       CarouselProductModule       또는                  │
│       CarouselProductTextModule   또는                  │
│       VerticalProductTextModule   또는                  │
│       Local_CardContents                               │
│   Local_CardCarousel  (반복 최대 9개 확인)               │
├───────────────────────────────────────────────────────┤
│ BottomNavigation                     (393×88)          │
└───────────────────────────────────────────────────────┘
```

**필수 구성요소**
- StatusBar + AppBar
- Local_Chips (카테고리 필터)
- Local_CardCarousel × 1개 이상
- BottomNavigation

**선택 구성요소**
- Local_BannerShop (상단 광고/프로모션 배너)
- 캐러셀 내 모듈 유형은 콘텐츠 성격에 따라 선택

**캐러셀 모듈 선택 기준**
| 모듈 | 사용 상황 |
|---|---|
| `CarouselProductModule` | 이미지 중심 상품 카드 |
| `CarouselProductTextModule` | 텍스트 정보가 중요한 상품 |
| `VerticalProductTextModule` | 세로형 상품 리스트 |
| `Local_CardContents` | 혜택·서비스 정보 카드 |

**주의사항**
- Local_CardCarousel은 x=12 고정 (369px 섹션 너비)
- 캐러셀은 가로 스크롤 처리, 첫 카드만 화면에 노출

---

### 케이스 C — 관리형 메인 (세그먼트)

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar                   (393×107)         │
├───────────────────────────────────────────────────────┤
│ Local_BannerBenefit  (x=12, w=369, h=48)              │
├───────────────────────────────────────────────────────┤
│ ↓ CardSectionList  (x=12, w=369) ──────────────────── │
│   Local_CardSection  (h=107~229, 콘텐츠에 따라 가변)    │
│   Local_CardSection  (반복, 5~6개)                     │
│   Local_BannerHorizontal  (선택, 369×98)               │
│   Local_ButtonSection     (선택, 369×68)               │
│   Local_ButtonItem  (더보기, w=72, h=33, 중앙 정렬)     │
├───────────────────────────────────────────────────────┤
│ BottomNavigation                     (393×88)          │
└───────────────────────────────────────────────────────┘
```

**탭 분기 처리**
- UnderlineTab으로 세그먼트 전환 (세그먼트1 / 세그먼트2)
- 탭별로 CardSection 구성 및 배너 유형이 달라짐

**필수 구성요소**
- UnderlineTab (세그먼트 전환)
- Local_CardSection × 3개 이상
- BottomNavigation

**선택 구성요소**
- Local_BannerBenefit (혜택 배너)
- Local_BannerHorizontal (가로형 프로모션 배너)
- Local_ButtonSection (버튼 CTA 섹션)
- Local_ButtonItem (더보기)

**Spacing Contract**
- Main chrome은 `StatusBar + AppBar = 107px`를 기본으로 한다.
- 검색형 SearchBar는 content rail 353px 기준으로 x=20에 둔다.
- Chip row는 57px 높이, left 20px, row gap 4px를 기준으로 한다.
- 쇼핑형/관리형 카드 섹션은 section rail 369px(x=12)을 사용한다.
- CardSection 내부 padding은 28px, 내부 gap은 24px를 기준으로 한다.
- Main 계열은 `BottomNavigation(88px)`을 사용하고 `ActionButton`과 동시에 쓰지 않는다.

---

<a name="section-list-card"></a>
## 섹션 패턴 — 리스트\_카드 (Card List)

### 언제 사용
상품·서비스를 카드 형태로 탐색하는 브라우즈 화면.  
각 항목이 이미지, 가격, 주요 스펙을 포함할 때 사용.  
필터·정렬 기능이 필요한 경우에 적합.

### 케이스 분류

| 케이스 | 예시 화면 | 특징 |
|---|---|---|
| **카테고리 필터 있음** | 리스트_요금제, 리스트_혜택 | Chips + FilterSorting |
| **정렬만 있음** | 리스트_부가서비스, 리스트_인터넷 | FilterSorting 단독 |
| **복수 카테고리 그룹** | 리스트_요금제, 리스트_혜택 | ProductListGroup × 2 |

---

### 기본 구조

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar                   (393×107)         │
├───────────────────────────────────────────────────────┤
│ [선택] Chips  (393×57)  ← 카테고리 필터 칩               │
│ FilterSorting  (393×50~52)  ← 정렬/필터 바             │
├───────────────────────────────────────────────────────┤
│ ProductListGroup  (x=0, w=393)                        │
│   TitleSection  (x=20, w=329)  ← 카테고리 제목          │
│   Card 0/PagestackItem                               │
│     ListProductHorizontal  (x=12, w=369, h=200)      │ ← 표준
│     ListProductHorizontal  (반복)                      │
│     ListProductHorizontal  ...                        │
│                                                       │
│ [선택] ProductListGroup  (두 번째 카테고리)               │
│   Divider  (393×4)  ← 카테고리 그룹 구분                │
│   TitleSection + 카드 목록 반복                         │
└───────────────────────────────────────────────────────┘
```

**필수 구성요소**
- StatusBar + AppBar
- FilterSorting (정렬 기능)
- ListProductHorizontal × 1개 이상

**선택 구성요소**
- Chips (카테고리 필터) — 복수 카테고리가 있을 때
- TitleSection (카테고리 그룹 제목)
- 복수 ProductListGroup (카테고리 분리)

**ListProductHorizontal 크기 변형**
| 높이 | 사용 케이스 |
|---|---|
| 369×200px | 표준 (요금제, 단말기) |
| 369×157px | 간소화 (부가서비스) |
| 369×168px | 중형 (인터넷) |
| 369×174px | 중형 변형 |

**주의사항**
- Chips가 없을 때 FilterSorting이 AppBar 바로 아래 위치
- Chips가 있을 때 배치: AppBar → Chips(57) → FilterSorting(50~52) → 콘텐츠
- 카드는 반드시 x=12 배치 (369px 섹션 너비)
- 카드 간 구분은 Divider(329×1px) 사용 금지 → 카드 자체의 여백으로 구분

**Spacing Contract**
- Chips는 57px, FilterSorting은 50~52px 높이를 기준으로 한다.
- ProductListGroup은 section rail 369px(x=12)을 기준으로 반복한다.
- ProductListGroup 내부 padding은 top/bottom 12px, left/right 12px를 기준으로 한다.
- TitleSection과 ListText류 내부 콘텐츠는 inner rail 329px를 기준으로 한다.
- 카드 간 구분은 1px Divider가 아니라 카드 자체 여백과 group rhythm으로 처리한다.

---

<a name="section-list-text"></a>
## 섹션 패턴 — 리스트\_텍스트 (Text List)

### 언제 사용
이미지 없이 텍스트 정보 위주의 내역·목록을 표시할 때.  
이용내역, 포인트 내역, 공지사항, 이용안내 등 **기록·정보 조회 화면**에 적합.

### 케이스 분류

| 케이스 | 예시 화면 | 특징 |
|---|---|---|
| **내역 조회형** | 리스트_이용내역, 리스트_할인내역 | Summary 배너 + 날짜 Chips + ListText |
| **공지/안내 목록형** | 리스트_공지사항 | Local_ListInfo 직접 사용 |
| **포인트 내역형** | 리스트_T플러스포인트 내역 | Summary + Chips + Pagestack |
| **FAQ/이용안내형** | 리스트_이용안내 | Tab + Chips + SearchBar + AccordionList |

---

### 케이스 A — 내역 조회형

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar                   (393×107)         │
├───────────────────────────────────────────────────────┤
│ Local_Summary  (x=12, w=369)  ← 요약 통계 배너         │
│   (잔여 데이터, 포인트 합계 등 숫자 요약)                   │
├───────────────────────────────────────────────────────┤
│ [선택] TitleSection  (x=20, w=329)                    │
│ Chips  (날짜/기간 필터)                                  │
├───────────────────────────────────────────────────────┤
│ Pagestack  (x=0, w=393)                               │
│   ContentsSlot → Default 20/PagestackItem             │
│     ListText  (x=20, w=329, h=22)  ← 반복             │
│     Divider  (329×1px)  ← 각 ListText 사이             │
└───────────────────────────────────────────────────────┘
```

### 케이스 B — 공지/안내 목록형

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar                   (393×107)         │
├───────────────────────────────────────────────────────┤
│ Local_ListInfo  (x=32, w=329)                         │
│   ← 제목+날짜+뱃지 구성의 리스트, Divider로 구분          │
└───────────────────────────────────────────────────────┘
```

### 케이스 C — FAQ/이용안내형

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar                   (393×107)         │
├───────────────────────────────────────────────────────┤
│ Tab  (393×47)  ← 카테고리 탭 전환                       │
│ Chips  (날짜/기간 필터, 393×57)                         │
│ SearchBar  (x=20, w=353, h=45~52)                     │
├───────────────────────────────────────────────────────┤
│ AccordionList  (x=32, w=329)                          │
│   Accordion  (펼침: h=95)                              │
│   Divider  (329×1px)                                  │
│   Accordion  (닫힘: h=21)  ← 반복                      │
│   Divider  ...                                        │
└───────────────────────────────────────────────────────┘
```

**공통 필수 구성요소**
- StatusBar + AppBar
- 1개 이상의 목록 컴포넌트 (Local_ListInfo / ListText / Accordion)

**선택 구성요소 및 판단 기준**

| 요소 | 추가 기준 |
|---|---|
| Local_Summary | 합계·잔량 등 수치 요약이 필요할 때 |
| Chips | 날짜·기간·카테고리 필터가 필요할 때 |
| Tab | 콘텐츠 유형이 2가지로 나뉠 때 |
| SearchBar | 목록이 많아 검색이 필요할 때 |

**주의사항**
- ListText 사이 구분은 반드시 `329×1px` Divider 사용
- Pagestack 없이 Local_ListInfo 직접 배치 가능 (공지 목록형)
- AccordionList는 반드시 `Accordion + Divider` 교번 구조 유지

**Spacing Contract**
- ListText는 inner rail 329px, row 22px + padB 4px를 기준으로 한다.
- ListText의 left/right 관계는 left flex / right fixed, gap 16px를 기본으로 한다.
- 항목 구분은 `Divider(329×1px)`를 사용하고, 단순 vertical gap으로 대체하지 않는다.
- Summary 배너는 section rail 369px(x=12)을 사용한다.
- FAQ/이용안내형의 Chips row는 57px, Tab은 full bleed 393px를 기준으로 한다.

---

<a name="section-detail-product"></a>
## 섹션 패턴 — 상세\_상품 (Product Detail)

### 언제 사용
상품·서비스의 상세 정보를 전달하는 롱폼(long-form) 화면.  
이미지 + 가격 + 구조화된 정보 블록 + 하단 CTA가 필요한 경우.

### 케이스 분류

| 케이스 | 예시 화면 | 특징 |
|---|---|---|
| **구독 상품형** | 상세_구독상품 | 썸네일 + ProductInfo + 탭 이미지갤러리 |
| **기프티콘형** | 상세_기프티콘 | 썸네일 + ProductInfo + 간단한 Pagestack |
| **혜택 브랜드형** | 상세_혜택브랜드 | 썸네일 → 바로 Pagestack (ProductInfo 생략) |
| **단말기형** | 상세_단말기 | 썸네일 + ProductInfo + OptionList + 탭갤러리 |

---

### 기본 구조 (공통)

```
┌──────────────────────── 393px ────────────────────────┐
│ [오버레이] StatusBar + AppBar  ← 스크롤해도 최상단 고정   │
│                                      (393×107)         │
├───────────────────────────────────────────────────────┤
│ ↓ 스크롤 콘텐츠 (y=0부터 시작, 헤더에 가려짐)              │
│                                                       │
│ Local_Thumbnail  (393×480)  ← 히어로 이미지             │
│                                                       │
│ [케이스에 따라] Local_ProductInfo  (393×170~177)        │
│   상품명 / 가격 / 기본 스펙                               │
│                                                       │
│ ─ ─ ─ Pagestack 반복 구간 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│ Divider  (393×4)                                      │
│ Pagestack  (x=0 or x=12, w=393 or 369)               │
│   TitleSection + Card 0/PagestackItem                 │
│     (카드형 콘텐츠: 가격정보, 브랜드카드, 쿠폰 등)           │
│     또는                                               │
│   TitleSection + Default 20/PagestackItem             │
│     (텍스트형 콘텐츠: 이용약관, 유의사항 등)                 │
│ Divider  (393×4)                                      │
│ Pagestack  (반복)                                      │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                                       │
│ [선택] Local_BannerHorizontal  (x=12, 369×112)        │
│ Footer  (393×376)                                     │
│                                                       │
│                ActionButton  (393×102, 하단 고정)       │
└───────────────────────────────────────────────────────┘
```

### 케이스별 구성 차이

**구독 상품형 / 단말기형** (상품 정보 풀 버전)
```
Local_Thumbnail (480)
Local_ProductInfo (170~177)  ← 기본 정보
  UnderlineTab  ← "상품정보 / 이용안내" 등
  Image 갤러리  ← 상세 이미지
  Local_ButtonMore  ← "더보기"
Pagestack × N
Footer
```

**기프티콘형** (간략 버전)
```
Local_Thumbnail (480)
Local_ProductInfo (170)
Pagestack × 2~3  ← 유의사항, 이용안내
Footer
```

**혜택 브랜드형** (ProductInfo 생략)
```
Local_Thumbnail (480)
Pagestack × N  ← 바로 상세 콘텐츠
  Local_AccordionProductInfo  ← 브랜드 카드 + 혜택 내역
  Local_BannerHorizontal
Footer
```

**단말기형** (옵션 선택 포함)
```
Local_Thumbnail (480)
Local_ProductInfo (170~177)
Pagestack  ← Local_OptionList (색상/용량 선택)
Pagestack × N  ← 스펙, 이용안내
Footer
```

**필수 구성요소**
- StatusBar + AppBar (오버레이, y=0 고정)
- Local_Thumbnail
- ActionButton (하단 고정, 102px)

**선택 구성요소 판단 기준**

| 요소 | 추가 기준 |
|---|---|
| Local_ProductInfo | 가격/스펙 요약이 필요한 상품 |
| UnderlineTab | 상세정보가 2가지 이상 탭으로 나뉠 때 |
| Local_OptionList | 색상·용량·수량 옵션 선택이 필요할 때 |
| Local_BannerHorizontal | 연관 상품·프로모션 배너 노출 시 |
| Local_AccordionProductInfo | 복수 브랜드/혜택을 접이식으로 표시할 때 |
| Footer | 이용약관·고객센터 등 법적 고지가 필요할 때 |

**주의사항**
- StatusBar+AppBar는 반드시 별도 오버레이 프레임으로 y=0에 고정 (콘텐츠와 분리)
- Pagestack 섹션 간 구분은 반드시 `Divider(393×4px)` 사용
- ActionButton은 콘텐츠 스크롤과 무관하게 화면 최하단에 고정
- Footer는 ActionButton 위 콘텐츠의 마지막 요소

**Spacing Contract**
- 상세 hero는 full bleed 393px로 시작하고, overlay header는 y=0에서 107px를 점유한다.
- Local_Thumbnail은 full bleed 393px, 높이 480px를 기준으로 한다.
- ProductInfo는 full bleed 393px, 높이 170~177px 범위를 기준으로 한다.
- Pagestack 섹션 간 구분은 `Divider(393×4px)`를 사용하고 gap으로 대체하지 않는다.
- Card형 상세 정보는 section rail 369px, 텍스트/약관 정보는 inner rail 329px를 기준으로 한다.
- Bottom ActionButton은 393×102px fixed rail로 둔다.

---

<a name="section-detail-form"></a>
## 섹션 패턴 — 상세\_정보 입력 (Form Entry)

### 언제 사용
사용자 입력·확인·결제·장바구니 등 **입력 기반 트랜잭션 화면**.  
단계가 여러 개일 경우 스텝별로 화면을 분리.

### 케이스 분류

| 케이스 | 예시 화면 | 주요 콘텐츠 |
|---|---|---|
| **입력형** | 상세_정보 입력_인풋 | TextField 중심 |
| **확인/동의형** | 상세_정보 체크 | CheckboxText + ListText + Callout |
| **결제형** | 상세_결제 | Local_PayList + Local_Summary |
| **장바구니형** | 상세_장바구니 | Local_CartList + Local_OptionList |

---

### 기본 구조

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar  (AppBar 제목: 현재 단계명)  (393×107)│
├───────────────────────────────────────────────────────┤
│ [선택] Local_Sheet  (상단 고정 요약 정보, 393×가변)       │
│   ← 선택한 상품 요약, 현재 가입 정보 등                    │
├───────────────────────────────────────────────────────┤
│ ↓ 폼 섹션 반복 구간 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│ Pagestack  (x=0, w=393)                               │
│   ContentsTitle → TitleSection  (섹션 제목)             │
│   ContentsSlot → Default 20/PagestackItem             │
│     TextField        ← 직접 입력                        │
│     ListText         ← 읽기 전용 확인 항목               │
│     ListSelected     ← 선택 항목 (라디오/체크)            │
│     CheckboxText     ← 동의 항목                        │
│     Callout          ← 안내·경고 메시지                  │
│     AccordionList    ← 약관 상세 내용                    │
│     Local_PayList    ← 결제 수단 선택                    │
│     Local_PaymentList ← 결제 수단 목록                  │
│     Local_CartList   ← 장바구니 아이템                   │
│     Local_OptionList ← 옵션 선택                        │
│     Local_Summary    ← 금액 요약                        │
│                                                       │
│ Divider  (393×4)  ← 섹션 구분                          │
│ Pagestack  (반복)                                      │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                ActionButton  (393×102, 하단 고정)       │
└───────────────────────────────────────────────────────┘
```

### 폼 섹션 내 콘텐츠 선택 기준

| 콘텐츠 | 사용 상황 |
|---|---|
| `TextField` | 이름, 연락처, 주소 등 사용자 입력 |
| `ListText` | 이미 확정된 정보 읽기 전용 표시 |
| `ListSelected` | 단일/복수 선택 (결제 수단, 배송 방법 등) |
| `CheckboxText` | 약관 동의, 마케팅 수신 동의 등 |
| `Callout` | 유의사항, 약관 요약, 안내 문구 |
| `AccordionList` | 약관 전문 (접이식 처리) |
| `Local_PayList` | 결제 수단 선택 UI |
| `Local_PaymentList` | 간편결제 로고 목록 |
| `Local_CartList` | 장바구니 상품 목록 + 수량 조절 |
| `Local_OptionList` | 색상·용량·수량 모듈형 선택 |
| `Local_Summary` | 주문 금액 최종 요약 |

### 복수 Pagestack 섹션 구성 원칙

```
섹션 1: 기본 정보 입력 (TextField 중심)
  Divider (393×4)
섹션 2: 선택 및 확인 (ListSelected / ListText)
  Divider (393×4)
섹션 3: 동의 (CheckboxText + Callout + AccordionList)
  Divider (393×4)
섹션 4: 최종 금액 요약 (Local_Summary)
```

**필수 구성요소**
- StatusBar + AppBar
- Pagestack × 1개 이상
- ActionButton (하단 고정)

**선택 구성요소**
- Local_Sheet (최상단 요약 정보, 선택한 상품 표시)

**주의사항**
- Pagestack 섹션 구분은 반드시 `Divider(393×4px)` 사용
- 단일 Pagestack에 너무 많은 폼 요소 혼재 금지 → 의미 단위로 섹션 분리
- CheckboxText + Callout 조합 시: Callout이 CheckboxText 위 또는 아래 배치
- Local_Summary는 항상 마지막 Pagestack 섹션에 배치

**Spacing Contract**
- 일반 form/detail body는 content rail 361px 또는 inner rail 329px를 section contract에 따라 사용한다.
- TextField input은 48px, field 간 gap은 12px를 기준으로 한다.
- form group title과 첫 field 간격은 8px, group 간 vertical rhythm은 24px를 기준으로 한다.
- Pagestack 섹션 간 구분은 `Divider(393×4px)`를 사용한다.
- 입력, 확인, 동의, 요약은 의미 단위로 분리하고 외부 margin으로 섹션 구분을 흉내내지 않는다.
- Bottom ActionButton은 393×102px fixed rail로 둔다.

---

<a name="section-complete"></a>
## 섹션 패턴 — 완료 (Completion)

### 언제 사용
트랜잭션 완료 후의 성공 상태 화면.  
개통·요금제 변경·결제·해지 등 **되돌릴 수 없는 액션의 결과**를 표시.

### 케이스 분류

| 케이스 | 예시 화면 | 화면 높이 | 특징 |
|---|---|---|---|
| **단순 완료형** | 완료_개통, 완료_요금제 변경, 완료_해지 | 852px (1뷰포트) | 성공 메시지 + 요약 카드 + 버튼 |
| **결제 완료형** | 완료_결제 | 2051px (롱폼) | 영수증 형태의 상세 내역 포함 |

---

### 케이스 A — 단순 완료형

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar  (AppBar: 닫기 또는 홈 버튼)  (393×107)│
├───────────────────────────────────────────────────────┤
│ Pagestack                                             │
│   ContentsTitle                                       │
│     TitleMain  ← 완료 메시지 (display 타이포, 대형)      │
│       예) "개통이 완료되었어요" / "해지 신청이 완료되었어요"  │
│   ContentsSlot → Card 0/PagestackItem                 │
│     Local_Contents 또는 ListText 요약                  │
│       ← 처리된 내역 요약 (요금제명, 적용일 등)             │
├───────────────────────────────────────────────────────┤
│ ActionButton  (393×102, "확인" 또는 "홈으로")           │
└───────────────────────────────────────────────────────┘
```

### 케이스 B — 결제 완료형 (롱폼)

```
┌──────────────────────── 393px ────────────────────────┐
│ StatusBar + AppBar                   (393×107)         │
├───────────────────────────────────────────────────────┤
│ Pagestack  (성공 헤딩)                                  │
│   TitleMain  ← "결제가 완료되었어요"                     │
│   Card 0/PagestackItem  ← 결제 금액 요약 카드            │
│ Divider  (393×4)                                      │
│ Pagestack  (주문 상품 정보)                              │
│   TitleSection + Default 20/PagestackItem             │
│     ListText × N  ← 상품명, 수량, 금액                   │
│ Divider  (393×4)                                      │
│ Pagestack  (결제 수단)                                  │
│   TitleSection + Default 20/PagestackItem             │
│     ListText × N  ← 결제 방법, 승인번호, 결제일           │
│ Divider  (393×4)                                      │
│ Pagestack  (배송/이용 정보, 추가 섹션 가변)               │
├───────────────────────────────────────────────────────┤
│ ActionButton  (393×102, "홈으로" 또는 "쇼핑 계속")       │
└───────────────────────────────────────────────────────┘
```

**완료 메시지 타이포그래피 원칙**
- 메인 완료 문구: `typography/display` (24px, 500) 또는 `typography/headline` (20px, 500)
- TitleMain 컴포넌트 사용 → `Type=Complete` 변형

**필수 구성요소**
- StatusBar + AppBar
- TitleMain (완료 메시지 헤딩)
- ActionButton

**선택 구성요소**

| 요소 | 추가 기준 |
|---|---|
| 요약 카드 (Card 0/PagestackItem) | 항상 포함 권장 (처리 결과 확인) |
| 추가 Pagestack 섹션 | 결제·주문 등 상세 내역이 있을 때 |
| Local_ButtonSection | 부가 액션이 필요할 때 (예: "이용내역 보기") |

**주의사항**
- AppBar에는 '닫기(X)' 또는 '홈' 버튼만 배치 — 뒤로가기 금지 (완료 후 재진입 방지)
- 단순 완료형은 1뷰포트(852px)로 제한 — 스크롤 없는 단일 화면 권장
- 성공 일러스트/아이콘이 필요하면 TitleMain의 Image 슬롯 활용

**Spacing Contract**
- 완료 TitleMain은 inner title rail을 사용하며, title/subtitle 간격은 `TitleMain` component-owned rhythm을 따른다.
- 완료 메시지 block의 좌우 기준은 20px inset을 사용한다.
- 완료 제목과 보조 문구의 vertical rhythm은 component-owned spacing을 우선하고, route-level margin으로 보정하지 않는다.
- 요약 카드는 `Card 0/PagestackItem` 또는 card-key-value-summary component가 padding/radius를 소유해야 한다.
- 결과 요약 카드 padding은 20px를 기준으로 하되, 선택된 component의 card contract가 있으면 component-owned 값을 우선한다.
- 단순 완료형은 Bottom ActionButton 393×102px를 포함해 1 viewport 안에 들어오는지 확인한다.

---

<a name="section-bottomsheet"></a>
## 섹션 패턴 — 바텀시트 (Bottom Sheet)

### 언제 사용
현재 화면 컨텍스트를 유지하면서 추가 선택·정보를 표시할 때.  
모달 수준의 중요도이지만 화면 전환 없이 처리 가능한 경우.

### 케이스 분류

| 케이스 | 내부 콘텐츠 | 특징 |
|---|---|---|
| **선택형 (기본)** | ListSelected 목록 | 단일/복수 선택 |
| **탭 선택형** | Tab + ListSelected | 탭별 선택 목록 |
| **상품 쇼케이스형** | CarouselProductModule | 상품 둘러보기 |
| **날짜/필터형** | ListSelected (날짜/옵션) | 기간·조건 선택 |
| **확인형** | ListText 요약 | 정보 확인 후 진행 |

---

### 기본 구조

```
┌──────────────────────── 393px ────────────────────────┐
│ [Dim 오버레이]  (393×852, gray-alpha-600)              │
│   ┌──────────────────────────────────────────────┐   │
│   │ Bottomsheet  (393×384~554)                   │   │
│   │                                              │   │
│   │  Handle  (393×32)  ← 드래그 핸들              │   │
│   │                                              │   │
│   │  TitleBottomSheet                           │   │
│   │    (x=32, w=329, h=68 기준)                │   │
│   │    ← 제목 텍스트 + [선택] 닫기 버튼             │   │
│   │                                              │   │
│   │  Con 슬롯  (콘텐츠 영역)                       │   │
│   │    기본 좌우 20px 또는 자식 component 정의       │   │
│   │    ← ListSelected × N                        │   │
│   │    ← 또는 Tab + ListSelected                 │   │
│   │    ← 또는 CarouselProductModule              │   │
│   │                                              │   │
│   │  ActionButton  (393×102 or 149)             │   │
│   └──────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────┘
```

### 케이스별 Con 슬롯 구성

**케이스 A — 선택형 (가장 일반적)**
```
Con 슬롯
  ListSelected  (x=20, w=353, h=42~52)  ← 반복, 최대 8개 내외
  ListSelected  ...
  ListSelected  ...
```

**케이스 B — 탭 선택형**
```
Con 슬롯
  Tab  (393×47)  ← 상단 탭
  ListSelected × N  ← 탭별 콘텐츠 전환
```

**케이스 C — 상품 쇼케이스형**
```
Con 슬롯
  CarouselProductModule  (w=369, 가로 스크롤)
```

**케이스 D — 확인형**
```
Con 슬롯
  ListText × N  (x=20, w=353 또는 자식 정의 폭)  ← 선택/주문 내용 확인
  Divider (329×1px)  ← 항목 사이
```

**필수 구성요소**
- Dim 오버레이 프레임 (393×852, 배경 전체 커버)
- Bottomsheet 컴포넌트
- Handle (393×32)
- TitleBottomSheet

**선택 구성요소**

| 요소 | 추가 기준 |
|---|---|
| Tab | 선택 목록이 2가지 이상 카테고리로 나뉠 때 |
| ActionButton | 선택 확인이 명시적으로 필요할 때 |

**높이 산정 가이드**
```
Bottomsheet 최소 높이 = Handle(32) + Title(68 기준) + 콘텐츠 + ActionButton(102)

콘텐츠 높이 계산:
  ListSelected 1개 = 42px
  8개 선택 목록 = 42 × 8 = 336px
  → 최소 Bottomsheet ≈ 32 + 68 + 336 + 102 = 538px
```

**주의사항**
- Bottomsheet 높이는 화면 높이(852px)를 초과하지 않도록 설계
- Handle은 항상 최상단 32px
- TitleBottomSheet는 x=32 (바텀시트 내 양쪽 32px 마진 적용)
- Con 슬롯은 기본 x=20, w=353을 사용한다. 단, ActionButton이 있는 시트처럼 자식 component가 자체 padding을 정의하는 구조에서는 Con 슬롯 padding을 0으로 두고 자식의 contract를 따른다.
- 아이템이 많을 경우 Con 슬롯 내에서 스크롤 처리 (Bottomsheet 높이 고정)

**Spacing Contract**
- BottomSheet shell은 full bleed 393px를 기준으로 하단에 anchor된다.
- Handle area는 32px, Title area는 68px를 기준으로 한다.
- TitleBottomSheet는 좌우 32px inset으로 inner width 329px를 사용한다.
- 일반 Con 슬롯은 x=20, w=353을 기본으로 한다.
- ActionButton이 있는 BottomSheet의 Con 슬롯은 자식 component padding contract를 우선하며 중복 padding을 만들지 않는다.
- BottomSheet ActionButton은 102px를 기준으로 하고, 내부 변형은 component contract를 따른다.

---

<a name="section-popup"></a>
## 섹션 패턴 — 팝업 (Popup)

### 언제 사용
사용자의 의사결정이 반드시 필요한 **차단형(blocking) 모달**.  
확인/취소, 2가지 선택지, 경고·알림 등 간단한 인터랙션에 적합.  
바텀시트보다 콘텐츠 양이 적을 때 사용.

### 케이스 분류

| 케이스 | 내부 콘텐츠 | ActionButton 유형 |
|---|---|---|
| **단순 확인형** | 제목 + 본문 텍스트 | 1버튼 또는 2버튼 |
| **선택형** | 제목 + ListSelected | 2버튼 |
| **정보 확인형** | 제목 + TitleSection + ListText | 2버튼 |

---

### 기본 구조

```
┌──────────────────────── 393px ────────────────────────┐
│ [Dim 오버레이]  (393×852, gray-alpha-600)              │
│                                                       │
│        ┌────────────────────────────────┐             │
│        │ Popup  (x=16, w=361, h=220~288)│             │
│        │                                │             │
│        │  [padding 32px]                │             │
│        │  Title frame  (h=26)           │             │
│        │    ← 팝업 제목 텍스트            │             │
│        │                                │             │
│        │  SubText frame  (h=49~70)      │             │
│        │    ← 설명 본문 텍스트            │             │
│        │                                │             │
│        │  Contents 슬롯  (h=가변, 선택)  │             │
│        │    ← ListSelected              │             │
│        │    ← TitleSection + ListText   │             │
│        │                                │             │
│        │  PopupActionButton  (361×60)   │             │
│        │    ← Options=2Buttons          │             │
│        │    ← 또는 Options=1Button      │             │
│        └────────────────────────────────┘             │
└───────────────────────────────────────────────────────┘
```

### 케이스별 구성

**케이스 A — 단순 확인형** (가장 일반적)
```
Popup (361×220)
  Title  "정말 해지하시겠어요?"
  SubText  "해지 후에는 혜택이 종료됩니다."
  PopupActionButton  Options=2Buttons
    ← "취소" (secondary) + "해지" (primary, danger)
```

**케이스 B — 선택형**
```
Popup (361×288)
  Title  "배송지 선택"
  SubText  "배송받을 주소를 선택해 주세요."
  Contents 슬롯
    ListSelected × 3  ← 주소 목록
  PopupActionButton  Options=2Buttons
    ← "취소" + "선택 완료"
```

**케이스 C — 정보 확인형**
```
Popup (361×260)
  Title  "변경 내역 확인"
  SubText  "아래 내용으로 변경됩니다."
  Contents 슬롯
    TitleSection  ← 카테고리 제목
    ListText × 2~3  ← 변경 전/후 정보
  PopupActionButton  Options=2Buttons
    ← "취소" + "변경"
```

**PopupActionButton 버튼 구성**

| 유형 | 사용 상황 | 버튼 배치 |
|---|---|---|
| `Options=1Button` | 단순 알림·안내 (확인만) | 전체 너비 1개 |
| `Options=2Buttons` | 취소/확인 선택이 필요할 때 | 좌(취소) + 우(확인) |

**팝업 너비·여백 규격**
```
팝업 너비:     361px  (393 - 16×2 = 361, x=16)
내부 여백:     32px  (양쪽, 361 - 32×2 = 297px 내부 콘텐츠 너비)
PopupActionButton: 361×60  (팝업 전체 너비, 하단 배치)
```

**필수 구성요소**
- Dim 오버레이 프레임
- Popup 컴포넌트 (x=16, w=361)
- Title 텍스트
- PopupActionButton

**선택 구성요소**

| 요소 | 추가 기준 |
|---|---|
| SubText | 설명이 필요할 때 (없으면 Title만으로 충분) |
| Contents 슬롯 | 목록 선택·정보 확인이 필요할 때 |

**팝업 vs 바텀시트 사용 판단**

| 상황 | 권장 컴포넌트 |
|---|---|
| 5개 이하의 간단한 선택 + 확인/취소 | 팝업 |
| 6개 이상 선택 목록 또는 탭 분기 | 바텀시트 |
| 상품 탐색, 캐러셀 콘텐츠 | 바텀시트 |
| 차단형 경고, 동의 요청 | 팝업 |
| 필터/정렬 옵션 선택 | 바텀시트 |

**주의사항**
- 팝업은 반드시 x=16 수평 배치 (좌우 마진 16px)
- SubText 없이 Title + PopupActionButton만으로도 완성 가능
- Contents 슬롯 아이템이 4개를 초과하면 바텀시트로 전환 권장
- Dim 오버레이는 팝업 아래에 별도 프레임으로 반드시 포함

**Spacing Contract**
- Popup card는 361px width, x=16을 기준으로 한다.
- Popup text content는 297px width, card edge에서 좌우 32px inset을 기준으로 한다.
- title-body gap은 16px, content-button gap은 24px를 기준으로 한다.
- checkbox/list 내부 gap은 8px를 기준으로 한다.
- PopupActionButton은 361×60px로 popup 하단에 붙인다.

---

## 1. 전체 페이지 구조 (8개 섹션, 36개 스크린)

모든 스크린은 **393px 너비** (표준 iPhone 뷰포트)로 통일.

| 섹션명 | 영문 | 스크린 수 | 목적 |
|---|---|---|---|
| `메인` | Main | 4 | 검색, 쇼핑, 관리(탭 2개) |
| `리스트_카드` | Card List | 6 | 요금제·단말기·구독·혜택·부가서비스·인터넷 |
| `리스트_텍스트` | Text List | 5 | 이용내역·포인트·할인·공지·이용안내 |
| `상세_상품` | Product Detail | 4 | 구독상품·기프티콘·혜택브랜드·단말기 |
| `상세_정보 입력` | Form Entry | 4 | 인풋·체크·결제·장바구니 |
| `완료` | Completion | 4 | 개통·요금제 변경·결제·해지 |
| `바텀시트` | Bottom Sheet | 6 | 선택·탭 선택·상품 쇼케이스 등 |
| `팝업` | Popup | 3 | 확인·선택·알림 |

---

## 2. 레이아웃 그리드 (너비 체계)

```
393px ── 풀블리드 (StatusBar, AppBar, ActionButton, 섹션 구분 Divider, BottomSheet)
  └── 369px ── 12px 양쪽 마진 (Pagestack, CardCarousel, CardSection)
  └── 361px ── 16px 양쪽 마진 (일반 본문, 상세/폼 콘텐츠, 2열 그리드)
        └── 329px ── 20px 양쪽 내부 패딩 (TitleSection, ListText, TextField, Accordion)
              └── 297px ── Popup 내부 콘텐츠 (361px 팝업에서 32px 양쪽)
```

361px tier는 기존 393/369/329 그리드를 대체하지 않는다. 369px는 카드형 section wrapper와 리스트 그룹, 361px는 일반 본문 콘텐츠와 폼/상세 화면의 기본 콘텐츠 폭으로 사용한다.

**BottomSheet 너비 예외:** title 영역은 screen 기준 32px 마진으로 329px, 일반 Con 슬롯은 20px 마진으로 353px를 기본으로 한다. ActionButton이 있는 시트의 Con 슬롯은 자식 component의 padding contract를 우선한다.

---

## 3. 수직 공간 체계 (Vertical Rhythm)

```
┌─ y=0   StatusBar (393×59)
├─ y=59  AppBar    (393×48)
├─ y=107 ─── 콘텐츠 시작선
│
│  [Pagestack 그룹]
│    ├─ Pagestack top padding: 28px
│    ├─ ContentsTitle (TitleSection 37px)
│    ├─ ContentsSlot (콘텐츠 영역)
│    └─ Divider 섹션 구분선 (393×4px)
│
│  [리스트 내부]
│    ├─ ListItem 간 Divider: 329×1px
│    ├─ 공간 Spacer: 329×17px / 329×21px / 329×41px
│
├─ y=(화면 높이 - 88)  BottomNavigation (393×88) — 메인 화면
└─ y=(화면 높이 - 102) ActionButton (393×102) — 상세/폼 화면

Footer: 393×376 (콘텐츠 최하단)
```

---

## 4. SDUI 슬롯 패턴 (핵심 구조)

### Pagestack — 범용 SDUI 컨테이너

```
Pagestack
├── ContentsTitle frame
│   └── TitleSection (섹션 제목)
└── ContentsSlot_복사금지 ← 서버가 콘텐츠를 주입하는 슬롯
    ├── Default 20/PagestackItem_이친구를복붙하세요  ← 기본 슬롯 아이템
    │   └── [ListText | TextField | ListSelected | Callout | CheckboxText |
    │         AccordionList | Local_PayList | Local_PaymentList | Local_CartList |
    │         Local_OptionList | Local_CartList | TitleContents | Local_ListInfo]
    └── Card 0/PagestackItem_이친구를복붙하세요  ← 카드형 슬롯 아이템
        └── [Local_Card | CarouselProductModule | Local_AccordionPriceInfo |
              Local_AccordionProductInfo | TextList | Local_Contents |
              BannerHorizontal | Local_Coupon | Local_Map]
```

**슬롯 네이밍 관례:**
- `ContentsSlot_복사금지` → 디자이너 원칙: 슬롯 자체를 직접 복사하지 말 것
- `이친구를복붙하세요` → 이 슬롯 아이템을 복사해서 사용하라는 의미
- 슬롯 2종: `Default 20` (텍스트/폼 콘텐츠) / `Card 0` (카드형 콘텐츠)

---

## 5. 스크린 구성 패턴 (8가지)

### Pattern A — 폼/정보 입력 화면
> 사용: 상세_정보 입력_인풋, 상세_정보 체크, 상세_결제, 상세_장바구니

```
StatusBar (393×59)
AppBar (393×48)
━━━ 콘텐츠 (y=107~) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[선택] Local_Sheet
Pagestack
  TitleSection + Default 20/PagestackItem
    TextField | ListText | ListSelected | Callout
    CheckboxText | AccordionList | Local_PayList
Divider (393×4)
Pagestack ... (반복)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ActionButton (393×102, 하단 고정)
```

### Pattern B — 카드 리스트 화면
> 사용: 리스트_요금제, 리스트_단말기, 리스트_구독상품, 리스트_혜택 등

```
StatusBar + AppBar (107)
[선택] Chips (393×57) ← 카테고리 필터 칩
FilterSorting (393×50~52) ← 정렬/필터 바
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ProductListGroup
  TitleSection
  Card 0/PagestackItem
    ListProductHorizontal × N (369×200px, 수직 반복)
[선택] ProductListGroup × 2 (카테고리 구분 시)
```

### Pattern C — 텍스트 리스트 화면
> 사용: 리스트_이용내역, 리스트_T플러스포인트, 리스트_할인내역 등

```
StatusBar + AppBar (107)
[선택] Local_Summary (요약 배너)
[선택] TitleSection
[선택] Chips (날짜/기간 필터)
[선택] Local_ListInfo | Pagestack
  Default 20/PagestackItem
    ListText × N
```
이용안내 화면 한정: `Tab + Chips + SearchBar + AccordionList` (FAQ 구조)

### Pattern D — 메인_쇼핑 화면
```
StatusBar + AppBar (107)
Local_BannerShop (393×146)
Local_Chips (393×57) ← 카테고리 탭
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Local_CardCarousel × 9 (x=12, w=369)
  Local_TitleMain (타이틀 + 서브레이블)
  슬롯 → CarouselProductModule × 4
         CarouselProductTextModule × 3
         VerticalProductTextModule × 1
         Local_CardContents × 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BottomNavigation (393×88)
```

### Pattern E — 메인_관리 화면 (탭 2종)
```
StatusBar + AppBar (107)
Local_BannerBenefit (x=12, 369×48)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CardSectionList (x=12, w=369)
  Local_CardSection × 5~6 (높이 107~229px 가변)
  [선택] Local_BannerHorizontal (369×98)
  [선택] Local_ButtonSection (369×68)
  Local_ButtonItem (더보기 버튼, 72×33)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BottomNavigation (393×88)
```

### Pattern F — 상품 상세 화면
> 사용: 상세_구독상품, 상세_기프티콘, 상세_혜택브랜드, 상세_단말기

```
[오버레이] StatusBar + AppBar (107, 스크롤 시 콘텐츠 위에 고정)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Local_Thumbnail (393×480, 히어로 이미지)
Local_ProductInfo (393×170~177, 상품명+가격+기본정보)
Pagestack × N (구조화된 콘텐츠 블록, Divider로 구분)
  Card 0/PagestackItem (카드형 상세 정보)
  Default 20/PagestackItem (텍스트형 상세 정보)
[선택] Local_ProductInfo expanded (탭+이미지갤러리 포함)
[선택] Local_BannerHorizontal (369×112)
Footer (393×376)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ActionButton (393×102, 하단 고정)
```

### Pattern G — 완료 화면
```
StatusBar + AppBar (107)
Pagestack
  ContentsTitle → TitleMain (대형 성공 헤딩)
  Card 0/PagestackItem (요약 카드)
[선택] 추가 Pagestack (상세 내역)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ActionButton (393×102)
```

### Pattern H — 바텀시트 / 팝업
**바텀시트:**
```
[Dim 오버레이 (393×852, 반투명)]
Bottomsheet (393×384~554, 하단 앵커)
  Handle (393×32)
  TitleBottomSheet (x=32, w=329, h=68 기준)
  Con 슬롯 (콘텐츠, 기본 x=20/w=353 또는 자식 정의)
    [Variant A] ListSelected × 8 (선택 목록)
    [Variant B] Tab + ListSelected (탭 선택)
    [Variant C] CarouselProductModule (상품 쇼케이스)
  ActionButton (393×102)
```
**팝업:**
```
[Dim 오버레이]
Popup (361×220~288, x=16 수평 중앙)
  Title (placeholder: "타이틀")
  SubText (placeholder: "텍스트")
  콘텐츠 슬롯 → ListSelected | TitleSection+ListText
  PopupActionButton (361×60)
```

---

## 6. 컴포넌트 사용 빈도 TOP 20

| 순위 | 컴포넌트 | 사용 수 | 역할 |
|---|---|---|---|
| 1 | `Divider` | 92 | 콘텐츠 구분선 (1px/4px 두 종류) |
| 2 | `ListText` | 69 | 레이블+값 텍스트 행 |
| 3 | `TitleSection` | 61 | 섹션 헤더 |
| 4 | `Pagestack` | 52 | SDUI 범용 컨테이너 |
| 5 | `Accordion` | 45 | FAQ/상세 접이식 행 |
| 6 | `Default 20/PagestackItem` | 39 | 기본 슬롯 아이템 |
| 7 | `ListSelected` | 39 | 선택형 리스트 행 |
| 8 | `StatusBar` | 27 | 상태바 |
| 9 | `AppBar` | 27 | 내비게이션 바 |
| 10 | `ListProductHorizontal` | 20 | 가로형 상품 카드 |
| 11 | `TextField` | 19 | 텍스트 입력 필드 |
| 12 | `ActionButton` | 16 | 하단 CTA 버튼 블록 |
| 13 | `Card 0/PagestackItem` | 12 | 카드형 슬롯 아이템 |
| 14 | `Local_CardSection` | 11 | 관리 탭 카드 블록 |
| 15 | `Ico` | 10 | 아이콘 컴포넌트 |
| 16 | `Local_CardCarousel` | 9 | 캐러셀 섹션 |
| 17 | `Local_TitleMain` | 9 | 메인 섹션 타이틀 |
| 18 | `CarouselProductModule` | 8 | 캐러셀 상품 카드 |
| 19 | `ListProductRow` | 8 | 단일 행 상품 목록 |
| 20 | `Callout` | 7 | 인라인 안내 박스 |

---

## 7. 컴포넌트 중첩 패턴 상세

### AccordionList 패턴
```
AccordionList
  Accordion (h=95, 첫 항목 펼쳐진 상태)
  Divider (329×1px)
  Accordion (h=21, 닫힌 상태)
  Divider (329×1px)
  ... (반복)
```
- 반드시 Accordion ↔ Divider 교번 구조
- 첫 항목이 열린 상태(h=95), 나머지 닫힌 상태(h=21)로 시작

### ListProductHorizontal 패턴
- 크기: `369×200px` (표준), `369×157px` / `369×168px` / `369×174px` (변형)
- 카드 리스트 화면에서 수직 스택으로 반복 배치
- Card 0/PagestackItem 내부에 포함

### AccordionPriceInfo / AccordionProductInfo 패턴
```
Local_AccordionPriceInfo (Card 0 슬롯 내부)
  TitleContents × 2~3
  Divider
  [States=Open 시] 가격 정보 리스트

Local_AccordionProductInfo (Card 0 슬롯 내부)
  TitleContents
  ThumbnailLogoItem (브랜드 로고)
  Ico (확장 아이콘)
  Divider
```

### Local_Card 패턴
```
Local_Card
  Type=Brand → ThumbnailLogoItem + Local_CardTitle + [Button]
  Type=Place  → ThumbnailLogoItem + Local_CardTitle
```

### Local_Coupon 패턴
```
Local_Coupon
  Badge × 2 (상태 배지)
  ThumbnailLogoItem (브랜드 로고)
  Local_CardTitle (상품명)
  Button (사용하기 등)
```

---

## 8. 컴포넌트 카테고리 분류

### 전역 라이브러리 컴포넌트 (base-component에서 참조)
**크롬/내비게이션:** StatusBar, AppBar, BottomNavigation, Footer, ActionButton, Tab, UnderlineTab  
**콘텐츠 섹션:** Pagestack, TitleSection, TitleMain, TitleContents, TitleBottomSheet  
**리스트 아이템:** ListText, ListSelected, ListProductHorizontal, ListProductRow, TextItem, TextList  
**카드/캐러셀:** CarouselProductModule, CarouselProductTextModule, VerticalProductTextModule  
**폼/선택 컨트롤:** TextField, CheckboxText, Chips, ChipItem, FilterSorting, SearchBar  
**오버레이:** Bottomsheet, Handle, Popup, PopupActionButton  
**구분/구조:** Divider, Accordion, AccordionList  
**표시 요소:** Badge, Callout, Button, Ico, Image, ThumbnailLogoItem, ThumbnailItem

### Local_ 컴포넌트 (화면 전용 복합 컴포넌트)
> 글로벌 시스템 라이브러리가 아닌 페이지 레벨 조합 컴포넌트

| 컴포넌트 | 사용처 |
|---|---|
| `Local_ProductInfo` | 상품 상세 — 상품명·가격·기본정보 블록 |
| `Local_Thumbnail` | 상품 상세 — 히어로 이미지 영역 |
| `Local_CardCarousel` | 쇼핑 메인 — 캐러셀 섹션 조합 |
| `Local_CardSection` | 관리 메인 — 카드형 서비스 목록 |
| `Local_CardTitle` | 카드 내부 — 브랜드+상품명 표시 |
| `Local_TitleMain` | 캐러셀/섹션 — 대형 섹션 타이틀 |
| `Local_BannerHorizontal` | 가로형 배너 |
| `Local_BannerBenefit` | 혜택 배너 (관리 탭) |
| `Local_BannerShop` | 쇼핑 메인 상단 배너 |
| `Local_Summary` | 텍스트 리스트 — 요약 통계 배너 |
| `Local_PayList` | 폼 — 결제 수단 선택 리스트 |
| `Local_PaymentList` | 폼 — 결제 수단 목록 |
| `Local_CartList` | 폼 — 장바구니 아이템 목록 |
| `Local_ListInfo` | 텍스트 리스트 — 정보형 리스트 |
| `Local_OptionList` | 폼 — 옵션 선택 목록 |
| `Local_AccordionPriceInfo` | 상품 상세 — 가격 접이식 |
| `Local_AccordionProductInfo` | 상품 상세 — 상품 정보 접이식 |
| `Local_Coupon` | 쿠폰 카드 |
| `Local_Map` | 지도 영역 |
| `Local_Sheet` | 폼 상단 정보 시트 |
| `Local_Contents` | 일반 콘텐츠 블록 |
| `Local_Chips` | 로컬 탭 칩 바 |
| `Local_ButtonSection` | 버튼 섹션 블록 |
| `Local_ButtonItem` | 더보기 버튼 (텍스트) |
| `Local_ButtonMore` | 더 많은 항목 보기 버튼 |
| `Local_ButtonMoreProduct` | 상품 더보기 버튼 |

---

## 9. 인터랙션/상태 패턴

### Accordion 상태 표현
- **닫힘 (Collapsed):** h=21 (제목만 표시)
- **열림 (Expanded):** h=95 (Q+A 전체 표시)
- 첫 항목 = 열린 상태로 시작하는 패턴

### ListSelected vs ListText
| 컴포넌트 | 역할 | 높이 |
|---|---|---|
| `ListText` | 읽기 전용 레이블+값 행 | 22px |
| `ListSelected` | 선택 가능한 행 (라디오/체크 시각) | 34~52px (크기 변형) |

### ActionButton 높이 변형
| 높이 | 컨텍스트 |
|---|---|
| 102px | 표준 CTA (상세/폼 화면) |
| 146px | 확장형 (완료 화면, AI 버튼 포함) |
| 149px | 바텀시트 내부 |

### 헤더 고정 패턴
- 상품 상세 화면: StatusBar+AppBar(107px) 프레임이 콘텐츠 위에 별도 오버레이로 존재 → 스크롤 시 헤더 고정 효과
- 메인/리스트 화면: 헤더가 콘텐츠 프레임 상단에 포함 (y=0에서 시작)

---

## 10. CTA / 폼 / 오버레이 조합 규칙

### CTA 위치와 버튼 조합

| 화면 상황 | CTA 위치 | 원칙 |
|---|---|---|
| 단일 페이지 진행 | `Bottom`의 `SinglePrimaryAction` | 항상 접근 가능한 하단 action-area에 둔다 |
| 카드에 종속된 부가 액션 | 카드/organism 내부 CTA slot | 해당 카드 의미 안에만 머문다 |
| 섹션 더보기 | `TitleSection` 우측 링크 또는 낮은 강도 action | primary CTA로 올리지 않는다 |
| 오버레이 확인 | BottomSheet/Popup 자체 action slot | 오버레이 문맥 밖으로 빼지 않는다 |

- Primary 버튼은 구매, 신청, 결제, 다음 단계 진행처럼 주 전환 액션에 사용한다.
- Secondary 버튼은 취소, 이전, 닫기처럼 보조 또는 철회 액션에 사용한다.
- 2버튼 조합은 `Secondary + Primary` 순서를 기본으로 한다. 동등한 선택이 아니면 Primary가 더 넓은 비중을 갖는다.
- Primary CTA를 스크롤 콘텐츠 중간에 직접 배치하지 않는다.

### 폼 조합

- 관련 있는 `TextField`는 그룹 제목과 함께 묶는다. 그룹 제목 없이 필드만 나열하지 않는다.
- `TextField` 보조 버튼은 필드 외부 병렬 배치보다 입력 컴포넌트의 우측 slot으로 처리한다.
- 에러 메시지는 해당 `TextField` 바로 아래 help text slot에 붙인다. 별도 callout으로 필드 밖에 띄우지 않는다.
- 약관 동의는 `전체 동의 -> Divider -> 필수/선택 항목` 순서를 기본으로 한다.
- 결제 화면의 약관은 Checkbox와 내용을 확인할 수 있는 accordion/policy detail이 연결되어야 한다.

### 오버레이 선택

| 상황 | 선택 |
|---|---|
| 옵션 목록에서 하나를 선택 | BottomSheet |
| 3개 이상 목록 또는 스크롤 가능 콘텐츠 | BottomSheet |
| 여러 조건 필터 설정 | BottomSheet + 필요한 경우 UnderlineTab |
| 2줄 이내 단순 확인/취소 | Popup |
| 결제 실패·에러 알림 | Popup |

- Popup 내부에 스크롤이 생기면 BottomSheet로 전환한다.
- BottomSheet 안에 또 다른 BottomSheet를 중첩하지 않는다.
- Popup 버튼은 일반 `Button` 직접 배치가 아니라 `PopupActionButton`을 사용한다.

### 완료 화면 copy

- 완료 화면의 제목은 사용자가 처리 결과를 즉시 이해할 수 있는 친근한 구어체를 우선한다. 예: `개통이 완료되었어요`, `결제가 완료되었어요`.
- 완료 화면 하단 2버튼은 좌측 Secondary가 관련 추가 탐색, 우측 Primary가 확인/홈 복귀 역할을 갖는다.

---

## 11. Divider 사용 체계

| 크기 | 사용 빈도 | 용도 |
|---|---|---|
| `393×4px` | 34회 | 섹션 구분 (Pagestack 사이의 두꺼운 구분선) |
| `329×1px` | 45회 | 리스트 아이템 구분 (Accordion 내부, 텍스트 리스트) |
| `329×17px` | 6회 | 공간 스페이서 |
| `329×41px` | 4회 | 바텀시트 내부 큰 스페이서 |
| `393×1px` | 1회 | 풀블리드 얇은 구분선 (Footer 앞) |

---

## 12. 타이포그래피 사용 패턴 (관찰값)

| 텍스트 높이 | 추정 스타일 | 사용 예 |
|---|---|---|
| 16px | caption-large (13px) | 가격 레이블 |
| 17px | caption-large (13px) | 배지 텍스트 |
| 18px | body-500 (14px) | 상품명, 레이블, 안내 텍스트 |
| 21px | title-small (15px) | Accordion 타이틀, 요금제명 |
| 22px | body-400 (14px) | ListText 행 |
| 26px | title-medium (16px) | 팝업 타이틀 |
| 37px | title-medium-600 (16px) | TitleSection |
| 42px | body + 줄간격 | 팝업 본문 텍스트 |

---

## 13. 핵심 설계 원칙 요약

1. **SDUI 슬롯 아키텍처**: `Pagestack`이 서버 주도 UI의 핵심 컨테이너. 서버는 슬롯에 `Default 20/PagestackItem` 또는 `Card 0/PagestackItem`을 주입하여 화면을 조합.

2. **화면 너비 그리드**: `393 → 369 / 361 → 329px`. 369px는 카드형 section wrapper와 리스트 그룹, 361px는 일반 본문 콘텐츠와 폼/상세 화면의 기본 폭, 329px는 내부 콘텐츠 폭으로 사용한다.

3. **스크롤 긴 화면**: 화면 높이 852~4604px. 헤더(107px)는 별도 오버레이로 고정.

4. **액션존 이분법**: 메인·브라우즈 화면 → `BottomNavigation` (88px) / 상세·폼 화면 → `ActionButton` (102px). 동시 사용 없음.

5. **`Local_` 컴포넌트**: 화면 특화 조합 컴포넌트. CX component vocabulary와 layout pattern을 조합한 페이지 맥락 중심 organism 후보. 재사용성보다 정책/화면 맥락에 최적화.

6. **섹션 구분 패턴**: `Pagestack + Divider(393×4px)` 반복. 상세/폼 화면의 기본 구조.

7. **오버레이 패턴**: BottomSheet·Popup은 항상 `dim 오버레이 프레임` 위에 배치. BottomSheet는 하단 앵커, Popup은 x=16 수평 중앙.

8. **AccordionList**: `Accordion ↔ Divider(329×1px)` 교번. FAQ·이용약관·상세정보 모두 동일 패턴.
