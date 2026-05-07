# billing-from-html (실험)

HTML 정책서 입력으로부터 billing spec을 추출하는 실험 산출물.

- **소스**: `docs/정책서-Full-청구관리및요금수납_정책서.html`
- **비교 대상**: `packages/screens/spec/active/billing/` (MD 입력 기반, SSOT)
- **브랜치**: `experiment/billing-spec-from-html`

## 격리 규약

- 이 폴더는 `packages/screens/src/index.ts` / `active-specs.ts` / `_manifest.json` 어디에도 등록하지 않는다.
- mobile 앱은 이 폴더를 import 하지 않는다.
- 파일명은 active와 동일하게 유지하여 `diff`로 직접 비교 가능하게 한다.
- 실험 결과 active 채택 결정 시, 명시적인 이관 단계를 거친다 (이 폴더에서 `active/billing/`로 직접 덮어쓰기 금지).
