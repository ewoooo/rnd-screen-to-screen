# SKT App — Spacing Patterns

> 목적: `DESIGN_FOUNDATION.md`의 spacing token을 실제 화면/컴포넌트 조립에 적용할 때 참고하는 실측 운영 규칙이다.  
> 출처: 2026-05-15 전달 SOT의 `SPACING_PATTERNS.md` 중 현재 시스템에 바로 흡수 가능한 항목.  
> 보류: 별도 결정이 필요한 항목은 이 문서에 반영하지 않는다.

---

## 1. Spacing Token 적용

정식 token scale은 `DESIGN_FOUNDATION.md`의 `space/*` primitive를 따른다. 전달 SOT에서 관찰된 `space/5`는 현재 정식 token으로 승격하지 않고, Chip row gap 같은 컴포넌트 실측 예외로 기록한다.

```txt
space/2   아이콘 내부 미세 간격, 인디케이터 점 간격
space/4   아이콘-텍스트 인라인 gap
space/8   배지 내부, help text 주변 간격
space/10  버튼 icon-label gap, bottom sheet title 내부 gap
space/12  chip padding, small button padding, bottom navigation top padding
space/16  일반 콘텐츠 좌우 padding, medium button padding, info row vertical padding
space/20  app bar/status bar 주요 좌우 padding, chip row 시작 padding
space/24  popup/card/accordion 내부 padding
space/28  card section 상하 padding
space/32  bottom sheet title, filter sorting, footer, XLarge button 내부 padding
space/36  bottom navigation/bottom action safe area padding
space/40  status bar notch 영역
```

## 2. 공통 크롬 실측

```txt
StatusBar
  size      : 393 x 59px
  padding   : top 20px, bottom 18px, left/right 24px

AppBar
  size      : 393 x 48px
  padding   : top/bottom 10px, left/right 20px
  left item : 28px
  right item: 28px 또는 68px(아이콘 2개 + 12px gap)
  total top chrome: StatusBar 59px + AppBar 48px = 107px

BottomNavigation
  size      : 393 x 88px
  padding   : top 12px, bottom 36px, left/right 0
  tab item  : 96 x 40px 기준
```

## 3. 컴포넌트 실측 규칙

### Button

```txt
Small   height 28px, padT/B 6px,  padL/R 12px, icon-label gap 10px
Medium  height 36px, padT/B 10px, padL/R 16px, icon-label gap 10px
Large   height 48px, padT/B 10px, padL/R 16px, icon-label gap 10px
XLarge  height 56px, padT/B 0px,  padL/R 32px, icon-label gap 10px
```

버튼은 독립적인 화면 배치 대상이 아니라 action pattern 또는 organism slot 안에서 사용한다.

### TextField

```txt
전체 컨테이너: label + input + help text, vertical gap 8px, padB 8px
Input field : height 48px, padL 16px, padR 8px, 내부 gap 8px
필드 간 gap : 12px
그룹 제목과 첫 필드 간격: 8px
그룹 간 수직 여백: 24px
```

### UnderlineTab

```txt
size       : 393 x 60px
layout     : horizontal, 균등 분배
tab padL/R : 12px
icon-text gap: 4px
underline  : height 2px, bottom aligned
```

5탭 초과는 고정 폭 + 가로 스크롤로 처리한다.

### Chip

```txt
ChipItem height : 37px
padding         : top/bottom 10px, left/right 12px
icon-text gap   : 2px
row gap         : 5px 실측 예외
row padding     : top/bottom 10px, left 20px, right 0
row height      : 57px
```

### CardSection

```txt
outer width : 369px
inner card padding: top/bottom 28px, left/right 28px
inner gap   : 24px
```

카드 내부 CTA는 최대 1개를 기본으로 한다. 여러 primary action이 필요하면 화면 하단 action-area로 이동한다.

### ListText / InfoTextList

```txt
ListText
  row height : 22px + padB 4px
  layout     : left flex / right fixed, gap 16px

InfoTextList
  padding    : top/bottom 16px
  row gap    : 4px
  key-value gap: 40px
  total row  : 합계 행 상단 Divider 필수
```

### BottomSheet

```txt
Handle area : height 32px, padT 12px
Title area  : height 68px, left/right 32px
Con slot    : 콘텐츠 유형별 자식이 padding 책임을 가진다
```

단순 선택형은 `RadioText` 목록, 필터형은 필요한 경우 `UnderlineTab`, 약관 동의형은 `전체 동의 -> Divider -> 개별 항목` 구조를 따른다.

### Popup

```txt
Popup card padding : 24px
title-body gap     : 12px
body-checkbox gap  : 16px
checkbox gap       : 8px
content-button gap : 24px
PopupActionButton  : height 60px, top padding 12px, button gap 8px
```

Popup 내부에 스크롤이 생기는 구성은 BottomSheet로 전환한다.

## 4. 화면 레이아웃 간격

```txt
공통 상단 chrome : 107px = StatusBar 59px + AppBar 48px
메인 탭 상단     : 167px = StatusBar 59px + AppBar 48px + UnderlineTab 60px
하단 safe area   : 36px
```

### Main

```txt
Pagestack padT/B : 28px
Pagestack padL/R : 12px
Chip/List area   : gap 8px, padB 16px, padL/R 20px
카드 사이 gap     : 12px
섹션 타이틀 상단  : 24px
섹션 타이틀 하단  : 12px
```

### List

```txt
Chip row       : height 57px, gap 5px, padL 20px
FilterSorting  : height 52px, padL/R 32px
ProductListGroup: padT/B 12px, padL/R 12px
ContentsTitle  : padL/R 20px
```

### Detail / Form

```txt
일반 콘텐츠 좌우 padding : 16px
상세 hero                : full bleed, transparent header와 조합
section 간 구분          : gap 보정보다 pattern divider 사용
form field gap           : 12px
form group margin        : title marginT 24px, marginB 8px
```

### Completion

```txt
완료 메시지 block marginL/R : 20px
서브 텍스트 marginB          : 8px
완료 제목 marginB            : 12px
본문 보조 설명 marginB        : 24px
결과 요약 카드 padding        : 20px
결제 완료 cross-sell marginT  : 32px
```

## 5. Grid & Padding Decision

```txt
Full bleed    : 393px, chrome/hero/divider/overlay
Section       : 369px, 12px x 2, card section/list group
Content       : 361px, 16px x 2, 일반 본문/상세/폼/2열 grid
Inner content : 329px, 20px x 2 또는 32px x 2 맥락, title/list/field/accordion
Popup card    : 345px, 24px x 2 margin
```

간격 선택 기준:

```txt
0-4px    같은 원자적 요소 내부
8-12px   같은 컴포넌트 내부 인접 요소
16-20px  카드/컨테이너 내부 padding, 화면 기본 좌우 padding
24-28px  카드 상하 padding, section 구분
32-40px  큰 영역 구분, bottom sheet title, footer/filter sorting 계열
```

컴포넌트 간 간격은 외부 margin보다 부모 container의 `gap` 또는 `padding`으로 제어한다. 화면 route에서 raw spacing으로 기준선을 보정해야 하면 pattern 또는 layout primitive로 올릴 수 있는지 먼저 확인한다.
