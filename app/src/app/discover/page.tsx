'use client';

import {
  TopNavigation,
  TopNavigationButton,
  BottomNavigation,
  BottomNavigationItem,
  FlexBox,
  Typography,
  Card,
  CardThumbnail,
  CardContent,
  CardTitle,
  CardCaption,
} from '@wanteddev/wds';
import {
  IconChevronLeft,
  IconSearch,
  IconNavigationRecruit,
  IconNavigationCareer,
  IconNavigationMypage,
} from '@wanteddev/wds-icon';

import { SectionHeader } from '@/components/SectionHeader';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts, featured } from '@/mock/products';

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => (
  <FlexBox
    flexDirection="row"
    gap="12px"
    sx={{
      padding: '0 16px 16px',
      overflowX: 'auto',
      width: '100%',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {children}
  </FlexBox>
);

// SPEC-MAIN-01 — 헤더 영역(공통) 이동
const Sec01Header = () => (
  <TopNavigation
    leadingContent={
      <TopNavigationButton variant="icon">
        <IconChevronLeft />
      </TopNavigationButton>
    }
    trailingContent={
      <FlexBox gap="4px">
        <TopNavigationButton variant="icon">
          <IconSearch />
        </TopNavigationButton>
        <TopNavigationButton variant="text">🛒</TopNavigationButton>
        <TopNavigationButton variant="text">▤</TopNavigationButton>
      </FlexBox>
    }
  >
    발견
  </TopNavigation>
);

// SPEC-MAIN-02 — 개인화 컨텍스트 노출 (비로그인)
const Sec02Personalization = () => (
  <>
    <FlexBox
      flexDirection="column"
      gap="4px"
      sx={{ padding: '24px 16px 4px' }}
    >
      <Typography variant="title3" weight="bold">
        통신사 상관없이 모두의 구독
      </Typography>
      <Typography variant="title2" weight="bold" color="semantic.primary.normal">
        T우주
      </Typography>
    </FlexBox>
    <SectionHeader title="지금 인기 있는 상품" />
    <HorizontalScroll>
      {mockProducts.slice(0, 6).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-03 — 실시간 인기 베스트
const Sec03Best = () => (
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
const Sec04BigBanner = () => (
  <FlexBox sx={{ padding: '8px 16px 16px', width: '100%' }}>
    <Card width="100%" platform="mobile" sx={{ cursor: 'pointer' }}>
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
  </FlexBox>
);

// SPEC-MAIN-05 — 신규 오픈 상품
const Sec05NewOpen = () => (
  <>
    <SectionHeader title="신규 오픈" caption="최근 30일 이내 오픈한 상품" />
    <HorizontalScroll>
      {mockProducts.slice(4, 10).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-06 — 이벤트/프로모션 일반 배너
const Sec06Banner = () => (
  <FlexBox sx={{ padding: '8px 16px 16px', width: '100%' }}>
    <Card as="a" width="100%" platform="mobile">
      <CardThumbnail
        src="https://picsum.photos/seed/banner2/800/300"
        alt="프로모션 배너"
        ratio="21:9"
      />
      <CardContent>
        <CardTitle variant="body2" weight="medium">
          넷플릭스 3개월 무료 체험
        </CardTitle>
      </CardContent>
    </Card>
  </FlexBox>
);

// SPEC-MAIN-07 — 인기 OTT 상품 리스트
const Sec07OttPopular = () => (
  <>
    <SectionHeader title="인기 OTT" onSeeAll={() => {}} />
    <HorizontalScroll>
      {mockProducts.filter((p) => p.tags?.includes('OTT')).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-08 — 장기 구독 할인
const Sec08LongSubscribe = () => (
  <>
    <SectionHeader title="장기 구독 할인" caption="12개월 약정 시 최대 20% 할인" />
    <HorizontalScroll>
      {mockProducts.filter((p) => p.discountRate).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </HorizontalScroll>
  </>
);

// SPEC-MAIN-09 — SKT 연계 혜택 상품
const Sec09SktBenefit = () => (
  <FlexBox
    flexDirection="column"
    gap="8px"
    sx={{ padding: '8px 16px 24px', width: '100%' }}
  >
    <Typography variant="headline1" weight="bold" sx={{ padding: '12px 0 8px' }}>
      SKT 가입 고객 전용
    </Typography>
    <FlexBox flexDirection="column" gap="12px">
      {mockProducts.slice(0, 2).map((p) => (
        <ProductCard key={p.id} product={p} width="100%" />
      ))}
    </FlexBox>
  </FlexBox>
);

// SPEC-MAIN-10 — 페이지 이동 (공통) / 하단 네비
const Sec10Gnb = () => (
  <BottomNavigation defaultValue="discover">
    <BottomNavigationItem
      value="use"
      label="이용"
      icon={<IconNavigationRecruit />}
    />
    <BottomNavigationItem
      value="category"
      label="카테고리"
      icon={<IconNavigationCareer />}
    />
    <BottomNavigationItem
      value="discover"
      label="발견"
      icon={<IconNavigationMypage />}
    />
  </BottomNavigation>
);

export default function DiscoverPage() {
  // suppress unused warning — keeping featured export for later
  void featured;
  return (
    <FlexBox flexDirection="column" sx={{ width: '100%', minHeight: '100%' }}>
      <Sec01Header />
      <FlexBox
        flexDirection="column"
        sx={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}
      >
        <Sec02Personalization />
        <Sec03Best />
        <Sec04BigBanner />
        <Sec05NewOpen />
        <Sec06Banner />
        <Sec07OttPopular />
        <Sec08LongSubscribe />
        <Sec09SktBenefit />
      </FlexBox>
      <FlexBox sx={{ position: 'sticky', bottom: 0, width: '100%' }}>
        <Sec10Gnb />
      </FlexBox>
    </FlexBox>
  );
}
