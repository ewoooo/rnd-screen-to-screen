# app2

홈 5화면 + home-kit만 가진 클린 슬라이스. 기존 `app/`이 여러 kit·버전이 누적되며 의존이 꼬여, home-kit을 자생적인 형태로 재출발한 워크스페이스.

## 옮긴 자산
- `src/components/home-kit/` — Shell/Card/Hero/Stat/Barcode/Offering/DualMenu/ListRow/TopBanner/MyEdit/Placeholder + tokens + text(8 슬롯). pilot-kit/payment-kit/search-kit 의존 0.
- `src/app/{home-benefit, home-manage, home-device-change, home-senior, home-guest}/` — 각 화면 latest 버전(v3-kit / v1-kit)만.

## 공유 SSOT (루트)
- `../DESIGN.md`, `../LAYOUT.md`, `../AGENTS.md`
- `../registry/` (token / component / icon / mapping)
- `../data/screens/`

## 명령
```bash
npm install              # GITHUB_TOKEN 필요 (read:packages)
npm run dev              # next dev + screen registry watcher
npm run gen:screen-registry
```
