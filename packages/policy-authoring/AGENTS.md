# @policy/authoring

정책서/문서에서 Screen이 도출되는 과정을 추적한다.

## 책임

- `PolicySourceRef`
- `PolicyToScreenTrace`
- `policyToScreenTraces`
- `policy_doc`, `policy_section`, `pagination_ref`, `x_policyExtract` 같은 출처 정보 해석

## 규칙

- 순수 정책 모델은 `@policy/core`에 둔다.
- screen contract/renderable spec과 route registry 정보는 page-local SOT를 재노출하는 `@screen/mobile/screens`에서 읽는다.
- 원문 근거 없는 요약을 screen contract 근거로 쓰지 않는다.
