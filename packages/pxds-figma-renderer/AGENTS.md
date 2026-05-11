# @pxds/pxds-figma-renderer

Figma export/spec 렌더링 보조 패키지다. Figma code generation에서 필요한 순수 renderer 유틸을 둔다.

## 규칙

- React app runtime이나 Next.js에 의존하지 않는다.
- token은 `@pxds/pxds-tokens`, primitive/component 해석은 `@pxds/pxds-components` 경계를 따른다.
- Figma plugin/MCP 실행 환경에 들어갈 수 있는 순수하고 직렬화 가능한 로직을 우선한다.
