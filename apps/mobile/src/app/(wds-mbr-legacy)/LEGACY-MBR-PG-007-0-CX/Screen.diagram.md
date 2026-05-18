# LEGACY-MBR-PG-007-0-CX — 회원 가입 약관 동의

## Screen Contract

- route: `/LEGACY-MBR-PG-007-0-CX`
- group: `wds-mbr-legacy`
- domain: `membership`
- source: current `Screen.tsx`
- reverseEngineeringSource: current `Screen.tsx` is treated as the visual/structural truth for this legacy-converted screen.
- pattern: `form-entry`
- policy refs: `structural-only`
- governance refs: `TBD`; legacy conversion metadata does not establish policy-core governance mapping.
- wireReference:
  - source: `apps/mobile/src/app/(nova-mbr-legacy)/NOVA-MBR-PG-001-0/Screen.diagram.md`
  - matchedParts: membership agreement task, all-agree row, required/optional terms rows, fixed primary CTA.
  - intentionalDifferences: legacy-converted screen uses `TitleMain` intro, `ConsentTermsAccordion`, and an in-section legal guardian `Callout` instead of the NOVA membership organisms.
  - limitation: reference-only visual structure; policy/copy/OGN ids come from current `Screen.tsx`, `Screen.map.md`, and `Screen.config.ts`.

## Screen Wire

```txt
┌─AppScreen(headerPreset="form-entry")──────────────────────┐
├─SystemHeader──────────────────────────────────────────────┤
│ StatusBar                                                 │
├─Header────────────────────────────────────────────────────┤
│ AppBar(title="회원 가입", showLeftItem, showTitle)          │
├─Content(scroll)───────────────────────────────────────────┤
│ [intro | form-intro-title | content]                      │
│ 회원 가입 1단계 (1/5)                                     │
│ 약관에 동의하고                                           │
│ 가입을 시작하세요                                         │
│ 필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택    │
│ 약관은 나중에 변경할 수 있습니다.                         │
├══Divider 4px / SectionDivider(thickness="section")════════┤
│ [terms | consent-accordion-section | section-divider]     │
│ 약관 동의                                                 │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ [termsAccordion | consent-control-group | organism]  │   │
│ │ □ 전체 동의 (필수·선택 약관 모두)                    │   │
│ │ ▸ □ [필수] T 우주 서비스 이용약관 (v3.2)             │   │
│ │ ▸ □ [필수] 개인정보 수집·이용 동의 (v5.1)            │   │
│ │ ▸ □ [선택] 혜택·이벤트 정보 수신 동의                │   │
│ └──────────────────────────────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ 법정대리인 동의 안내                                 │   │
│ │ 만 14세 미만 고객은 법정대리인 동의 요청이 함께      │   │
│ │ 진행됩니다.                                          │   │
│ └──────────────────────────────────────────────────────┘   │
├─Bottom(preset="primary-cta")──────────────────────────────┤
│ [actions | bottom-primary-action | bottom-fixed]          │
│ ┌──────────────────────────────────────────────────────┐   │
│ │                    동의하고 계속하기                 │   │
│ └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

## Section Contracts

### [intro]

- patternEvidence:
  - wireSemanticTag: `[intro | form-intro-title | content]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `none`
  - typography: `TitleMain` with step caption, two-line title, and explanatory subtitle.
- patternDecision:
  - patternFamily: `form-intro-title`
  - pattern: existing composition
  - reason: current screen uses `PageStackContents` with `TitleMain` before the first divider.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` owns horizontal content padding.
  - stack: vertical intro text.
  - alignment: leading
  - wrapping: title intentionally wraps at the newline; subtitle may wrap to multiple lines.
  - overflow: normal content scroll.
- layoutContract:
  - role: introduce the signup consent step and explain required vs optional consent behavior.
  - structure: `PageStackContents` title slot containing `TitleMain`.
  - alignment: leading text hierarchy.
  - density: intro spacing owned by page-stack layout.
  - wrapping: preserve explicit title line break and keep subtitle within content width.
  - distortionRisk: adding a progress bar, card, or extra policy notice would diverge from the implemented screen.
- componentCandidates:
  - name: `PageStackContents(title=TitleMain)`
    source: `current Screen.tsx`
    fit: strong
    reason: directly preserves the implemented step caption, title, and subtitle slots.
    risk: none when subtitle remains in `TitleMain`.

### [terms]

- patternEvidence:
  - wireSemanticTag: `[terms | consent-accordion-section | section-divider]`
  - sectionBoundary: `SectionDivider`
  - fieldGrouping: `FieldStack` inside `ConsentTermsAccordion`
  - rowSeparators: `AccordionList` internal row separation
  - actionPlacement: `none`
  - typography: `TitleSection`; checkbox control label scale; callout title/body scale from `Callout`.
- patternDecision:
  - patternFamily: `sectioned-consent-control-group`
  - pattern: existing composition plus existing domain organism
  - reason: current screen renders `ConsentTermsAccordion` followed by a `Callout` inside one `SectionItem` so the legal guardian notice stays attached to terms consent.
- layoutStrategy:
  - widthTier: `content`
  - padding: `PageStackContents` + `SectionItem`
  - stack: section title, consent organism, then callout.
  - alignment: leading control labels and callout text.
  - wrapping: long accordion titles and callout body wrap within content width.
  - overflow: accordion expansion occurs inside the content scroll region.
- layoutContract:
  - role: collect required/optional terms consent and present the legal guardian notice as related guidance.
  - structure: titled section + consent accordion organism + callout in one section item.
  - alignment: checkbox and accordion rows align leading; callout remains below the consent control group.
  - density: consent group and callout share the section rhythm; no divider between them.
  - wrapping: terms titles may wrap without colliding with checkbox controls; callout body remains readable.
  - distortionRisk: splitting callout into a separate section, duplicating terms rows in the route, or moving accordion content outside scroll would break the implemented relationship.
- componentCandidates:
  - name: `PageStackContents + TitleSection + SectionItem + ConsentTermsAccordion + Callout`
    source: `current Screen.tsx`
    fit: strong
    reason: preserves the implemented section title, domain consent organism, and attached legal guardian callout.
    risk: accordion title wrapping must remain inside the organism contract.

### [termsAccordion]

- patternEvidence:
  - wireSemanticTag: `[termsAccordion | consent-control-group | organism]`
  - sectionBoundary: `none`
  - fieldGrouping: `FieldStack`
  - rowSeparators: `AccordionList` internal rows
  - actionPlacement: `none`
  - typography: checkbox label scale for all-agree; accordion title plus helper/body text inside expanded content.
- patternDecision:
  - patternFamily: `consent-control-accordion`
  - pattern: existing domain organism
  - reason: current screen imports `ConsentTermsAccordion`, `CONSENT_ITEM_IDS`, and `REQUIRED_CONSENT_IDS` from `@/organisms/nova-mbr-legacy`.
- layoutStrategy:
  - widthTier: `inherited content`
  - padding: organism inherits section item width.
  - stack: all-agree checkbox followed by multi-expand accordion terms list.
  - alignment: leading checkbox controls and accordion titles.
  - wrapping: term titles and body placeholders wrap inside accordion row content.
  - overflow: expanded body content remains in `AppScreen.Content` scroll.
- layoutContract:
  - role: manage all/individual consent state for required and optional terms.
  - structure: `FieldStack` with all-agree checkbox and `AccordionList` containing checkbox left content.
  - alignment: control affordances align with titles; expanded content follows each accordion row.
  - density: organism owns its internal field-stack and accordion density.
  - wrapping: placeholder body copy must not be mistaken for final legal source text.
  - distortionRisk: reimplementing rows directly in the route would duplicate state/copy ownership and weaken the organism boundary.
- componentCandidates:
  - name: `ConsentTermsAccordion`
    source: `existing-composition`
    fit: strong
    reason: preserves the existing domain organism boundary, all/required consent constants, and accordion behavior.
    risk: legal body text is placeholder copy until a policy/sourceRef is confirmed.

### [actions]

- patternEvidence:
  - wireSemanticTag: `[actions | bottom-primary-action | bottom-fixed]`
  - sectionBoundary: `none`
  - fieldGrouping: `none`
  - rowSeparators: `none`
  - actionPlacement: `Bottom(preset="primary-cta")`
  - typography: xlarge primary button label.
- patternDecision:
  - patternFamily: `fixed-primary-cta`
  - pattern: existing bottom composition
  - reason: current screen uses `AppScreen.ActionBar preset="primary-cta"` with one full-width primary button.
- layoutStrategy:
  - widthTier: `content`
  - padding: action-bar preset owns safe-area and CTA width.
  - stack: single action.
  - alignment: full-width
  - wrapping: button label one line.
  - overflow: fixed bottom action stays outside scroll content.
- layoutContract:
  - role: progress to the next signup step when required consents are satisfied.
  - structure: fixed bottom primary CTA.
  - alignment: full-width button inside primary action bar.
  - density: `primary-cta` preset.
  - wrapping: label remains one line.
  - distortionRisk: placing the button in scroll content or adding secondary actions would change the implemented action model.
- componentCandidates:
  - name: `ActionBar(preset="primary-cta") + SinglePrimaryAction + Button(fullWidth, size="xlarge", variant="primary")`
    source: `current Screen.tsx`
    fit: strong
    reason: exactly preserves the implemented action bar and disabled/enabled button surface.
    risk: none.

## Policy / OGN Matrix

| requirement | sourceRef | policy | OGN | section | governance | layout decision |
| --- | --- | --- | --- | --- | --- | --- |
| `LEGACY-MBR-CONSENT-INTRO` | current `Screen.tsx` | structural-only | `ogn-mbr-consent-intro` | `intro` | TBD | Preserve step caption, two-line title, and required/optional consent subtitle. |
| `LEGACY-MBR-CONSENT-TERMS` | current `Screen.tsx` + `ConsentTermsAccordion.tsx` | TBD; no policy-core source confirmed | `ogn-mbr-consent-terms-section` | `terms` | TBD | Preserve the titled consent section with domain consent organism and attached callout. |
| `LEGACY-MBR-CONSENT-TERMS-ACCORDION` | `apps/mobile/src/organisms/nova-mbr-legacy/consent-terms-accordion/ConsentTermsAccordion.tsx` | TBD; body text is placeholder | `ogn-mbr-consent-terms-accordion` | `termsAccordion` | TBD | Preserve all-agree checkbox, required service/privacy terms, optional marketing term, and accordion behavior. |
| `LEGACY-MBR-CONSENT-ACTIONS` | current `Screen.tsx` | structural-only | `ogn-mbr-consent-actions` | `actions` | TBD | Preserve disabled primary CTA until `REQUIRED_CONSENT_IDS` are all checked. |

## Distortion Gates

- Treat current `Screen.tsx` as the truth; do not redesign or reinterpret the legacy-converted screen while editing metadata.
- Keep `AppScreen.Content` as the only scroll owner and keep the primary CTA in `AppScreen.ActionBar preset="primary-cta"`.
- Preserve `SectionDivider(thickness="section")` between intro and terms sections.
- Preserve `ConsentTermsAccordion` as an `@/organisms/nova-mbr-legacy` boundary; do not inline its terms rows in the route or metadata selection.
- Preserve the legal guardian `Callout` inside the terms section after the accordion; do not split it into a new section with another divider.
- Preserve CTA enablement based on `REQUIRED_CONSENT_IDS`; optional marketing consent does not block progression.
- Treat accordion body placeholders as placeholder copy, not verified legal policy text.
- Do not invent policy IDs, final terms sourceRefs, minor-consent branching, validation errors, or alternate all-agree semantics without a policy/source update.
- Do not add route-level raw margin, padding, width, fontSize, color, or deprecated imports to recreate this layout.
