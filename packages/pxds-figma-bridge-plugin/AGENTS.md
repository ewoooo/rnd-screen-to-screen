# @pxds/pxds-figma-bridge-plugin

Figma desktop plugin bundle이다. 손작업 Figma 노드에서 component spec JSON을 추출하거나, 생성된 build code를 Figma에서 실행하는 브릿지 UI를 제공한다.

## 규칙

- plugin sandbox 호환성을 우선한다.
- manifest network access는 필요한 localhost/tool endpoint만 허용한다.
- UI copy는 작업 흐름 중심으로 짧게 유지한다.
- `@pxds/pxds-figma`의 생성/정규화 로직을 재사용하고, plugin 전용 UI 상태와 핵심 spec 로직을 섞지 않는다.
