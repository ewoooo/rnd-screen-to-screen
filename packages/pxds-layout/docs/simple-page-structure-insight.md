# Simple page structure insight

## 목적

이 문서는 실제 모바일 화면을 Figma SOT에 맞추며 얻은 설계 인사이트를 기록한다. 핵심은 `pxds-layout`이 복잡한 자유 배치 엔진이 아니라, 제한된 layout vocabulary로 단순한 화면 구조를 안정적으로 반복하게 만드는 시스템이어야 한다는 점이다.

## 당시 시도

초기 접근은 Figma 화면을 최대한 정밀하게 맞추기 위해 여러 layout abstraction을 늘리는 방향이었다.

- 화면별 padding, inset, section spacing을 세밀하게 보정하려 했다.
- `PageStackContents`, `PageStackList`, `ContentSection`, `FieldStack`, action area의 책임 경계가 겹쳤다.
- Figma SOT와 화면 렌더 차이를 픽셀 단위 문제로 먼저 보았다.
- 이미 있는 layout component를 쓰지 않거나, 비슷한 역할의 wrapper가 충돌하는 문제가 생겼다.

이 접근은 단기적으로 수치를 맞출 수 있지만, AI가 화면을 자동 생성할 때 같은 구조를 반복하기 어렵다. 화면이 늘수록 route마다 임의 보정이 쌓일 위험이 있다.

## 실제 케이스에서 확인한 것

Figma SOT의 `상세_정보 입력_인풋` 화면은 생각보다 단순했다.

```txt
AppScreen
  SystemHeader
  Header
  Content
    PageStackContents
      title
      content
        FieldStack
    SectionDivider
    PageStackContents
      title
      content
    SectionDivider
    PageStackContents
      title
      content
        FieldStack
  Bottom
    SinglePrimaryAction
```

중요한 구조는 자유로운 좌표 배치가 아니었다.

- 화면은 `AppScreen` 안의 vertical flow다.
- 본문은 section 단위로 반복된다.
- section은 `title slot`, `content slot`, 필요 시 `divider`로 충분히 설명된다.
- 입력 필드 묶음은 별도 layout engine이 아니라 `FieldStack`이다.
- 하단 CTA는 본문이 아니라 `Bottom` 또는 `action-area`로 분리되어야 한다.

즉, Figma SOT를 맞추는 핵심은 개별 좌표를 route에서 보정하는 일이 아니었다. 올바른 pattern boundary와 slot 이름을 코드에 남기는 일이었다.

## 배운 점

### 1. 화면 구조는 복잡한 tree가 아니라 이름 붙은 slot의 반복이다

대부분의 모바일 화면은 아래 조합으로 내려간다.

```txt
Screen -> Chrome -> Section -> Slot -> Stack -> Component
```

이 구조를 넘는 abstraction은 먼저 의심해야 한다. 새 wrapper가 필요해 보이면, 실제로는 기존 `Slot`, `VStack`, `FieldStack`, `SectionDivider`의 이름이 부족한 것일 수 있다.

### 2. primitive는 시각을 새로 만드는 도구가 아니다

`Box`, `VStack`, `Slot`은 기존 시각 CSS를 대체하기 위한 디자인 표현 계층이 아니다. 이들은 DOM 구조에 layout 의미를 부여하는 얇은 syntax sugar다.

이번 검증에서 기존 className을 유지한 채 아래 치환이 화면을 깨지 않았다.

- `ContentList`: 직접 `div + flex column` -> `VStack`
- `SinglePrimaryAction`: wrapper/action div -> `Box + Slot`
- `FieldStack`: wrapper/content div -> `Box + Slot`
- `PageStackList`: section/title/content div -> `Box + Slot`
- `PageStack`: pattern parts -> `Box + Slot`
- `SectionDivider`: div -> `Box`

이 결과는 primitive 적용의 방향을 보여준다. primitive가 layout을 새로 결정하면 위험하고, 기존 contract를 같은 DOM 형태로 표현하면 안전하다.

### 3. Figma bridge에는 좌표보다 의도가 중요하다

Figma 변환기가 알아야 하는 정보는 `x=12`, `width=369` 같은 수치만이 아니다. 더 중요한 정보는 아래와 같다.

- 이 노드가 `screen`, `content`, `section`, `field-stack`, `action-area` 중 무엇인가
- Auto Layout인지 아닌지
- 방향이 vertical인지 horizontal인지
- 어떤 slot인지
- 어떤 semantic preset이나 property를 갖는지

그래서 `data-figma-layout-kind`, `data-figma-layout-layer`, `data-figma-layout-slot`이 필요하다. 이 attribute는 AI와 Figma bridge가 같은 화면 문법을 공유하게 만든다.

## 앞으로의 설계 원칙

새 layout component를 만들기 전에 아래 질문을 먼저 확인한다.

1. 기존 `AppScreen`, `PageStackContents`, `FieldStack`, `SinglePrimaryAction`, `SectionDivider`, `Slot` 조합으로 표현 가능한가?
2. 필요한 것은 새 레이아웃인가, 아니면 기존 slot의 더 정확한 이름인가?
3. CSS class를 유지한 채 `Box`, `VStack`, `Slot`으로 의미만 표준화할 수 있는가?
4. route에서 spacing을 보정하고 있다면, 그 값은 layout package의 pattern contract로 올라가야 하지 않는가?
5. Figma bridge가 이 구조를 읽었을 때 화면 layer와 slot을 복원할 수 있는가?

## 결론

`pxds-layout`의 목표는 복잡한 화면을 더 복잡한 API로 감싸는 것이 아니다. 실제 Figma SOT에서 반복되는 단순한 구조를 정확한 이름과 slot으로 고정하는 것이다.

AI가 쉽게 쓸 수 있는 API는 많은 옵션을 가진 API가 아니다. 화면을 아래처럼 자연스럽게 쓸 수 있게 하는 API다.

```tsx
<AppScreen>
  <AppScreen.SystemHeader />
  <AppScreen.Header>{header}</AppScreen.Header>
  <AppScreen.Content>
    <PageStackContents title={title}>
      <FieldStack>{fields}</FieldStack>
    </PageStackContents>
    <SectionDivider />
  </AppScreen.Content>
  <AppScreen.Bottom>
    <SinglePrimaryAction>{action}</SinglePrimaryAction>
  </AppScreen.Bottom>
</AppScreen>
```

이 단순함이 Figma SOT 재현성, 자동 생성 안정성, 화면 간 pattern 일관성을 동시에 만든다.
