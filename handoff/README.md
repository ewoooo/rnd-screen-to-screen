# 정적 견본 (옆팀 전달용)

home-kit 톤으로 빌드한 두 화면의 standalone HTML 샘플. React/Next.js/WDS 의존성 없음, 더블클릭으로 브라우저에서 바로 열림.

## 파일

- `_shared.css` — 공용 토큰·셸·카드·타이포 (두 페이지 공유)
- `discover-v8.html` — 발견(비로그인) 10 SPEC
- `product-detail-v1.html` — 상품상세 16 SPEC

## 보는 법

1. 폴더 통째로 복사
2. `discover-v8.html` 또는 `product-detail-v1.html` 더블클릭

## 디자인 시스템

- 모바일 360×740 캔버스
- 색·그림자·radius·spacing은 모두 `_shared.css :root`에 CSS 변수로 정의
- 출처: 본 프로젝트 `app/src/components/home-kit/tokens.ts` + `@wanteddev/wds` theme
- 이미지/아이콘은 투명 체커보드 placeholder (실제 자산 교체 대상)

## 인터랙션 (vanilla JS)

- discover: 가로 스트립 스크롤 (네이티브)
- product-detail: 공지 롤링, 페이지 indicator, 아코디언 토글, 툴팁, 탭, 좋아요 토글
