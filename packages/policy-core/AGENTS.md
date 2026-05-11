# @policy/core

Policy / UseCase 순수 문서 도메인이다.

## 원칙

- Screen, route, component, UI runtime을 모른다.
- 정책서 원문, use case, section, evidence reference 같은 순수 문서 개념만 소유한다.
- 정책서 parsing이나 screen 도출 trace는 `@policy/authoring` 경계로 넘긴다.
