# @screen/evaluation

screen generation benchmark/audit SSOT다.

## 책임

- 디자인/기획 평가 항목
- benchmark API refs
- 1~5 scoring hint
- audit formatter

## 원칙

- 평가 로직은 route registry나 render runtime에 섞지 않는다.
- strain signal은 component vocabulary, token consistency, layout ownership 관점으로 기록한다.
- active spec validation 입력은 `@screen/mobile/screens`에서 읽고, 평가/점수화는 이 패키지가 담당한다.
