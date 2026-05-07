# Authoring notes — billing-from-html (independent run)

원본: `docs/정책서-Full-청구관리및요금수납_정책서.html` (HTML만 참조). active billing spec, organisms/billing 등은 일절 보지 않음.

## 5 key decisions

### 1. US-CHK-001(요약)을 단일 화면으로 통합 — PR-001-03(다음 행동 분기)을 별도 라우트 분리 안 함
- HTML 1325–1357의 PR-BIL-CHK-001-01/02/03 표를 보면 03(다음 행동 분기)는 "청구 상세·납부 대상·납부 이력·미납 해소" 4종을 추천하는 inline 안내다. 정책서 자체에 별도 단계라는 신호 없음 — 같은 요약 컨텍스트에서 추천 path로 표현.
- 결과: `billing-html-summary` 한 화면 안에 `BillingNextActions` (InfoList trailing=action) 섹션으로 4 분기 노출.

### 2. US-CHK-002(상세)도 단일 화면 — PR-002-03(이의·문의 후속 연결)을 별도 라우트 분리 안 함
- HTML 1387–1390에서 03은 "관련 항목을 기준으로 문의 또는 운영 확인 요청을 시작할 수 있게 연결"한다고 정의. detail 화면의 후속 행동에 가깝다.
- 결과: `billing-html-detail` 화면 하단에 `BillingInquiryActions` 섹션 (Button inline-pair) 으로 통합. 별도 modal/route 안 만듦.

### 3. genre 결정 — summary=browse / detail=detail. progress 어휘 미사용
- HTML 어디에도 step fraction(예: "1/4") 또는 multi-step flow 신호 없음. 청구 확인은 dashboard 성격.
- membership 계열의 `progress_location: top-bar-thin`를 가져오지 않고 `none`으로 둠. CLAUDE.md H-6 룰을 의식하며 의도적으로 진입.

### 4. 새 organism 어휘 7개를 명시적으로 strain signal로 기록
- 기존 molecule(SectionCard, SummaryCard, InfoList, NoticeBlock)만으로 본문은 표현 가능하지만, 도메인 의미 단어(회선 셀렉터, 요약 카드, 다음 행동, 변동 사유, 이의 액션, 항목 분해, 컨텍스트 헤더)는 organism 이름으로만 잡힘.
- `design_system_contract.new_vocabulary_required`에 7개 organism 후보 — `BillingLineSelector / BillingSummaryCard / BillingNextActions / BillingDetailHeader / BillingItemBreakdown / BillingChangeReasonList / BillingInquiryActions` — 를 신규 어휘로 명시.
- 신규 도입은 strain signal이지만 active 비교 시 이름·경계가 어떻게 다른지가 측정 포인트.

### 5. evidence_refs는 HTML line range 기반으로 박음 (POL-* 부재 대응)
- HTML에는 정책 ID(POL-BIL-…)나 별도 정책 sub-clause 섹션 없음. 정책서 전체에 "관련 정책" 컬럼이 자연어 이름(예: "청구 변동 사유 안내 정책")으로만 존재.
- 그래서 `evidence_refs[].source_ref`는 `html#L<line>` 형식으로 HTML 라인 좌표를 사용. 처음 expected했던 POL-* sub-clause cross-ref는 입력에 없으므로 자연어 이름을 `related_policies`에 그대로 보존.
- 이 차이가 active spec과 큰 비교 포인트가 될 가능성 있음 — active는 MD에서 POL-* 가져왔을 수 있고 HTML 버전은 그게 안 보임.

## 추가 메모
- `domain: "billing-html"` / `status: "experimental-html-independent"`는 ScreenSpecV2 typed enum에 없음. 실험용이고 registry 등록 대상이 아니므로 JSON 텍스트 형태로만 보존. type 컴파일에서 빠진 위치이기 때문에 lint 실행 시 `getScreenSpecIssues` 등을 돌리면 fail 가능 — 의도된 격리.
- `step_fraction: null`이지만 hash guard 가짜 키 추가하지 않음. canonical pagination 파일 hash는 sha256으로 생성 후 두 sdui.json 모두에 그대로 박음 (`d04ce664…098f`).
- raw style·className·route margin 일절 사용 안 함 (H-12 통과). description은 `ContentRail measure:body` 어휘로만 제한.
- shell은 둘 다 `AppScreen`. summary는 GNB까지 노출(허브 진입에 가까움), detail은 drill-down이라 GNB 생략.
