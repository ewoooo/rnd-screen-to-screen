# apps/storybook

## 책임

`@pxds/cx-components`에 등록된 컴포넌트와 `@pxds/cx-tokens` 토큰 카탈로그를 한 Storybook에서 확인할 수 있는 셸이다. `apps/preview`는 정책 화면(`/screens`)과 정책(`/policies`) 탐색을 계속 맡고, 이 앱은 **컴포넌트와 토큰**에 집중한다.

## 실행

- `npm run dev -w @screen/storybook` — `:6006`에서 부팅
- `npm run build -w @screen/storybook` — `storybook-static` production 빌드
- `npm run generate:stories -w @screen/storybook` — generator만 단독 실행

`dev`와 `build` 모두 `pre*` lifecycle hook이 generator를 먼저 돌리므로, 컴포넌트가 cx-components의 preview registry에 추가되면 다음 부팅에서 자동으로 사이드바에 등장한다.

## SOT

- 컴포넌트 어휘: `packages/cx-components/src/preview/registry.ts`
- 컴포넌트 case 렌더: `packages/cx-components/src/preview/examples.tsx`
- 토큰 원천: `packages/cx-tokens/src/originals/_skt/`
- 토큰 CSS 산출물: `packages/cx-tokens/src/{tokens,theme-aliases,text-styles}.css` (`@pxds/cx-tokens/style.css` 통합 import)

## 구조

```
apps/storybook/
├── .storybook/        Storybook 9 설정 (main.ts, preview.tsx, manager.ts)
├── src/
│   ├── storybook.css  전역 entry: tailwindcss + cx-tokens + cx-components 스타일
│   ├── docs/          MDX 문서 (Introduction, Tokens/*, ...)
│   └── token-blocks/  토큰 카탈로그용 React 블록 (Swatch, Scale, TypeTable)
├── scripts/
│   └── generate-stories.mjs   registry + examples → generated/*.stories.tsx
└── generated/         (gitignore) generator 산출물
```

## 새 컴포넌트 등록

1. `packages/cx-components/src/preview/registry.ts`에 entry 추가
2. `packages/cx-components/src/preview/examples.tsx`에 `componentId`와 cases 추가
3. `npm run dev -w @screen/storybook` 부팅 — generator가 자동으로 stories 파일 생성

추가 prop control이나 별도 도큐 페이지가 필요한 경우 `src/stories/<id>.stories.tsx`에 손글 stories를 두면 generator 출력과 함께 픽업된다. generator는 매번 `generated/`를 비우고 다시 쓰므로 손글 stories는 그 외 위치에 둔다.

## 토큰 페이지 추가

- 새 토큰 카테고리 페이지가 필요하면 `src/docs/tokens/<Name>.mdx`에 작성
- 데이터 소스는 `@pxds/cx-tokens/originals/_skt/**` JSON을 import해서 사용
- 시각화 블록은 `src/token-blocks/`에 추가하고 MDX에서 호출

## 패키지 경계

- 신규 컴포넌트 / variant / slot은 `@pxds/cx-components` 어휘 안에서 결정한다. Storybook은 viewer일 뿐이며, 여기서 새 컴포넌트를 만들지 않는다.
- 토큰 추가는 Tokens Studio → `packages/cx-tokens/src/originals/_skt/`만 수정한다. Storybook의 swatch는 그 결과를 반영할 뿐이다.
