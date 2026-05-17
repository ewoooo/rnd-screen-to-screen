# apps/preview

shadcn/Tailwind 기반 브라우저 프리뷰 셸이다. WDS 모바일 화면을 직접 import하지 않고 앱 내부 iframe helper로 띄운다. 기본 mobile origin은 `NEXT_PUBLIC_MOBILE_ORIGIN` 또는 `http://localhost:3001`이다.

## 역할

- screen/screen registry 탐색
- component registry 탐색
- policy/spec 조회 UI
- mobile route iframe preview
- component render iframe preview
- Figma export / Figma MCP 요청 workflow 생성
- screen generation 산출물이 `DESIGN_FOUNDATION.md`, `DESIGN_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`를 확인했는지 탐색/검증할 수 있게 한다.

## 구조

- `(preview)/layout.tsx`는 `PreviewProviders`, `PreviewShell`, 좌측 `PreviewNavigationRail`, route children, 우측 `PreviewActionRail`을 배치한다.
- 좌측 icon rail은 `components`, `screens`, `policies`로 이동한다.
- side panel은 registry 탐색과 선택 상태만 담당한다.
- render view는 screen/component/policy 별로 분리한다.
- provider/context는 screen registry와 component registry를 분리한다.
- registry 조회 로직은 utils + hook 조합으로 둔다. screen/component/spec 책임을 한 hook에 섞지 않는다.

## PreviewScreen 구조

프리뷰 셸의 main wrapper는 과한 추상화 대신 아래 구조가 읽히게 둔다.

```tsx
<PreviewScreen>
  <PreviewSidebar />
  <PreviewRenderView />
</PreviewScreen>
```

`PreviewWorkspace`처럼 의미가 넓고 책임이 흐린 이름은 피한다.

## Figma workflow

- 오른쪽 action rail은 내보내기만 담당한다.
- 토큰은 Tokens Studio JSON으로 내보낸다. Variables와 Text Styles는 Tokens Studio 쪽 export 기능으로 일원화한다.
- 컴포넌트와 페이지는 Figma plugin JS를 생성한다.
- Figma capture는 iframe 내부를 파싱하지 못한다. 비교용 캡처가 필요하면 mobile app 자체 route를 capture mode로 열고 `AppScreenRoot` selector를 잡는다.
- export/capture UI는 `Component -> Pattern -> Organism -> Screen` 계층을 보존하는 metadata를 우선 보여준다. raw pixel capture는 비교 evidence일 뿐 구조화 export의 대체물이 아니다.

## UI 원칙

- preview는 도구 UI다. 마케팅/landingscreen처럼 만들지 않는다.
- 좌우 rail, side panel, render view의 책임을 유지한다.
- icon button에는 tooltip/title/aria-label을 제공한다.
- component/screen/policy 레지스트리는 라이브러리처럼 탐색 가능해야 한다.

## 검증

- `npm run lint -w @screen/preview`
- `npm run build -w @screen/preview`
