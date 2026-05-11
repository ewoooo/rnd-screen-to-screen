# @pxds/pxds-preview

모바일 iframe preview/helper 패키지다. 실제 화면 layout runtime은 `@pxds/pxds-layout`이 소유하고, 이 패키지는 preview shell이 mobile app을 격리해서 보여주기 위한 frame/iframe helper만 제공한다.

## 책임

- `MobileViewFrame`
- `MobilePreviewFrame`
- `useIsolatedPreviewIframe`
- `useMobilePreviewViewport`
- preview frame CSS

## 규칙

- mobile 화면 컴포넌트를 직접 import하지 않는다.
- iframe origin은 consumer가 결정한다.
- iframe 배경은 mobile content가 결정할 수 있도록 투명/토큰 기반을 우선한다.
- device width/height token은 `@pxds/pxds-tokens`에서 온다.
