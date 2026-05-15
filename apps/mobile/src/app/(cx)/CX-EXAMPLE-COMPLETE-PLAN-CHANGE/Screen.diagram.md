# CX-EXAMPLE-COMPLETE-PLAN-CHANGE — 완료_요금제 변경

## Screen Contract

- route: `/CX-EXAMPLE-COMPLETE-PLAN-CHANGE`
- group: `cx-example`
- domain: `mbr`
- source: `Figma`
- pattern: `complete`
- frame: `SKT GenUI Test 0512 / Text Section / 완료_요금제 변경` (`393×852`)
- Figma SOT: [SKT GenUI Test 0512 / Text Section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_GenUI_Test_0512?node-id=14627-15206&t=MXbXJQlMpLVcgIv3-1)
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`

## Structure Principle

This diagram follows `Screen -> Chrome -> Section -> Slot -> Stack -> Component`.
The completion screen is a simple one-viewport flow, not a free-positioned layout.

```txt
AppScreen(headerPreset="standard", actionBarPreset="default-action")
  SystemHeader
    StatusBar
  Header
    AppBar(close or home action, no back navigation)
  Content
    PageStackContents
      title:
        TitleMain(type="complete")
          title: "요금제 변경이 완료되었어요"
          subtitle: plan-change completion guide
      content:
        SectionItem(type="card")
          ListText / summary rows
  Bottom
    SinglePrimaryAction
      ActionButton(type="default", buttonCount=1, showText=false)
        action[0]: "확인" or "홈으로 이동" / primary
```

## Content Flow

```txt
[Content: scroll owner, one-viewport completion]

Section(completionHero)
└─ PageStackContents(contentsTitle=true)
   ├─ title slot
   │  └─ TitleMain(type="complete",
   │               title="요금제 변경이 완료되었어요",
   │               subTitle="{effectiveDateGuide}")
   └─ content slot
      └─ SectionItem(type="card")
         └─ Summary rows
            ├─ ListText(label="변경한 요금제", value="{planName}")
            ├─ ListText(label="적용일", value="{effectiveDate}")
            └─ ListText(label="월정액", value="{monthlyPrice}")

[Bottom: action-area]
└─ SinglePrimaryAction
   └─ ActionButton(type="default",
                   buttonCount=1,
                   showText=false,
                   height="393x108")
      └─ Button(label="확인", variant="primary")
```

## Section Specs

| section | slot | primary components | notes |
| --- | --- | --- | --- |
| `completionHero` | `title` | `PageStackContents`, `TitleMain` | Completion message. Verify final copy against Figma before Screen implementation. |
| `completionHero` | `content` | `SectionItem`, `ListText` | Summary card for changed plan and effective date. |
| `actionArea` | `bottom` | `SinglePrimaryAction`, `ActionButton` | Figma Text Section 확인값: `ActionButton` default, `393×108`. |

## Implementation Contract

- Use `AppScreen.SystemHeader`, `AppScreen.Header`, `AppScreen.Content`, and `AppScreen.Bottom`.
- Use `TitleMain type="complete"` for the success heading.
- Keep the summary inside `PageStackContents -> SectionItem`.
- Keep the CTA in `AppScreen.Bottom`; do not place it as the last scroll content section.
- Do not use deprecated `@pxds/pxds-components` or deprecated `@pxds/pxds-icons`.
- Before implementing `Screen.tsx`, confirm exact Figma copy and summary rows from the frame.
