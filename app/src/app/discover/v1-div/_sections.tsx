'use client';

import {
  Card,
  CardThumbnail,
  CardContent,
  CardTitle,
  CardCaption,
  Typography,
} from '@wanteddev/wds';

import { mockProducts } from './_mock';
import { HorizontalScroll, SectionHeader, ProductCard } from './_ui';

// SPEC-MAIN-02 — 개인화 컨텍스트 노출 (비로그인)
export const Sec02Personalization = () => (
  <>
    <div
      style={{
        padding: '24px 16px 4px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="title3" weight="bold">
        통신사 상관없이 모두의 구독
      </Typography>
      <Typography variant="title2" weight="bold" color="semantic.primary.normal">
        T우주
      </Typography>
    </div>
    <SectionHeader title="지금 인기 있는 상품" />
    <HorizontalScroll>
      {mockProducts.slice(0, 6).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-03 — 실시간 인기 베스트
export const Sec03Best = () => (
  <>
    <SectionHeader title="실시간 인기 베스트" caption="집계 기반 · 매시간 갱신" />
    <HorizontalScroll>
      {mockProducts.slice(0, 6).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-04 — 이벤트/프로모션 빅배너
export const Sec04BigBanner = () => (
  <div style={{ padding: '8px 16px 16px' }}>
    <Card width="100%" platform="mobile">
      <CardThumbnail
        src="https://picsum.photos/seed/bigbanner/800/400"
        alt="빅 배너"
        ratio="2:1"
      />
      <CardContent>
        <CardTitle variant="body1" weight="bold">
          봄맞이 구독 페스타 최대 50%
        </CardTitle>
        <CardCaption>기간 한정 프로모션</CardCaption>
      </CardContent>
    </Card>
  </div>
);

// SPEC-MAIN-05 — 신규 오픈 상품 (최근 30일)
export const Sec05NewOpen = () => (
  <>
    <SectionHeader title="신규 오픈" caption="최근 30일 내 최신순" />
    <HorizontalScroll>
      {mockProducts.slice(4, 10).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-06 — 이벤트/프로모션 일반 배너
export const Sec06Banner = () => (
  <div style={{ padding: '8px 16px 16px' }}>
    <Card width="100%" platform="mobile">
      <CardThumbnail
        src="https://picsum.photos/seed/banner2/800/280"
        alt="프로모션 배너"
        ratio="21:9"
      />
      <CardContent>
        <CardTitle variant="body2" weight="medium">
          넷플릭스 3개월 무료 체험
        </CardTitle>
      </CardContent>
    </Card>
  </div>
);

// SPEC-MAIN-07 — 인기 OTT 상품 (전체보기 포함)
export const Sec07OttPopular = () => (
  <>
    <SectionHeader title="인기 OTT" onSeeAll={() => {}} />
    <HorizontalScroll>
      {mockProducts
        .filter((p) => p.tags?.includes('OTT'))
        .map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-08 — 장기 구독 할인 (인기순)
export const Sec08LongSubscribe = () => (
  <>
    <SectionHeader title="장기 구독 할인" caption="12개월 약정 시 추가 할인" />
    <HorizontalScroll>
      {mockProducts
        .filter((p) => p.discountRate)
        .map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-09 — SKT 연계 혜택 (C4 단일 카드)
export const Sec09SktBenefit = () => (
  <div
    style={{
      padding: '24px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <Typography variant="headline1" weight="bold">
      SKT 가입 고객 전용 혜택
    </Typography>
    <Card width="100%" platform="mobile">
      <CardThumbnail
        src="https://picsum.photos/seed/skt/800/400"
        alt="SKT 혜택"
        ratio="2:1"
      />
      <CardContent>
        <CardTitle variant="body1" weight="bold">
          T우주 패스 2개월 무료
        </CardTitle>
        <CardCaption>SKT 고객 한정 · 최초 가입 시</CardCaption>
      </CardContent>
    </Card>
  </div>
);
