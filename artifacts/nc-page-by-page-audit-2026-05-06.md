# NC Page-by-Page Spec / Render Audit — 2026-05-06

범위: `nc-full`, `nc-simple` active spec 32개와 대응 `.sdui.json` 렌더 트리.

검수 질문: 각 페이지별로 설계서 기준, 스펙, 렌더가 어디는 잘 맞고 어디는 안 맞는가?

주의: 이 문서는 계약 검수다. 실제 브라우저 스크린샷 픽셀 검수는 별도다.

## 요약

| 도메인 | 총 화면 | 잘 맞음 | 확인 필요 | 안 맞음 |
|---|---:|---:|---:|---:|
| nc-full | 16 | 0 | 0 | 16 |
| nc-simple | 16 | 0 | 9 | 7 |

## 읽는 법

- `잘 맞는 점`: 설계 의도나 위계가 스펙 area와 렌더 node로 이어지는 부분.
- `안 맞는 점`: 신규 시스템 어휘, 렌더에 직접 드러나지 않는 component, raw style/class 같은 계약 차이.
- `확인할 것`: 실제 렌더가 틀렸다는 뜻은 아니지만, 스펙과 렌더 명칭이 달라 회의 전에 정리해야 하는 부분.

## nc-full · 본인인증 (휴면 해제) (/nc-full-dormancy-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 인증 수단 선택<br>위계: hero, required-input, supporting-notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, methods:molecules/SelectableList, policy-notice:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: methods: SelectableList

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; methods:ContentSection; methods:Chip; policy-notice:ContentSection; policy-notice:NoticeBlock; policy-notice:TextBlock; continue:Box; continue:Button; continue:TextBlock
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| methods | content | molecules/SelectableList | ContentSection, SelectableList, Chip | SelectableList | ContentSection, Chip |
| policy-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 로그인 (휴면 진입) (/nc-full-dormancy-login)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 로그인<br>위계: hero, required-input, supporting-notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, form:organisms/nc/NcLoginForm, notice:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcLoginForm, NcNotice |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcLoginForm

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; form:ContentSection; form:FormField; form:TextField; notice:ContentSection; notice:NoticeBlock; notice:TextBlock; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| form | content | organisms/nc/NcLoginForm | ContentSection, FormField, TextField | - | ContentSection, FormField, TextField |
| notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 휴면 해제 완료 (/nc-full-dormancy-result)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 결과 인지 + 다음 행동<br>위계: hero, result-summary, supporting-notice, actions<br>CTA: bottom-sticky<br>Progress: none |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, summary:organisms/nc/NcSummaryCard, session-notice:organisms/nc/NcNotice, actions:organisms/nc/NcResultActions |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, NcSummaryCard |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 none로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; hero:ContentSection; hero:TextBlock; hero:ContentRail; summary:ContentSection; summary:SummaryCard; summary:InfoList; summary:TextBlock; session-notice:ContentSection; session-notice:NoticeBlock; session-notice:TextBlock; actions:Box; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation | - | StatusBar, TopNavigation |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| summary | content | organisms/nc/NcSummaryCard | ContentSection, SummaryCard, InfoList, TextBlock | - | ContentSection, SummaryCard, InfoList, TextBlock |
| session-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| actions | bottom | organisms/nc/NcResultActions | Box, Button | - | Box, Button |

## nc-full · 약관 재동의 (휴면 해제) (/nc-full-dormancy-terms)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 재동의 대상 약관 동의<br>위계: hero, required-input, conditional-notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, terms:organisms/nc/TermsAgreementGroup, change-notice:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, TermsAgreementGroup |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; terms:ContentSection; terms:SectionCard; terms:ConsentList; terms:TextBlock; change-notice:ContentSection; change-notice:NoticeBlock; change-notice:TextBlock; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| terms | content | organisms/nc/TermsAgreementGroup | ContentSection, SectionCard, ConsentList, TextBlock | - | ContentSection, SectionCard, ConsentList, TextBlock |
| change-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 본인인증 (/nc-full-join-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 인증 수단 1개 선택<br>위계: hero, required-input (인증 수단 리스트), supporting-notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, methods:molecules/SelectableList, policy-notice:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: methods: SelectableList

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; methods:ContentSection; methods:Chip; policy-notice:ContentSection; policy-notice:NoticeBlock; policy-notice:TextBlock; continue:Box; continue:Button; continue:TextBlock
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| methods | content | molecules/SelectableList | ContentSection, SelectableList, Chip | SelectableList | ContentSection, Chip |
| policy-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 가입 완료 (/nc-full-join-complete)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 결과 확인 + 다음 행동 선택<br>위계: hero, result-summary, supporting-notice, actions<br>CTA: bottom-sticky<br>Progress: none |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, summary:organisms/nc/NcSummaryCard, benefit-notice:organisms/nc/NcNotice, actions:organisms/nc/NcResultActions |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, NcSummaryCard |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 none로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcSummaryCard, organisms/nc/NcResultActions

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; hero:ContentSection; hero:TextBlock; hero:ContentRail; summary:ContentSection; summary:SummaryCard; summary:InfoList; summary:TextBlock; benefit-notice:ContentSection; benefit-notice:NoticeBlock; benefit-notice:TextBlock; actions:Box; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation | - | StatusBar, TopNavigation |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| summary | content | organisms/nc/NcSummaryCard | ContentSection, SummaryCard, InfoList, TextBlock | - | ContentSection, SummaryCard, InfoList, TextBlock |
| benefit-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| actions | bottom | organisms/nc/NcResultActions | Box, Button | - | Box, Button |

## nc-full · 개인정보 입력 (/nc-full-join-info)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 필수 정보 입력 + 검증<br>위계: hero, required-input (필수 폼), action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, form:organisms/nc/NcPersonalInfoForm, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcPersonalInfoForm |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcPersonalInfoForm

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; form:ContentSection; form:FormField; form:TextField; form:Select; form:TextBlock; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| form | content | organisms/nc/NcPersonalInfoForm | ContentSection, FormField, TextField, Select, TextBlock | - | ContentSection, FormField, TextField, Select, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 약관 동의 (/nc-full-join-terms)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 필수 약관 동의 + 선택 약관 결정<br>위계: hero (가입 첫 단계 맥락), required-input (약관 그룹 카드), conditional-notice (미성년 안내), action (동의하고 계속하기)<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, terms:organisms/nc/TermsAgreementGroup, guardian-notice:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, TermsAgreementGroup |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc (NcShell, NcTopBar, NcHero, NcNotice, NcContinueBar, TermsAgreementGroup)

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; terms:ContentSection; terms:SectionCard; terms:ConsentList; terms:TextBlock; guardian-notice:ContentSection; guardian-notice:NoticeBlock; guardian-notice:TextBlock; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| terms | content | organisms/nc/TermsAgreementGroup | ContentSection, SectionCard, ConsentList, TextBlock | - | ContentSection, SectionCard, ConsentList, TextBlock |
| guardian-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 본인인증 (탈퇴) (/nc-full-leave-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 인증 수단 선택<br>위계: hero, required-input, supporting-notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, methods:molecules/SelectableList, policy-notice:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: methods: SelectableList

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; methods:ContentSection; methods:Chip; policy-notice:ContentSection; policy-notice:NoticeBlock; policy-notice:TextBlock; continue:Box; continue:Button; continue:TextBlock
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| methods | content | molecules/SelectableList | ContentSection, SelectableList, Chip | SelectableList | ContentSection, Chip |
| policy-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 탈퇴 최종 동의 (/nc-full-leave-confirm)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 확인 체크 후 탈퇴 확정<br>위계: hero, required-input, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, confirm:organisms/nc/NcLeaveConfirmList, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcLeaveConfirmList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcLeaveConfirmList, NcContinueBar destructive primary tone

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; confirm:ContentSection; confirm:ConsentList; confirm:TextBlock; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| confirm | content | organisms/nc/NcLeaveConfirmList | ContentSection, ConsentList, TextBlock | - | ContentSection, ConsentList, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 탈퇴 전 안내 확인 (/nc-full-leave-notice)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 영향 인지 + 다음 단계 진행<br>위계: hero, result-summary, supporting-notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, impact:organisms/nc/NcImpactCard, cautions:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcImpactCard, NcNotice |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcImpactCard

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; impact:ContentSection; impact:SectionCard; impact:InfoList; impact:TextBlock; cautions:ContentSection; cautions:NoticeBlock; cautions:TextBlock; cautions:ContentRail; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| impact | content | organisms/nc/NcImpactCard | ContentSection, SectionCard, InfoList, TextBlock | - | ContentSection, SectionCard, InfoList, TextBlock |
| cautions | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock, ContentRail | - | ContentSection, NoticeBlock, TextBlock, ContentRail |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 탈퇴 사유 입력 (/nc-full-leave-reason)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 사유 선택 + 보조 의견<br>위계: hero, required-input, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, form:organisms/nc/NcLeaveReasonForm, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcLeaveReasonForm |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcLeaveReasonForm

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; form:ContentSection; form:SelectableList; form:TextArea; form:FormField; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| form | content | organisms/nc/NcLeaveReasonForm | ContentSection, SelectableList, TextArea, FormField | - | ContentSection, SelectableList, TextArea, FormField |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 탈퇴 결과 안내 (/nc-full-leave-result)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 결과 인지 + 다음 행동<br>위계: hero, result-summary, supporting-notice, actions<br>CTA: bottom-sticky<br>Progress: none |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, summary:organisms/nc/NcSummaryCard, withdraw-notice:organisms/nc/NcNotice, actions:organisms/nc/NcResultActions |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, NcSummaryCard |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 none로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcResultActions, organisms/nc/NcSummaryCard

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; hero:ContentSection; hero:TextBlock; hero:ContentRail; summary:ContentSection; summary:SummaryCard; summary:InfoList; summary:TextBlock; withdraw-notice:ContentSection; withdraw-notice:NoticeBlock; withdraw-notice:TextBlock; actions:Box; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation | - | StatusBar, TopNavigation |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| summary | content | organisms/nc/NcSummaryCard | ContentSection, SummaryCard, InfoList, TextBlock | - | ContentSection, SummaryCard, InfoList, TextBlock |
| withdraw-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| actions | bottom | organisms/nc/NcResultActions | Box, Button | - | Box, Button |

## nc-full · 본인인증 (재가입) (/nc-full-rejoin-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 인증 수단 선택<br>위계: hero, required-input, supporting-notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, methods:molecules/SelectableList, policy-notice:organisms/nc/NcNotice, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: methods: SelectableList

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; methods:ContentSection; methods:Chip; policy-notice:ContentSection; policy-notice:NoticeBlock; policy-notice:TextBlock; continue:Box; continue:Button; continue:TextBlock
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| methods | content | molecules/SelectableList | ContentSection, SelectableList, Chip | SelectableList | ContentSection, Chip |
| policy-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-full · 재가입 완료 (/nc-full-rejoin-complete)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 결과 인지 + 다음 행동<br>위계: hero, result-summary, supporting-notice, actions<br>CTA: bottom-sticky<br>Progress: none |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, summary:organisms/nc/NcSummaryCard, benefit-notice:organisms/nc/NcNotice, actions:organisms/nc/NcResultActions |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcNotice, NcSummaryCard |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 none로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; hero:ContentSection; hero:TextBlock; hero:ContentRail; summary:ContentSection; summary:SummaryCard; summary:InfoList; summary:TextBlock; benefit-notice:ContentSection; benefit-notice:NoticeBlock; benefit-notice:TextBlock; actions:Box; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation | - | StatusBar, TopNavigation |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| summary | content | organisms/nc/NcSummaryCard | ContentSection, SummaryCard, InfoList, TextBlock | - | ContentSection, SummaryCard, InfoList, TextBlock |
| benefit-notice | content | organisms/nc/NcNotice | ContentSection, NoticeBlock, TextBlock | - | ContentSection, NoticeBlock, TextBlock |
| actions | bottom | organisms/nc/NcResultActions | Box, Button | - | Box, Button |

## nc-full · 재가입 정보 입력 (/nc-full-rejoin-info)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 정보 입력 + 약관 재동의<br>위계: hero, required-input form, required-input consent, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: top-progress:organisms/nc/NcTopBar, hero:organisms/nc/NcHero, form:organisms/nc/NcPersonalInfoForm, terms:organisms/nc/TermsAgreementGroup, continue:organisms/nc/NcContinueBar |
| 렌더 반영 | Nodes: AppScreen, NcHero, NcPersonalInfoForm, TermsAgreementGroup |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/NcPersonalInfoForm prefilled state

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: top-progress:StatusBar; top-progress:TopNavigation; top-progress:ProgressIndicator; hero:ContentSection; hero:TextBlock; hero:ContentRail; form:ContentSection; form:FormField; form:TextField; form:Select; form:TextBlock; terms:ContentSection; terms:SectionCard; terms:ConsentList; terms:TextBlock; continue:Box; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| top-progress | top | organisms/nc/NcTopBar | StatusBar, TopNavigation, ProgressIndicator | - | StatusBar, TopNavigation, ProgressIndicator |
| hero | content | organisms/nc/NcHero | ContentSection, TextBlock, ContentRail | - | ContentSection, TextBlock, ContentRail |
| form | content | organisms/nc/NcPersonalInfoForm | ContentSection, FormField, TextField, Select, TextBlock | - | ContentSection, FormField, TextField, Select, TextBlock |
| terms | content | organisms/nc/TermsAgreementGroup | ContentSection, SectionCard, ConsentList, TextBlock | - | ContentSection, SectionCard, ConsentList, TextBlock |
| continue | bottom | organisms/nc/NcContinueBar | Box, Button, TextBlock | - | Box, Button, TextBlock |

## nc-simple · 휴면 해제 - 본인인증 (/nc-simple-dormancy-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 인증 성공<br>위계: hero, method, code, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, method:molecules/SelectableList, code:molecules/FormField, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, FormField, MembershipHero, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: method: SelectableList; code: FormField

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/AuthMethodSelector

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; continue:Button
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| method | content | molecules/SelectableList | SelectableList | SelectableList | - |
| code | content | molecules/FormField | FormField | FormField | - |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 휴면 해제 - 로그인 시도 (/nc-simple-dormancy-login)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 로그인 → 휴면 안내 → 인증 진입<br>위계: hero, login-form, notice(conditional), action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, login:molecules/FormField, dormancy-notice:organisms/membership/MembershipNotice, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, FormField, MembershipHero, MembershipNotice |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: login: FormField

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/LoginForm

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; login:TextField; dormancy-notice:NoticeBlock; continue:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| login | content | molecules/FormField | FormField, TextField | FormField | TextField |
| dormancy-notice | content | organisms/membership/MembershipNotice | NoticeBlock | - | NoticeBlock |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 휴면 해제 - 결과 안내 (/nc-simple-dormancy-result)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 정상 세션 진입<br>위계: hero, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, actions:organisms/membership/MembershipResultActions |
| 렌더 반영 | Nodes: AppScreen, MembershipHero |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: TextBlock; actions: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| actions | bottom | organisms/membership/MembershipResultActions | Button | - | Button |

## nc-simple · 휴면 해제 - 약관 재동의 (/nc-simple-dormancy-terms)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 개정 필수 약관 재동의<br>위계: hero, consent-list, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, terms:organisms/membership/TermsAgreementGroup, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, MembershipHero, TermsAgreementGroup |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: TextBlock; terms: ConsentList, Checkbox; continue: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; terms:ConsentList; terms:Checkbox; continue:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| terms | content | organisms/membership/TermsAgreementGroup | ConsentList, Checkbox | - | ConsentList, Checkbox |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 회원 가입 - 본인인증 (/nc-simple-join-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 본인인증 성공<br>위계: hero, method, code-input(after select), action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, method:molecules/SelectableList, code:molecules/FormField, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, FormField, MembershipHero, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: method: SelectableList; code: FormField

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/AuthMethodSelector

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; method:RadioGroup; code:TextField; continue:Button
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| method | content | molecules/SelectableList | SelectableList, RadioGroup | SelectableList | RadioGroup |
| code | content | molecules/FormField | FormField, TextField | FormField | TextField |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 회원 가입 - 완료 (/nc-simple-join-complete)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 완료 확인 + 홈 진입<br>위계: hero, summary, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, summary:organisms/membership/MembershipSummaryCard, actions:organisms/membership/MembershipResultActions |
| 렌더 반영 | Nodes: AppScreen, MembershipHero, MembershipSummaryCard |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: TextBlock; summary: SectionCard, InfoList; actions: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; summary:SectionCard; summary:InfoList; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| summary | content | organisms/membership/MembershipSummaryCard | SectionCard, InfoList | - | SectionCard, InfoList |
| actions | bottom | organisms/membership/MembershipResultActions | Button | - | Button |

## nc-simple · 회원 가입 - 개인정보 입력 (/nc-simple-join-info)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 필수 4항목 입력 + 검증 통과<br>위계: hero, form, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, form:organisms/membership/MembershipPersonalInfoForm, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, MembershipHero, MembershipPersonalInfoForm |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: ContentSection, TextBlock; form: ContentSection, FormField, TextField; continue: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:ContentSection; hero:TextBlock; form:ContentSection; form:FormField; form:TextField; continue:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | ContentSection, TextBlock | - | ContentSection, TextBlock |
| form | content | organisms/membership/MembershipPersonalInfoForm | ContentSection, FormField, TextField | - | ContentSection, FormField, TextField |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 회원 가입 - 약관 동의 (/nc-simple-join-terms)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 필수 약관 전체 동의 후 다음 단계 진행<br>위계: hero, consent-list (required-input), action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, terms:organisms/membership/TermsAgreementGroup, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, MembershipHero, TermsAgreementGroup |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: ContentSection, TextBlock; terms: ContentSection, ConsentList, Checkbox; continue: Button, TextBlock

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:ContentSection; hero:TextBlock; terms:ContentSection; terms:ConsentList; terms:Checkbox; continue:Button; continue:TextBlock
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | ContentSection, TextBlock | - | ContentSection, TextBlock |
| terms | content | organisms/membership/TermsAgreementGroup | ContentSection, ConsentList, Checkbox | - | ContentSection, ConsentList, Checkbox |
| continue | bottom | organisms/membership/MembershipContinueBar | Button, TextBlock | - | Button, TextBlock |

## nc-simple · 회원 탈퇴 - 본인인증 (/nc-simple-leave-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 고위험 인증<br>위계: hero, notice, method, code, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, high-risk-notice:organisms/membership/MembershipNotice, method:molecules/SelectableList, code:molecules/FormField, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, FormField, MembershipHero, MembershipNotice, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: method: SelectableList; code: FormField

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/AuthMethodSelector

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; high-risk-notice:NoticeBlock; continue:Button
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| high-risk-notice | content | organisms/membership/MembershipNotice | NoticeBlock | - | NoticeBlock |
| method | content | molecules/SelectableList | SelectableList | SelectableList | - |
| code | content | molecules/FormField | FormField | FormField | - |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 회원 탈퇴 - 영향 확인 + 최종 동의 (/nc-simple-leave-confirm)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 영향 + 동의 → 탈퇴<br>위계: hero, impact-checklist, final-consent, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, impact:molecules/ConsentList, final-consent:molecules/ConsentList, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, ConsentList, MembershipHero |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: impact: ConsentList; final-consent: ConsentList

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/LeaveImpactChecklist, Button variant=destructive

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; continue:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| impact | content | molecules/ConsentList | ConsentList | ConsentList | - |
| final-consent | content | molecules/ConsentList | ConsentList | ConsentList | - |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 회원 탈퇴 - 사유 입력 (/nc-simple-leave-reason)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 사유 입력<br>위계: hero, reason, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, reason:organisms/membership/MembershipReasonForm, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, MembershipHero, MembershipReasonForm |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: TextBlock; reason: SelectableList, FormField, TextArea; continue: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; reason:SelectableList; reason:FormField; reason:TextArea; continue:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| reason | content | organisms/membership/MembershipReasonForm | SelectableList, FormField, TextArea | - | SelectableList, FormField, TextArea |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 회원 탈퇴 - 결과 안내 (/nc-simple-leave-result)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 철회 가능성 인지<br>위계: hero, summary, notice, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, summary:organisms/membership/MembershipSummaryCard, withdraw-notice:organisms/membership/MembershipNotice, actions:organisms/membership/MembershipResultActions |
| 렌더 반영 | Nodes: AppScreen, MembershipHero, MembershipNotice, MembershipSummaryCard |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: TextBlock; summary: SectionCard, InfoList; withdraw-notice: NoticeBlock; actions: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; summary:SectionCard; summary:InfoList; withdraw-notice:NoticeBlock; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| summary | content | organisms/membership/MembershipSummaryCard | SectionCard, InfoList | - | SectionCard, InfoList |
| withdraw-notice | content | organisms/membership/MembershipNotice | NoticeBlock | - | NoticeBlock |
| actions | bottom | organisms/membership/MembershipResultActions | Button | - | Button |

## nc-simple · 재가입 - 본인인증 (/nc-simple-rejoin-auth)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 인증 + 자동 판정<br>위계: hero, method, code, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, method:molecules/SelectableList, code:molecules/FormField, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, FormField, MembershipHero, SelectableList |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: method: SelectableList; code: FormField

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/AuthMethodSelector

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; continue:Button
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| method | content | molecules/SelectableList | SelectableList | SelectableList | - |
| code | content | molecules/FormField | FormField | FormField | - |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |

## nc-simple · 재가입 - 제한 안내 (/nc-simple-rejoin-blocked)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 사유 인지<br>위계: hero, summary, notice, action<br>CTA: bottom-sticky<br>Progress: none |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, summary:organisms/membership/MembershipSummaryCard, support-notice:organisms/membership/MembershipNotice, actions:organisms/membership/MembershipResultActions |
| 렌더 반영 | Nodes: AppScreen, MembershipHero, MembershipNotice, MembershipSummaryCard |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 none로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: TextBlock; summary: SectionCard, InfoList; support-notice: NoticeBlock; actions: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; summary:SectionCard; summary:InfoList; support-notice:NoticeBlock; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| summary | content | organisms/membership/MembershipSummaryCard | SectionCard, InfoList | - | SectionCard, InfoList |
| support-notice | content | organisms/membership/MembershipNotice | NoticeBlock | - | NoticeBlock |
| actions | bottom | organisms/membership/MembershipResultActions | Button | - | Button |

## nc-simple · 재가입 - 완료 (/nc-simple-rejoin-complete)

**판정: 확인 필요 - area/render 매핑**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 정상 세션 진입<br>위계: hero, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, actions:organisms/membership/MembershipResultActions |
| 렌더 반영 | Nodes: AppScreen, MembershipHero |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.

**안 맞는 점**

- 스펙 area.uses와 렌더 node가 의미상 직접 매칭되지 않음: hero: TextBlock; actions: Button

**확인할 것**

- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; actions:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| actions | bottom | organisms/membership/MembershipResultActions | Button | - | Button |

## nc-simple · 재가입 - 약관 동의 + 정보 입력 (/nc-simple-rejoin-info)

**판정: 안 맞음 - 시스템 어휘 gap**

| 항목 | 내용 |
|---|---|
| 설계서 기준 | 목적: 약관 + 정보 통합<br>위계: hero, terms, reused-info, form, action<br>CTA: bottom-sticky<br>Progress: top-bar-thin |
| 스펙 반영 | Shell: AppScreen<br>Areas: hero:organisms/membership/MembershipHero, terms:organisms/membership/TermsAgreementGroup, reused-info:molecules/InfoList, form:organisms/membership/MembershipPersonalInfoForm, continue:organisms/membership/MembershipContinueBar |
| 렌더 반영 | Nodes: AppScreen, InfoList, MembershipHero, MembershipPersonalInfoForm, TermsAgreementGroup |

**잘 맞는 점**

- 화면 목적이 `x_interfacePlan.primary_task` 또는 정책 추출 목적에 기록되어 있다.
- 정보 위계가 설계 단계에 기록되어 있다.
- CTA 위치가 bottom-sticky로 명시되어 있다.
- Progress 위치가 top-bar-thin로 명시되어 있다.
- 스펙 area와 렌더 node가 의미상 이어지는 부분: reused-info: InfoList

**안 맞는 점**

- 신규 시스템 어휘가 필요하다고 기록됨: organisms/nc/ReusedInfoList

**확인할 것**

- 이 신규 어휘를 정식 NC organism으로 인정할지, 기존 membership/molecule 어휘로 흡수할지 결정 필요.
- 명칭 기준으로 렌더에 직접 보이지 않는 계약: hero:TextBlock; terms:ConsentList; form:FormField; form:TextField; continue:Button
- CTA가 bottom-sticky로 설계되어 있으나 렌더 node 목록에 action/continue 계열이 직접 보이지 않는다.
- Progress가 top-bar-thin으로 설계되어 있으나 렌더 node 목록에 TopBar/Progress 계열이 직접 보이지 않는다.

| Area | Slot | Pattern | Spec uses | Render match | Missing / gap |
|---|---|---|---|---|---|
| hero | content | organisms/membership/MembershipHero | TextBlock | - | TextBlock |
| terms | content | organisms/membership/TermsAgreementGroup | ConsentList | - | ConsentList |
| reused-info | content | molecules/InfoList | InfoList | InfoList | - |
| form | content | organisms/membership/MembershipPersonalInfoForm | FormField, TextField | - | FormField, TextField |
| continue | bottom | organisms/membership/MembershipContinueBar | Button | - | Button |
