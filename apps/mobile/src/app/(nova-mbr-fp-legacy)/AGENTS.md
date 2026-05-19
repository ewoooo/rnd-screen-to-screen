# NOVA-MBR-FP Legacy Screens

이 폴더의 `NOVA-MBR-FP-*` 화면은 **retired legacy reference**다.

- 신규 화면 생성, 디자인 기준, 컴포넌트 조합 기준으로 사용하지 않는다.
- 기존 route는 비교/회귀 확인을 위해 유지한다.
- 구조나 디자인을 개선해야 하면 이 폴더를 직접 고도화하지 말고 새 화면 계약(`Screen.map.md` → `Screen.diagram.html` → `Screen.tsx`)을 다시 만든다.
- 이 폴더의 `Screen.diagram.html`, `Screen.config.ts`, `Screen.tsx`는 이전 FP 생성 결과의 기록으로만 취급한다.
- 인접 OGN은 `apps/mobile/src/organisms/nova-mbr-fp-legacy/AGENTS.md`의 legacy 규칙을 따른다.
