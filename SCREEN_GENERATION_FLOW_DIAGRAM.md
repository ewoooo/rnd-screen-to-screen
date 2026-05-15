# Screen Generation Flow Diagram

공유용 요약 다이어그램이다. 핵심 메시지는 **SB를 바로 구현하지 않고, 먼저 제작 Diagram을 만들어 정책·디자인·OGN 구현 범위의 계약으로 검증한 뒤 Screen을 조립한다**는 것이다.

## End-to-End Flow

```mermaid
flowchart TD
    start([SB 첨부]) --> extract["SB 구조 추출<br/>화면 ID · 도메인 · 과업 · 상태 · CTA<br/>정책 태그 · 도메인 모듈 ID · OGN ID<br/>part · slot · hierarchy"]

    extract --> sot["필수 SOT 조회"]
    sot --> policyMd["정책 원문<br/>packages/policy-core/policies/**/*.md"]
    sot --> policyTs["구조화 정책<br/>packages/policy-core/policies/**/*.policy.ts"]
    sot --> patterns["화면 패턴<br/>DESIGN_PATTERNS.md"]
    sot --> foundation["디자인 foundation<br/>DESIGN_FOUNDATION.md"]

    policyMd --> matrix["정책-화면 요구사항 매트릭스<br/>필수 정보 · 선택지 · 제한 조건 · 에러 · CTA"]
    policyTs --> matrix
    patterns --> pattern["화면 패턴 결정<br/>Main · list · detail · form · complete · bottom sheet · popup"]
    foundation --> pattern

    matrix --> diagram["SB 기반 제작 Diagram 생성<br/>AppScreen slot · OGN 배치 · 주요 컴포넌트 · 정책 연결"]
    pattern --> diagram

    diagram --> gate{"Diagram 검증"}
    gate --> gatePolicy["정책 필수 정보<br/>누락 없음"]
    gate --> gateOgn["도메인 모듈 ID / OGN<br/>존재 또는 생성 예정"]
    gate --> gateDesign["패턴 · 토큰 · spacing<br/>위반 없음"]

    gatePolicy --> implement["OGN 구현 범위 확정"]
    gateOgn --> implement
    gateDesign --> implement

    implement --> ognDecision{"정책서 OGN 상태"}
    ognDecision -- "신규" --> newOgn["apps/mobile/src/organisms/&lt;domain&gt;/&lt;ogn&gt;<br/>OGN 컴포넌트 · config · index 생성"]
    ognDecision -- "기존" --> updateOgn["기존 OGN 보강<br/>정책 요구사항과 책임 범위 반영"]

    newOgn --> screen["Screen.tsx 조립<br/>Diagram을 AppScreen slot으로 코드화"]
    updateOgn --> screen

    screen --> config["Screen.config.ts 작성<br/>route · domain · generation 계약"]
    config --> route["screen-routes catalog 등록"]
    route --> preview["apps/preview iframe 확인"]
    preview --> verify["검증<br/>mobile lint/build<br/>policy compliance<br/>screen-generation check"]
    verify --> done([공유 가능한 생성 결과])
```

## Artifact Contract

```mermaid
flowchart LR
    subgraph input["입력"]
        sb["SB"]
    end

    subgraph source["SOT"]
        md["정책 원문 .md"]
        ts["구조화 정책 .policy.ts"]
        dp["DESIGN_PATTERNS.md"]
        df["DESIGN_FOUNDATION.md"]
        figma["Figma 목업 SOT"]
    end

    subgraph contract["구현 전 계약"]
        matrix["정책-화면 요구사항 매트릭스"]
        diagram["Screen.diagram.md"]
    end

    subgraph implementation["구현 산출물"]
        ogn["organisms/&lt;domain&gt;/&lt;ogn&gt;"]
        screen["Screen.tsx"]
        config["Screen.config.ts"]
        routes["screen-routes/routes.ts"]
    end

    subgraph validation["검증"]
        preview["Preview iframe"]
        lint["npm run lint -w @screen/mobile"]
        build["npm run build -w @screen/mobile"]
        compliance["npm run check:compliance -w @policy/core"]
        generation["npm run check:screen-generation -w @policy/core"]
    end

    sb --> matrix
    sb --> diagram
    md --> matrix
    ts --> matrix
    dp --> diagram
    df --> diagram
    figma --> diagram

    matrix --> diagram
    diagram --> ogn
    diagram --> screen
    diagram --> config
    ogn --> screen
    config --> routes

    screen --> preview
    routes --> preview
    config --> compliance
    config --> generation
    screen --> lint
    screen --> build
```

## One-Slide Summary

```mermaid
flowchart LR
    A["SB<br/>화면 구조와 정책 태그"] --> B["SOT 확인<br/>정책 · 패턴 · foundation · Figma"]
    B --> C["제작 Diagram<br/>구현 전 계약"]
    C --> D{"검증 Gate<br/>정책 충실도 · OGN 범위 · DS 일관성"}
    D --> E["OGN 구현 / 보강"]
    E --> F["Screen 조립<br/>config · route 등록"]
    F --> G["Preview / lint / build / compliance"]
```

