# 스크린 생성 절차 간소화 — 설계 (Design Spec)

- 작성일: 2026-05-16
- 상태: 승인됨 (구현 계획 대기)
- 범위: 절차 문서 재구성. 화면 코드/스크립트 로직 변경 없음.

## 1. 배경과 문제

스크린 생성 절차는 현재 두 SOT 문서에 정의돼 있다.

- `SCREEN_GENERATION_FLOW.md` — SB 첨부 → 생성까지 13개 서술형 단계
- `SCREEN_STRUCTURE_PRINCIPLES.md` — `Screen → Chrome → Section → Slot → Stack → Component` 구조 원칙과 Layout Distortion Gate

확인된 문제는 세 가지다.

1. **검증 오버헤드** — 절차 안에 `lint` / `build` / `check:compliance` + policy 3스크립트 의식이 섞여 있어, 생성 작업과 검증 책임이 한 흐름에 뒤엉킨다.
2. **책임 미분리** — 단계별로 "어떤 문서를 참고해야 하는가"가 흐릿하다. 2단계는 "SOT 6종 전부 조회"라는 포괄 요구로 돼 있고, FLOW와 STRUCTURE_PRINCIPLES가 체크리스트·예시를 중복 서술한다.
3. **산출물 문서-실제 갭** — FLOW는 화면 폴더에 `Screen.diagram.md`를 의무 산출물로 규정하지만, 실제 4개 화면(`NOVA-MBR-PG-001/002/003/005`)에는 존재하지 않는다. 절차가 정의돼 있으나 강제·영속되지 않는다.

## 2. 목표

- **간소화**: 13개 서술형 단계 → 5개 책임 페이즈.
- **책임 분리**: 절차 문서는 "**언제 / 무엇을 / 어떤 문서 보고**"만 말한다. 참고 문서의 내용을 절차 문서가 다시 서술하지 않는다.
- **검증 분리**: 검증은 페이즈가 아니다. `AGENTS.md` 공통 검증 + `check:*` 스크립트가 단독 소유하는 절차 밖 게이트.

규칙: **모든 화면은 `Screen.diagram.md`를 가져야 한다.** 신규/기존 구분 없이 의무다. 단, 기존 4개 화면(`NOVA-MBR-PG-001/002/003/005`)의 백필은 이 절차 재구성과 분리된 **확정된 후속 작업**으로 시퀀싱한다(섹션 8).

비목표(YAGNI):

- 이 구현에서 기존 4개 화면 백필 실행 — 하지 않는다(규칙은 모든 화면 의무, 백필은 후속 작업).
- `check:*` 스크립트 로직 변경 — 하지 않는다.
- 검증 항목 자체 축소 — 하지 않는다(위치만 분리).
- 신규 `VERIFICATION.md` 생성 — 하지 않는다.

## 3. 핵심 원칙

> 절차 문서는 얇은 계약서다. 참고 문서는 그대로 깊게 둔다.

절차 문서(`SCREEN_GENERATION_FLOW.md`)는 페이즈 흐름과 책임 매핑만 소유한다. 구조 원칙·패턴·spacing·foundation·검증은 각 참고 문서가 단독 소유하며, 절차 문서는 이를 가리키기만 한다(재서술 금지).

## 4. 5페이즈 계약

각 페이즈 = 단일 책임 / 진입조건 / 고정 참고문서 / 단일 산출물 / 완료조건(DoD).

DoD는 검증이 아니라 "이 산출물이 내적으로 완성되어 다음 페이즈로 넘어갈 수 있는가"의 자체 판단 기준이다. `lint`/`build`/`check:*`는 DoD가 아니다.

| Phase | 책임 (단일) | 참고 문서 (고정) | 산출물 | 완료조건 (DoD) |
|---|---|---|---|---|
| **1 · Extract** | SB → 화면ID·도메인·과업·상태·CTA·정책태그·도메인모듈ID/OGN ID·slot/part/hierarchy 추출 | SB (입력) | 추출 요약 | 화면ID·도메인·OGN ID·정책태그 누락 0으로 목록화 |
| **2 · Map** | 정책 필수정보/선택지/제약/에러/sourceRef → 화면 요구 매트릭스, 사용자 copy 분리 | `packages/policy-core/policies/**/*.md`, `*.policy.ts` | 정책-화면 요구사항 매트릭스 | 모든 정책태그가 화면 정보/CTA/에러로 매핑. 누락 시 다음 페이즈 진입 금지 |
| **3 · Diagram** | 화면 패턴 결정 + OGN별 layoutStrategy + reuse/new 분기 + SB 기반 Diagram, Layout Distortion Gate 자체 통과 | `DESIGN_PATTERNS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`, `SPACING_PATTERNS.md` | `Screen.diagram.md` (모든 화면 의무) | `Screen→Chrome→Section→Slot→Stack→Component`로 설명, OGN별 layoutStrategy·정책연결·reuse/new 표기 |
| **4 · Build** | 정책서 OGN 제작/보강 + `Screen.tsx` 조립 + `Screen.config.ts`(생성근거 포함) | `DESIGN_FOUNDATION.md`, `@pxds/cx-components`, `@pxds/cx-icons`, `@pxds/cx-tokens`, `@pxds/pxds-layout` | `apps/mobile/src/organisms/<domain>/<ogn>/`, `Screen.tsx`, `Screen.config.ts` | Diagram의 모든 OGN/슬롯이 코드에 존재, `config.generation` 블록 채워짐 |
| **5 · Register** | route catalog 등록 + preview 노출 확인 | `apps/mobile/src/scripts/screen-routes/` | `routes.ts` 등록 항목 | route 등록 + preview iframe에서 해당 route 진입 가능 |

페이즈 이후 `lint` / `build` / `check:*`는 **페이즈 밖**의 공통 검증 게이트(섹션 5)가 실행한다.

### 4.1 페이즈 매핑 (기존 13단계 → 5페이즈)

추적성 확보용. 기존 13단계가 어느 페이즈로 흡수되는지 명시한다.

- 기존 1 → Phase 1
- 기존 2(SOT 6종 조회) → 해체. 페이즈별 고정 참고문서로 분산(2단계 포괄 요구 제거)
- 기존 3 → Phase 2
- 기존 4·5·6·7·8 → Phase 3 (패턴 결정 + layoutStrategy + reuse/new + Diagram + Distortion Gate)
- 기존 9·10·11 → Phase 4
- 기존 11(route)·12(preview) → Phase 5
- 기존 13(검증) + 220~231줄 검증 서술 → 절차 밖 공통 검증 게이트로 이동

## 5. 검증 분리

검증은 절차 페이즈가 아니다. `AGENTS.md`/`CLAUDE.md`의 `공통 검증` 섹션과 `@policy/core`의 `check:*` 스크립트가 단독 소유한다.

- `npm run lint -w @screen/mobile`, `npm run build -w @screen/mobile`
- `npm run check:policy-source -w @policy/core`
- `npm run check:screen-generation -w @policy/core` / `:strict`

`SCREEN_GENERATION_FLOW.md`는 이 게이트를 **포인터 한 줄**로만 가리킨다("검증은 절차 밖 공통 검증 게이트가 소유 → AGENTS.md 공통 검증 참조"). 검증 절차 서술을 절차 문서에 두지 않는다.

`Screen.diagram.md`는 **모든 화면 의무**다. 신규 화면은 Phase 3에서 즉시 생성한다. 기존 4개 화면은 현재 미충족 상태이며, 백필은 확정된 후속 작업(섹션 8)으로 분리 실행한다. 백필 완료 전까지 `check:screen-generation`의 기존-화면 adoption warning 동작은 그대로 두고(스크립트 로직 변경 없음), `:strict` 게이트는 신규 화면에만 적용한다.

## 6. 문서 책임 분리 맵

| 문서 | 단독 소유 책임 | 재서술 금지 |
|---|---|---|
| `SCREEN_GENERATION_FLOW.md` | 5페이즈 계약 + 책임 매핑 테이블 (when/what/which-doc) | 구조원칙·패턴·spacing·foundation·검증 서술 |
| `SCREEN_STRUCTURE_PRINCIPLES.md` | Phase 3 깊은 참고: 구조 원칙·Diagram 작성·layoutStrategy·Layout Distortion Gate | — (FLOW에서 중복 제거 → 여기로 단일화) |
| `DESIGN_PATTERNS.md` / `DESIGN_FOUNDATION.md` / `SPACING_PATTERNS.md` | Phase 3/4 시각·패턴·spacing 참고 | — |
| `packages/policy-core/policies` | Phase 2 정책 원천 | — |
| `AGENTS.md` 공통 검증 + `check:*` | 검증 전체 (절차 밖 게이트) | — |
| `CLAUDE.md`(= `AGENTS.md` symlink) | SOT 우선순위·패키지 지도 | 절차 재서술 (FLOW 포인터만) |

## 7. 구체적 파일 변경

1. **`SCREEN_GENERATION_FLOW.md`** — 전면 재작성.
   - 5페이즈 계약 테이블(섹션 4) + 페이즈 매핑(섹션 4.1) + "검증은 절차 밖 게이트" 포인터 1줄.
   - 기존 13단계 서술형 본문(60~218줄)과 검증 서술(220~231줄) 삭제.
   - `Screen.diagram.md` 의무를 "모든 화면"으로 명시(기존 4개 미충족은 섹션 8 후속 백필로 시퀀싱).
   - mermaid flowchart를 5페이즈 흐름으로 축소.
   - 생성 산출물 폴더 구조(`Screen.tsx`/`Screen.config.ts`/`Screen.diagram.md`)와 `screenConfig` 예시는 Phase 3/4 산출물 정의로 유지(중복 아닌 산출물 계약).
2. **`SCREEN_STRUCTURE_PRINCIPLES.md`** — 거의 유지. 문서 상단에 "이 문서가 Phase 3 구조/Diagram/layoutStrategy/Distortion Gate 책임을 단독 소유한다" 한 줄 추가. 본문 구조 변경 없음.
3. **`CLAUDE.md`(= `AGENTS.md` symlink)** —
   - "정책서 기반 화면 생성 흐름" 12항목 → 5페이즈 요약 + `SCREEN_GENERATION_FLOW.md` 포인터로 축소(절차 재서술 제거).
   - "공통 검증" 섹션 유지하되 "검증은 절차 밖 게이트"임을 명시 강화.
   - "SOT 우선순위" 목록의 `SCREEN_GENERATION_FLOW.md` 설명을 "5페이즈 절차 계약"으로 갱신.
   - `CLAUDE.md` 문서 지도에 `AGENTS.md`는 `CLAUDE.md`의 symlink로 명시돼 있으므로 한 파일만 수정한다(구현 첫 단계에서 `ls -l`로 재확인).
4. **기존 4개 화면 / `check:*` 스크립트** — 이 구현에서는 변경 없음(규칙만 "모든 화면 의무"로 문서화, 4개 백필은 섹션 8 후속 작업).

## 8. Follow-up (이번 구현 범위 밖, 확정된 후속 작업)

- **[확정] 기존 4개 화면 Diagram 백필** — `NOVA-MBR-PG-001/002/003/005` 각 화면을 `SCREEN_STRUCTURE_PRINCIPLES.md` 기준으로 역공학해 `Screen.diagram.md`를 작성한다. "모든 화면 의무" 규칙을 기존 화면까지 충족시키는 별도 워크스트림. 이 절차 재구성 PR과 분리하되, 절차 확정 직후 진행한다.
- 백필 완료 후 `check:screen-generation:strict`를 전체 화면에 강제하는 CI 게이트 도입 검토(완료 전까지 기존 화면은 warning 유지).

## 9. 위험과 대응

- **위험**: `CLAUDE.md` 문서 지도는 `AGENTS.md`가 symlink라고 명시하나 실제 파일 상태가 다를 수 있음. **대응**: 구현 첫 단계에서 `ls -l`로 재확인 후, symlink면 한 파일만 수정.
- **위험**: FLOW 본문 삭제로 기존 절차를 따르던 작업자/에이전트의 컨텍스트 단절. **대응**: 섹션 4.1 페이즈 매핑 테이블을 FLOW에 포함해 13단계 → 5페이즈 추적성 보존.
- **위험**: 검증 서술 이전 후 `check:*` 명령을 찾기 어려워짐. **대응**: FLOW 포인터 줄에 `AGENTS.md 공통 검증` 정확한 위치를 명시.
- **위험**: "모든 화면 의무" 규칙 확정과 기존 4개 백필 사이에 규칙-현실 불일치 윈도우 발생. **대응**: 백필 완료 전까지 기존 화면은 adoption warning 유지, `:strict` 게이트는 신규 화면에만 적용(섹션 5·8). 후속 백필을 절차 확정 직후 즉시 진행해 윈도우를 최소화.
