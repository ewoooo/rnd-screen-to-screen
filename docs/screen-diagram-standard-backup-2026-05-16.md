# Screen Diagram Standard Backup - 2026-05-16

이 문서는 `SCREEN_STRUCTURE_PRINCIPLES.md`와 `SCREEN_GENERATION_FLOW.md` 전체 정리 중 유실되면 안 되는 Screen Diagram 표준 변경사항 백업이다.

## 반드시 보존할 합의

`Screen.diagram.md` 표준 섹션 순서는 아래로 고정한다.

1. `Screen Contract`
2. `Screen Wire`
3. `Section Contracts`
4. `Policy / OGN Matrix`
5. `Distortion Gates`

`Screen Wire`는 실제 화면처럼 읽히는 ASCII wire다. 상태바, 앱바, 본문 copy, 카드/목록/필드/CTA를 화면에 보이는 형태로 묘사하고, 주요 의미 영역에는 `[intro]`, `[terms]`, `[actions]` 같은 section id를 붙인다.

## AppScreen Slot Rail

`Screen Wire`에는 AppScreen의 물리 slot rail을 반드시 표시한다.

```txt
┌─AppScreen───────────────────────────────┐
├─Header──────────────────────────────────┤
├─Content─────────────────────────────────┤
├─Bottom──────────────────────────────────┤
└─────────────────────────────────────────┘
```

- `Header`는 `StatusBar + AppBar` 또는 `ProgressAppBar` 같은 상단 chrome을 포함한다.
- `Content`는 scrollable body의 시작을 나타낸다.
- `Bottom`은 fixed action zone이며 `Bottom(preset="...")` 계약으로 연결한다.
- 하단 CTA는 본문 마지막 section이 아니라 `Bottom(preset="...")`으로 분리한다.
- `AppScreen.Bottom`이 표준 물리 slot이다.
- `AppScreen.ActionBar`는 같은 bottom slot의 런타임 호환 alias로만 보고, 신규 diagram 표준에는 쓰지 않는다.

## Divider 표기

실제 화면에 section divider band가 있으면 아래처럼 명시한다.

```txt
├══Divider════════════════════════════════┤
```

- `Divider`는 독립 section id를 갖지 않는다.
- `Divider`는 앞뒤 section의 시각적 boundary evidence다.
- 단순 문서 가독성용 선은 `Divider`로 표기하지 않는다.
- 필요한 경우 `Section Contracts.layoutStrategy`에 `separatedBy: Divider`로 기록한다.

## Screen Wire 예시

```txt
┌─AppScreen───────────────────────────────┐
├─Header──────────────────────────────────┤
│ 9:41                              ▮▮▮  │
│ ‹  가입자 정보 입력                     │
├─Content─────────────────────────────────┤
│ [phone]                                 │
│ 기기변경 휴대폰 번호                    │
│ ┌─────────────────────────────────────┐ │
│ │ 010-1234-5678                       │ │
│ └─────────────────────────────────────┘ │
├══Divider════════════════════════════════┤
│ [summary]                               │
│ 이 정보로 가입이 완료됐어요             │
│ 가입 정보                               │
│ 선택 약정 할인 금액        78,650원     │
├─Bottom──────────────────────────────────┤
│ [actions]                               │
│ ┌─────────────────────────────────────┐ │
│ │                 다음                │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Section Contracts 요구사항

`Screen Wire`에 등장한 section id는 모두 `Section Contracts`에 있어야 한다.

각 section contract는 아래 항목을 포함한다.

- `OGN`
- `role`
- `policy`
- `layoutStrategy`
- `vocabularyDecision`
- `distortionRisk`

예:

```md
## [actions]
- OGN: ogn-mbr-primary-cta
- role: action
- policy: POL-MBR-...
- layoutStrategy: Bottom(preset="primary-cta"), one full-width primary action
- vocabularyDecision: reuse SinglePrimaryAction / ActionButton
- distortionRisk: CTA must not become the last scroll content section
```

## 검증 항목

- Diagram에 `Screen Contract`, `Screen Wire`, `Section Contracts`, `Policy / OGN Matrix`, `Distortion Gates`가 모두 있는가?
- `Screen Wire`에 `├─Header─┤`, `├─Content─┤`, 필요한 경우 `├─Bottom─┤` AppScreen slot rail이 명시되어 있는가?
- 실제 divider band가 있는 화면은 `├══Divider══...┤`로 명시되어 있는가?
- `Screen Wire`의 section id가 `Section Contracts`에 모두 존재하는가?
- 하단 CTA가 scroll content가 아니라 `Bottom(preset="...")`으로 분리되어 있는가?
- 신규 표준 diagram에서 `AppScreen.ActionBar` 표기를 쓰지 않았는가?

## 현재 반영 위치

이 백업을 만들 당시 같은 내용은 아래 파일에도 반영되어 있다.

- `SCREEN_STRUCTURE_PRINCIPLES.md`
- `SCREEN_GENERATION_FLOW.md`
