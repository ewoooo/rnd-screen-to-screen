# CX-EXAMPLE-TEXT-SECTION-PROOF — Text Section proof

## Screen Contract

- route: `/CX-EXAMPLE-TEXT-SECTION-PROOF`
- group: `cx-example`
- domain: `mbr`
- source: `SB`
- pattern: `form`
- frame: `SKT GenUI Test 0512 / Text Section` (`393×1186`)
- policy refs: `POL-MBR-INFO-002-08`, `POL-MBR-AUTH-002-01`
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`, `SPACING_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`

## Screen Wire

```txt
┌─AppScreen──────────────────────────────────────────────────┐
│ SystemHeader: StatusBar                                    │
├─Header─────────────────────────────────────────────────────┤
│ AppBar(title="가입자 정보 입력", showLeftItem, showTitle)   │
├─Content────────────────────────────────────────────────────┤
│   Section(phone)                                           │
├══Divider════════════════════════════════════════════════════┤
│   Section(authComplete)                                    │
├══Divider════════════════════════════════════════════════════┤
│   Section(address)                                         │
├══Divider════════════════════════════════════════════════════┤
│   Section(homeArea)                                        │
├══Divider════════════════════════════════════════════════════┤
│   Section(email)                                           │
├─Bottom─────────────────────────────────────────────────────┤
│ [Bottom: primary screen action]                            │
│   SinglePrimaryAction                                      │
│     Button(text="다음", fullWidth, size="xlarge",           │
│            variant="primary")                              │
└────────────────────────────────────────────────────────────┘
```

## Section Contracts

```txt
[Content: scroll owner]

Section(phone)
└─ PageStackContents(title=TitleSection("기기변경 휴대폰 번호"))
   └─ SectionItem
      └─ TextField(defaultValue="010-1234-5678",
                   disabled,
                   state="disabled")

SectionDivider(thickness="section")

Section(authComplete)
└─ PageStackContents(title=TitleSection("본인인증 완료"))
   └─ SectionItem
      └─ ListText(showRightItem=false,
                  text="조현호 고객님의 본인인증이 완료되었습니다.")

SectionDivider(thickness="section")

Section(address)
└─ PageStackContents(title=TitleSection("가입자 주소"))
   └─ SectionItem
      └─ FieldStack
         ├─ TextField(defaultValue="01155",
         │            actionButton.label="주소 찾기",
         │            disabled,
         │            state="disabled")
         ├─ TextField(defaultValue="서울 강북구 오현로 45,",
         │            disabled,
         │            state="disabled")
         └─ TextField(defaultValue="107동 203호(미아동, 꿈의숲해링턴플레이스)",
                      state="typed")

SectionDivider(thickness="section")

Section(homeArea)
└─ PageStackContents(title=TitleSection("주 생활지역"))
   └─ SectionItem
      └─ FieldStack
         ├─ Checkbox(checked,
         │          label="가입자 정보와 동일")
         ├─ TextField(defaultValue="01155",
         │            actionButton.label="주소 찾기",
         │            disabled,
         │            state="disabled")
         └─ TextField(defaultValue="서울 강북구 오현로 45,",
                      disabled,
                      state="disabled",
                      helperText="5G 가용지역 확인 동의를 위한 정보")

SectionDivider(thickness="section")

Section(email)
└─ PageStackContents(title=TitleSection("이메일"))
   └─ SectionItem
      └─ TextField(defaultValue="example@plus-ex.com",
                   state="typed")

[Bottom]
└─ Bottom(preset="primary-cta")
   └─ SinglePrimaryAction
      └─ Button(text="다음", variant="primary")
```

## Policy / OGN Matrix

| section | title | primary components | policy | OGN |
| --- | --- | --- | --- | --- |
| `phone` | `기기변경 휴대폰 번호` | `PageStackContents`, `TitleSection`, `SectionItem`, `TextField` | `POL-MBR-INFO-002-08` | structural-only |
| `authComplete` | `본인인증 완료` | `PageStackContents`, `TitleSection`, `SectionItem`, `ListText` | `POL-MBR-AUTH-002-01` | structural-only |
| `address` | `가입자 주소` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `TextField` | - | structural-only |
| `homeArea` | `주 생활지역` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `Checkbox`, `TextField` | - | structural-only |
| `email` | `이메일` | `PageStackContents`, `TitleSection`, `SectionItem`, `TextField` | - | structural-only |
| `actions` | `다음` | `Bottom(preset="primary-cta")`, `SinglePrimaryAction`, `Button` | - | structural-only |

## Distortion Gates

- Content remains the only scroll owner.
- Bottom CTA is isolated in `Bottom(preset="primary-cta")`.
- Section boundaries are expressed with `SectionDivider(thickness="section")`, not route margins.
- No deprecated `@pxds/pxds-components` or `@pxds/pxds-icons` import is allowed.

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Checkbox`, `ListText`, `SectionItem`, `StatusBar`, `TextField`, and `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `FieldStack`, `PageStackContents`, `SectionDivider`, and `SinglePrimaryAction`.
- Do not import deprecated `@pxds/pxds-components` or deprecated `@pxds/pxds-icons`.
- Keep `AppScreen.Content` as the only scroll owner.
- Keep the primary CTA in `AppScreen.Bottom`, not at the end of content.
- Keep section boundaries as `SectionDivider(thickness="section")` between sections.
