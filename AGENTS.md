# rnd-screen-to-screen

**목적**: 제공된 페이지 스펙에 따라 화면의 프로토타입 디자인을 빠르게 빌드한다.

**규칙**: 반드시 제공된 토큰과 컴포넌트를 사용한다.

**문서 SSOT**: 이 문서가 프로젝트 최상위 규칙과 문서 지도의 기준이다. `CLAUDE.md`는 Claude 계열 도구 호환을 위한 alias이며, 직접 편집하지 않는다.

---

Screen-to-Screen 와이어프레임 R&D 프로젝트. WDS(Wanted Design System) 기반 Next.js 앱과, 화면 설계를 위한 SSOT 레지스트리/데이터로 구성된다.

## 폴더 구조

```
.
├── app/        Next.js 16 앱 (TypeScript, App Router, Tailwind, src/)
├── data/       이 프로젝트 고유의 도메인 데이터 (screen-features 등)
├── registry/   외부 라이브러리(WDS) SSOT — 컴포넌트/아이콘/매핑/레이아웃
├── DESIGN.md   디자인 기준 (뷰포트, 간격, 색, 텍스트 슬롯)
├── LAYOUT.md   신규 화면 조립 기준 (home-kit 레이어 공식)
└── AGENTS.md   이 파일
```

## 진입 문서

- **[DESIGN.md](./DESIGN.md)** — 모바일 뷰포트 360px, 간격 규칙, 텍스트 슬롯, 컬러 SSOT
- **[LAYOUT.md](./LAYOUT.md)** — 신규 화면 구현 템플릿, home-kit 기반 셸/카드/행/placeholder 공식
- **[app/AGENTS.md](./app/AGENTS.md)** — WDS prop 규약, 토큰은 레지스트리 직접 조회
- **[app/src/components/home-kit/README.md](./app/src/components/home-kit/README.md)** — 홈 5화면 재조립 키트
- **[app/src/components/search-kit/README.md](./app/src/components/search-kit/README.md)** — 검색 11스텝 재조립 키트
- **[app/src/components/pilot-kit/README.md](./app/src/components/pilot-kit/README.md)** — WDS 매핑 검증 키트

### `app/`
Next.js 앱 실체. 의존성은 **GitHub Packages**의 `@wanteddev/*` 스코프를 사용하므로 `app/.npmrc`에 `${GITHUB_TOKEN}` 참조가 있다. 설치 전에 `~/.zshrc`에 `GITHUB_TOKEN`(PAT, `read:packages`)이 export되어 있어야 한다.

주요 디렉터리
- `app/src/app/` — App Router 페이지
- `app/src/components/` — 프로젝트 전용 컴포넌트 (WDS 위에 얹는 래퍼 등)
- `app/src/fixtures/` — **API 연결 전 렌더링용 mock/seed data** (타입 + 값). 컴포넌트 입력으로 실제 사용되지만, `data/screens`에서 자동 생성된 산출물은 아니다.

### `data/`
**이 프로젝트 고유**의 도메인 데이터. 외부 라이브러리 메타는 두지 않는다.
- `data/screens/*.json` — 화면 요구사항/기능 스펙 SSOT. 앱 런타임 입력이 아니라 제작자가 읽는 출처다.

### `registry/`
**외부 라이브러리(WDS) SSOT**. AI/에이전트가 컴포넌트·아이콘을 찾을 때 여기를 본다.
- `index.json` — 매니페스트. **진입점으로 먼저 읽을 것**
- `wds-component-registry.json` — 컴포넌트 84종
- `wds-icon-registry.json` — 아이콘 344개
- `wds-component-mapping-registry.json` — 자연어→컴포넌트 매핑
- `wds-component-compound-layout-registry.json` — 복합 레이아웃

## AI를 위한 가이드

### 화면 제작 진입 순서 (반드시 이 순서대로 읽는다)

```
1. 제작 쿼리           — 무엇을 만드는지
2. AGENTS.md           — 프로젝트 규칙 + 문서 지도 (이 파일)
3. DESIGN.md           — 뷰포트·간격·텍스트 슬롯·컬러 SSOT
4. LAYOUT.md           — home-kit 기반 화면 조립 공식
5. registry/index.json — 레지스트리 탐색 전략
   └ wds-component-registry.json 의 project_kits 섹션
   └ 해당 kit README (home-kit / search-kit / pilot-kit)
6. app/AGENTS.md       — WDS prop 규약 + raw HTML 체크
7. data/screens/<id>.json — 이번 화면 스펙
```

**왜 이 순서인가**
- 3번(DESIGN.md)은 뷰포트·간격 등 **디자인 제약**이 컴포넌트 선택에 앞서 고정돼야 레이아웃 판단이 흔들리지 않음.
- 4번(LAYOUT.md)은 신규 화면의 셸·카드·행·placeholder 톤을 home-kit 레퍼런스 공식으로 먼저 고정함.
- 5번(Registry Index)은 **"보완 부품을 어디서 찾을까"**, 6번(app/AGENTS.md)은 **"그 컴포넌트를 어떻게 쓸까"(prop 규약)** — 화면 공식이 전술보다 먼저.
- **home-kit-first**: 신규 화면 조립은 `LAYOUT.md`의 home-kit 공식을 우선한다. home-kit에 없는 부품만 project kit(search-kit/pilot-kit) 또는 WDS registry에서 확인한다. `_meta.rule`: "kit → WDS 의존 허용, WDS → kit 의존 금지".

### 정식 화면 생성 경로 (실제 실행 순서)

문서 읽는 순서와 실제 생성 실행 순서를 구분한다. 화면을 만들 때는 아래 경로를 따른다.

```
1. 제작 쿼리 확인
2. data/screens/<id>.json 에서 요구사항·기능·섹션 후보 확인
3. DESIGN.md / LAYOUT.md 로 모바일 기준과 home-kit 레이어 공식 고정
4. home-kit 또는 도메인 kit(search-kit 등) 로 섹션 조립
5. kit 에 없는 요소만 인라인 작성 또는 보완 kit/WDS registry 확인
6. app/src/fixtures 또는 페이지 로컬 mock data 로 임시 렌더 데이터 주입
7. app/src/app/<screen>/v{N}-{approach}/page.tsx 작성
8. app/ 에서 npm run gen:screen-registry 실행
9. 360px viewport 에서 시각 검증
```

- `data/screens`는 요구사항/기능 스펙의 출처이며 앱 런타임 입력이 아니다.
- `app/src/fixtures`는 API 연결 전 렌더링을 위한 mock/seed data다. `data/screens`에서 자동 생성된 렌더 모델로 부르지 않는다.
- 향후 실제 API 또는 변환기가 생기면 fixtures 값만 교체하거나 별도 render model 계층을 설계한다.

### 기타 규칙

1. **아이콘이 필요할 때**: `registry/wds-icon-registry.json`의 `entries[]`에서 `kebab` 또는 `name`으로 검색. 존재하지 않으면 만들지 말고 사용자에게 대안을 물어본다.
2. **컴포넌트가 필요할 때**: 신규 화면은 `LAYOUT.md`와 home-kit 부품을 먼저 맞춘다 → 없으면 `project_kits`(search-kit/pilot-kit 포함) 조회 → 그래도 없으면 `registry/wds-component-registry.json`의 `categories`에서 카테고리별 탐색. 목록에 없으면 WDS가 제공하지 않는다고 판단.
3. **도메인 데이터 배치**: 프로젝트 수준 spec(화면/피쳐 정의 등 JSON SSOT)은 `data/`, 렌더링용 mock/seed data(타입 포함 TS)는 `app/src/fixtures/`. `fixtures`는 앱 번들 내부 임시 입력이며 API 연결 전 화면 재현을 위해 사용한다.
4. **`@wanteddev/*` 패키지 import 위치**: `app/` 내부에서만. `data/`·`registry/`는 런타임 의존성 없는 JSON만 가진다.

## 화면 버전 관리 규약 (screen-first)

이 프로젝트는 **화면마다 독립적인 구현 버전**을 관리한다. 같은 화면의 `v1-div`, `v2-flex` 같은 대체 구현을 나란히 두고 비교하는 게 핵심 가치.

- **폴더 구조**: `app/src/app/<screen>/v{N}-{approach}/page.tsx`
  - `<screen>` — 화면 ID (kebab-case, 예: `discover`, `product-detail`)
  - `N` — **화면별로 독립 증가하는 정수**. 다른 화면과 번호 겹쳐도 상관없음
  - `<approach>` — 구현 방식 식별자 (한 단어, 예: `div`, `flex`, `grid`, `table`)
- **URL**: `/discover/v1-div`, `/discover/v2-flex` (folder-to-URL 그대로)
- **`/<screen>` 자체 경로**: generator가 선정한 `latest`(최대 `N`)로 `redirect()` 한다
- **버전 간 cross-import 금지**. 각 버전 폴더는 독립적이어야 한다. 공유 코드가 필요하면 `app/src/components/`로 승격
- **자동 레지스트리**: `app/src/generated/screen-version-registry.json`은 `app/scripts/generate-screen-registry.mjs`가 `pnpm dev`/`pnpm build` 시 생성. **수동 편집 금지** (`meta.do_not_edit: true`)
- **생성물 위치 고정**: screen registry는 앱 런타임에서 소비하므로 `app/src/generated/`만 사용한다. 루트 `src/generated/`를 만들지 않는다.
- **제외 규약**: `_` 또는 `(` 로 시작하는 폴더는 screen 스캔에서 제외됨 (내부 파일·Next.js route group)
- **소비 지점**: 런타임 네비·인덱스 페이지는 `@/generated/screen-version-registry.json`을 import해서 사용 (타입은 `@/types/registry`)

## 주의사항

- `node_modules/@wanteddev/` 내부 파일을 직접 읽어 레지스트리를 보강하지 말고, 공식 소스(https://github.com/wanteddev/montage-web)를 기준으로 교정한다. 각 레지스트리의 `meta.source_url` 참조.
- 레지스트리 간 상호참조는 `meta.related_registries`에 **상대경로**로 기입 (예: `"./wds-icon-registry.json"`).
- 카테고리 분류는 일부 휴리스틱 기반이다. 공식 분류와 다르면 `meta.note`에 따라 교정 가능.
