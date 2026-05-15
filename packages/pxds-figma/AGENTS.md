# @pxds/pxds-figma

Figma bridge, hooks, variables sync, component/screen export, spec authoring을 소유한다. 별도 `figma-export` 앱을 두지 않고 순수 bridge/hook 기능은 이 패키지에 둔다.

## 책임

- Figma Variables sync code 생성
- Tokens Studio export hook
- component spec registry와 component plugin build code
- screen export spec과 screen build code
- Figma capture helper hook
- Figma URL → component source parsing

## 경계

- 브라우저 앱에서 Figma MCP를 직접 호출하지 않는다. preview 앱은 요청/코드 artifact를 만들고, Codex가 Figma MCP를 실행한다.
- Figma plugin code는 가능한 독립 실행 가능한 JS로 생성한다.
- `figma.notify` 등 Figma MCP `use_figma`에서 지원되지 않는 API를 MCP 실행 코드에 그대로 쓰지 않도록 주의한다. Figma plugin UI용 코드와 MCP 실행용 코드는 요구사항이 다를 수 있다.
- component/screen spec은 codebase vocabulary와 연결되어야 한다. raw pixel capture는 비교/레퍼런스이며 최종 구조화 export의 대체물이 아니다.
- screen export는 `Component -> Pattern -> Organism -> Screen` 계층을 보존해야 한다. 기초 component가 route-level pixel 배치로 평탄화되면 실패로 본다.
- spacing은 `DESIGN_FOUNDATION.md` token과 `SPACING_PATTERNS.md` 운영 규칙으로 해석한다. Figma 좌표/실측값은 evidence이며, codegen이 임의 token이나 route-level raw padding을 만들 근거가 아니다.

## Capture

Figma export/capture는 preview 또는 별도 export 앱 경계에서 처리한다. `apps/mobile` route에 capture script나 export bridge를 주입하지 않는다.
