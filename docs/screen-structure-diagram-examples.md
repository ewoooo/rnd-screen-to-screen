# Screen Structure Diagram Examples

`SCREEN_STRUCTURE_PRINCIPLES.md`의 긴 예시를 분리한 참고 문서다. Phase 3의 필수 규칙은 원칙 문서가 소유하고, 이 문서는 작성 형태를 떠올릴 때만 본다.

## Minimal Diagram Shape

```txt
AppScreen
  SystemHeader
    StatusBar
  Header
    OGN: ogn-... / AppBar or ProgressTopBar
  Content
    PageStackContents
      title: TitleSection
      content:
        FieldStack
          TextField
          TextField
      policy: POL-...
    SectionDivider
    PageStackContents
      title: TitleSection
      content:
        reuse: Callout
        or new candidate: RQRNotice
      policy: POL-...
  Bottom
    SinglePrimaryAction
      ActionButton
      policy: POL-...
```

## Complete Screen Example

완료 화면은 상단 완료 메시지, 결과 요약, 혜택/안내, 하단 action이 서로 다른 OGN 전략을 가진다. 같은 stack으로 밀어 넣지 않는다.

```txt
AppScreen
  Header
    OGN: ogn-mbr-complete-header
      layoutStrategy:
        widthTier: content-361
        stack: vertical
        alignment: leading
        wrapping: title max 2 lines, body max 2 lines
      layoutContract:
        role: completion hero
        structure: app bar + leading completion title block
        distortionRisk: title/body hierarchy collapses into generic section text
      componentCandidates:
        - name: AppBar + TitleMain inside complete hero organism
          source: cx-components + complete reference
          fit: strong
  Content
    OGN: ogn-mbr-signup-summary
      layoutStrategy:
        widthTier: content-361
        stack: key-value
        alignment: split
        overflow: split row when value is long; do not compress label column
      layoutContract:
        role: result summary
        structure: card + key-value rows
        density: matches summary card reference
        distortionRisk: value column compresses or card treatment disappears
      componentCandidates:
        - name: key-value summary organism
          source: existing complete reference
          fit: strong
        - name: RQRSummaryKeyValue
          source: new candidate
          fit: medium
          reason: use if existing list vocabulary cannot hold multiline values without column drift
    SectionDivider
    OGN: ogn-mbr-complete-benefit
      layoutStrategy:
        widthTier: section-369
        stack: vertical
        overflow: keep card height inside scroll content; never hide behind Bottom
      layoutContract:
        role: benefit notice
        structure: card or callout with title/body
        distortionRisk: benefit card hides behind Bottom or becomes a loose text block
      componentCandidates:
        - name: Callout/CardSection
          source: cx-components
          fit: medium
        - name: RQRBenefitNotice
          source: new candidate
          fit: medium
  Bottom
    SinglePrimaryAction
      secondary: TextButton or ActionButton
      primary: ActionButton
      layoutStrategy:
        widthTier: content-361
        stack: horizontal
        wrapping: button label max 1 line
```
