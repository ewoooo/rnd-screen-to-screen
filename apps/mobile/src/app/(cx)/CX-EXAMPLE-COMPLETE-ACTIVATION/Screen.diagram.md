# CX-EXAMPLE-COMPLETE-ACTIVATION — 완료_개통

## Screen Contract

- route: `/CX-EXAMPLE-COMPLETE-ACTIVATION`
- group: `cx-example`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_개통` (`393×852`)
- Figma SOT: [SKT GenUI Test 0512 / Text Section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_GenUI_Test_0512?node-id=14627-15206&t=MXbXJQlMpLVcgIv3-1)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`

## Structure Principle

This diagram follows `Screen -> Chrome -> Section -> Slot -> Stack -> Component`.
The completion screen is a simple one-viewport flow, not a free-positioned layout.

```txt
AppScreen(headerPreset="standard", actionBarPreset="guided-action")
  SystemHeader
    StatusBar
  Header
    AppBar(close or home action, no back navigation)
  Content
    PageStackContents
      title:
        TitleMain(type="complete")
          media: Image slot
          title: "개통이 완료되었어요"
          subtitle: "지금부터 새로운 휴대폰 사용이 가능해요."
      content:
        SectionItem(type="card")
          ListText / summary rows
  Bottom
    SinglePrimaryAction
      ActionButton(type="ai", buttonCount=2, showText=true)
        text: supporting transfer guidance
        action[0]: "홈으로 이동" / secondary or AI leading item
        action[1]: "데이터 옮기기" / primary
```

## Content Flow

```txt
[Content: scroll owner, one-viewport completion]

Section(completionHero)
└─ PageStackContents(contentsTitle=true)
   ├─ title slot
   │  └─ TitleMain(type="complete",
   │               title="개통이 완료되었어요",
   │               subTitle="지금부터 새로운 휴대폰 사용이 가능해요.",
   │               media=Image)
   └─ content slot
      └─ SectionItem(type="card")
         └─ Summary rows
            ├─ ListText(label="개통 휴대폰", value="{deviceName}")
            ├─ ListText(label="요금제", value="{planName}")
            └─ ListText(label="개통일", value="{activationDate}")

[Bottom: action-area]
└─ SinglePrimaryAction
   └─ ActionButton(type="ai",
                   buttonCount=2,
                   showText=true,
                   height="393x154")
      ├─ text: "사진이나 연락처, 앱도 새 휴대폰으로 한 번에 옮겨볼까요?"
      ├─ Button(label="홈으로 이동", variant="secondary")
      └─ Button(label="데이터 옮기기", variant="primary", leftItem="ai")
```

## Section Specs

| section | slot | primary components | notes |
| --- | --- | --- | --- |
| `completionHero` | `title` | `PageStackContents`, `TitleMain` | Completion message. Verify final copy against Figma before Screen implementation. |
| `completionHero` | `content` | `SectionItem`, `ListText` | Summary card for processed activation result. |
| `actionArea` | `bottom` | `SinglePrimaryAction`, `ActionButton` | Figma Text Section 확인값: `ActionButton` with text, `393×154`. |

## Implementation Contract

- Use `AppScreen.SystemHeader`, `AppScreen.Header`, `AppScreen.Content`, and `AppScreen.Bottom`.
- Use `TitleMain type="complete"` for the success heading.
- Keep the summary inside `PageStackContents -> SectionItem`.
- Keep the CTA in `AppScreen.Bottom`; do not place it as the last scroll content section.
- Do not use deprecated `@pxds/pxds-components` or deprecated `@pxds/pxds-icons`.
- Before implementing `Screen.tsx`, confirm exact Figma copy and summary rows from the frame.
