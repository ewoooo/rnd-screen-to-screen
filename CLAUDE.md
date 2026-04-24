# rnd-screen-to-screen

Screen-to-Screen 와이어프레임 R&D 프로젝트. WDS(Wanted Design System) 기반 Next.js 앱과, 화면 설계를 위한 SSOT 레지스트리/데이터로 구성된다.

## 폴더 구조

```
.
├── app/        Next.js 16 앱 (TypeScript, App Router, Tailwind, src/)
├── data/       이 프로젝트 고유의 도메인 데이터 (screen-features 등)
├── registry/   외부 라이브러리(WDS) SSOT — 컴포넌트/아이콘/매핑/레이아웃
└── CLAUDE.md   이 파일
```

### `app/`
Next.js 앱 실체. 의존성은 **GitHub Packages**의 `@wanteddev/*` 스코프를 사용하므로 `app/.npmrc`에 `${GITHUB_TOKEN}` 참조가 있다. 설치 전에 `~/.zshrc`에 `GITHUB_TOKEN`(PAT, `read:packages`)이 export되어 있어야 한다.

주요 디렉터리
- `app/src/app/` — App Router 페이지
- `app/src/components/` — 프로젝트 전용 컴포넌트 (WDS 위에 얹는 래퍼 등)
- `app/src/fixtures/` — **API 연결 전 seed 도메인 데이터** (타입 + 값). 컴포넌트 입력으로 실제 사용된다. API 붙으면 스키마는 유지한 채 값만 교체됨

### `data/`
**이 프로젝트 고유**의 도메인 데이터. 외부 라이브러리 메타는 두지 않는다.
- `screen-features.json` — 화면/피쳐 정의 (프로젝트 SSOT)

### `registry/`
**외부 라이브러리(WDS) SSOT**. AI/에이전트가 컴포넌트·아이콘을 찾을 때 여기를 본다.
- `index.json` — 매니페스트. **진입점으로 먼저 읽을 것**
- `wds-component-registry.json` — 컴포넌트 84종
- `wds-icon-registry.json` — 아이콘 344개
- `wds-component-mapping-registry.json` — 자연어→컴포넌트 매핑
- `wds-component-compound-layout-registry.json` — 복합 레이아웃

## AI를 위한 가이드

1. **새 화면/피쳐를 설계할 때**: `registry/index.json` → 필요한 레지스트리를 이 매니페스트의 `use_when`에 따라 선택해서 읽는다.
2. **아이콘이 필요할 때**: `registry/wds-icon-registry.json`의 `entries[]`에서 `kebab` 또는 `name`으로 검색. 존재하지 않으면 만들지 말고 사용자에게 대안을 물어본다.
3. **컴포넌트가 필요할 때**: `registry/wds-component-registry.json`의 `categories`에서 카테고리별 탐색. 목록에 없으면 WDS가 제공하지 않는다고 판단.
4. **도메인 데이터 배치**: 프로젝트 수준 spec(화면/피쳐 정의 등 JSON SSOT)은 `data/`, 컴포넌트에 주입되는 seed 데이터(타입 포함 TS)는 `app/src/fixtures/`. 양쪽 다 실제 데이터이며, 수명과 소비 주체가 다를 뿐이다(`data/`는 앱 외부 참조 가능, `fixtures/`는 앱 번들 내부).
5. **`@wanteddev/*` 패키지 import 위치**: `app/` 내부에서만. `data/`·`registry/`는 런타임 의존성 없는 JSON만 가진다.

## 주의사항

- `node_modules/@wanteddev/` 내부 파일을 직접 읽어 레지스트리를 보강하지 말고, 공식 소스(https://github.com/wanteddev/montage-web)를 기준으로 교정한다. 각 레지스트리의 `meta.source_url` 참조.
- 레지스트리 간 상호참조는 `meta.related_registries`에 **상대경로**로 기입 (예: `"./wds-icon-registry.json"`).
- 카테고리 분류는 일부 휴리스틱 기반이다. 공식 분류와 다르면 `meta.note`에 따라 교정 가능.
