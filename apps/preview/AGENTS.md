# apps/preview

shadcn/Tailwind 기반 브라우저 프리뷰 셸이다. WDS 모바일 화면을 직접 import하지 않고 `@pxds/pxds-preview`의 iframe helper로 띄운다. 기본 mobile origin은 `NEXT_PUBLIC_MOBILE_ORIGIN` 또는 `http://localhost:3001`이다.

## 역할

- screen/page registry 탐색
- component registry 탐색
- policy/spec 조회 UI
- mobile route iframe preview
- component render iframe preview
- Figma export / Figma MCP 요청 workflow 생성

## 구조

- `(preview)/layout.tsx`는 `PreviewProviders`, `PreviewShell`, 좌측 `PreviewNavigationRail`, route children, 우측 `PreviewActionRail`을 배치한다.
- 좌측 icon rail은 `components`, `pages`, `policies`로 이동한다.
- side panel은 registry 탐색과 선택 상태만 담당한다.
- render view는 page/component/policy 별로 분리한다.
- provider/context는 page registry와 component registry를 분리한다.
- registry 조회 로직은 utils + hook 조합으로 둔다. page/component/spec 책임을 한 hook에 섞지 않는다.

## PreviewPage 구조

프리뷰 셸의 main wrapper는 과한 추상화 대신 아래 구조가 읽히게 둔다.

```tsx
<PreviewPage>
  <PreviewSidebar />
  <PreviewRenderView />
</PreviewPage>
```

`PreviewWorkspace`처럼 의미가 넓고 책임이 흐린 이름은 피한다.

## Figma workflow

- 브라우저에서 Figma MCP를 직접 호출하지 않는다.
- 버튼은 요청 세트를 생성한다: `artifacts/figma-mcp-requests/{requestId}/`.
- 생성물:
  - `request.json`
  - `codex-prompt.md`
  - 가능한 경우 `figma-plugin.js`
- `figma-plugin.js`가 있으면 Codex가 Figma MCP `use_figma`로 실행할 수 있다.
- `figma-plugin.js`가 없으면 preview/mobile URL을 Figma capture workflow로 넘긴다.
- Figma capture는 iframe 내부를 파싱하지 못한다. 비교용 캡처가 필요하면 mobile app 자체 route를 capture mode로 열고 `AppScreenRoot` selector를 잡는다.

## UI 원칙

- preview는 도구 UI다. 마케팅/landing page처럼 만들지 않는다.
- 좌우 rail, side panel, render view의 책임을 유지한다.
- icon button에는 tooltip/title/aria-label을 제공한다.
- component/page/policy 레지스트리는 라이브러리처럼 탐색 가능해야 한다.

## 검증

- `npm run lint -w @screen/preview`
- `npm run build -w @screen/preview`
