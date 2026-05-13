# @pxds/cx-icons

CX DS icon 원천 SVG, icon registry, React `Icon` wrapper 초안 패키지입니다.

## Icon API

공개 소비는 패키지 루트 진입점을 통합니다.

```tsx
import { Icon } from "@pxds/cx-icons";

<Icon type="close" size={24} />
<Icon type="arrow-left" size={16} aria-label="뒤로가기" />
```

- `type`은 `IconType`입니다. Figma 원천 파일의 `Type`을 kebab-case로 정규화합니다. 예: `ArrowLeft` → `arrow-left`, `AiSearch` → `ai-search`.
- `size`는 `IconSize`입니다. 지원 값은 `12 | 16 | 20 | 24 | 32 | 40`입니다.
- `className`, `aria-label`, `aria-hidden`을 지원합니다.
- `aria-label` 또는 `alt`가 없으면 decorative icon으로 보고 기본 `aria-hidden=true`를 적용합니다.
- `aria-label` 또는 `alt`가 있으면 접근성 이름으로 사용합니다.
- 지원하지 않는 `type`/`size` 조합은 현재 `null`을 렌더합니다.
- 현재 구현은 원천 SVG를 `<img>`로 소비합니다. SVGO, `currentColor` 변환, inline SVG adapter는 별도 작업으로 다룹니다.
