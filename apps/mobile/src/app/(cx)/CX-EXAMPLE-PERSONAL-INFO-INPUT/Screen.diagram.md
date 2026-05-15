# CX-EXAMPLE-PERSONAL-INFO-INPUT — Personal info input

## Screen Contract

- route: `/CX-EXAMPLE-PERSONAL-INFO-INPUT`
- group: `cx-example`
- domain: `mbr`
- source: `Figma`
- pattern: `form`
- frame: `SKT GenUI Test 0513 / 상세_정보 입력_인풋` (`393×1130`)
- policy refs: `POL-MBR-INFO-002-08`, `POL-MBR-AUTH-002-01`
- required design docs: `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`

## Slot Ownership Map

```txt
┌─ AppScreen(headerPreset="form-entry") ─────────────────────┐
│ [SystemHeader]                                             │
│   StatusBar                                                │
├────────────────────────────────────────────────────────────┤
│ [Header]                                                   │
│   AppBar(title="가입자 정보 입력", showLeftItem, showTitle) │
├────────────────────────────────────────────────────────────┤
│ [Content: scroll owner]                                    │
│   Section(intro)                                           │
│   SectionDivider(thickness="section")                      │
│   Section(phone)                                           │
│   SectionDivider(thickness="section")                      │
│   Section(authComplete)                                    │
│   SectionDivider(thickness="section")                      │
│   Section(address)                                         │
│   SectionDivider(thickness="section")                      │
│   Section(homeArea)                                        │
│   SectionDivider(thickness="section")                      │
│   Section(email)                                           │
├────────────────────────────────────────────────────────────┤
│ [ActionBar: primary screen action]                         │
│   SinglePrimaryAction                                      │
│     Button(text="다음", fullWidth, size="xlarge",           │
│            variant="primary")                              │
└────────────────────────────────────────────────────────────┘
```

## Content Flow

```txt
[Content: scroll owner]

Section(intro)
└─ PageStackContents(title=TitleMain("개인정보 입력"))

SectionDivider(thickness="section")

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
```

## Section Specs

| section | title | primary components | policy |
| --- | --- | --- | --- |
| `intro` | `개인정보 입력` | `PageStackContents`, `TitleMain` | - |
| `phone` | `기기변경 휴대폰 번호` | `PageStackContents`, `TitleSection`, `SectionItem`, `TextField` | `POL-MBR-INFO-002-08` |
| `authComplete` | `본인인증 완료` | `PageStackContents`, `TitleSection`, `SectionItem`, `ListText` | `POL-MBR-AUTH-002-01` |
| `address` | `가입자 주소` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `TextField` | - |
| `homeArea` | `주 생활지역` | `PageStackContents`, `TitleSection`, `SectionItem`, `FieldStack`, `Checkbox`, `TextField` | - |
| `email` | `이메일` | `PageStackContents`, `TitleSection`, `SectionItem`, `TextField` | - |

## Implementation Contract

- Use `@pxds/cx-components` for `AppBar`, `Button`, `Checkbox`, `ListText`, `SectionItem`, `StatusBar`, `TextField`, `TitleMain`, and `TitleSection`.
- Use `@pxds/pxds-layout/components` for `AppScreen`, `FieldStack`, `PageStackContents`, `SectionDivider`, and `SinglePrimaryAction`.
- Do not import deprecated `@pxds/pxds-components` or deprecated `@pxds/pxds-icons`.
- Keep `AppScreen.Content` as the only scroll owner.
- Keep the primary CTA in `AppScreen.ActionBar`, not at the end of content.
- Keep section boundaries as `SectionDivider(thickness="section")` between sections.
