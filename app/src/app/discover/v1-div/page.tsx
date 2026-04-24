'use client';

import {
  TopNavigation,
  TopNavigationButton,
  BottomNavigation,
  BottomNavigationItem,
} from '@wanteddev/wds';
import {
  IconHome,
  IconSearch,
  IconTicket,
  IconInbox,
  IconUtility,
  IconListCategory,
  IconBookmark,
} from '@wanteddev/wds-icon';

import {
  Sec02Personalization,
  Sec03Best,
  Sec04BigBanner,
  Sec05NewOpen,
  Sec06Banner,
  Sec07OttPopular,
  Sec08LongSubscribe,
  Sec09SktBenefit,
} from './_sections';

// SPEC-MAIN-01 — 헤더 영역(공통): 홈 + 검색/바코드/카트
const Header = () => (
  <TopNavigation
    leadingContent={
      <TopNavigationButton variant="icon">
        <IconHome />
      </TopNavigationButton>
    }
    trailingContent={
      <div style={{ display: 'flex', gap: 4 }}>
        <TopNavigationButton variant="icon">
          <IconSearch />
        </TopNavigationButton>
        <TopNavigationButton variant="icon">
          <IconTicket />
        </TopNavigationButton>
        <TopNavigationButton variant="icon">
          <IconInbox />
        </TopNavigationButton>
      </div>
    }
  >
    발견
  </TopNavigation>
);

// SPEC-MAIN-10 — 하단 네비 (이용/카테고리/나의 구독)
const Gnb = () => (
  <BottomNavigation defaultValue="subscription">
    <BottomNavigationItem value="use" label="이용" icon={<IconUtility />} />
    <BottomNavigationItem
      value="category"
      label="카테고리"
      icon={<IconListCategory />}
    />
    <BottomNavigationItem
      value="subscription"
      label="나의 구독"
      icon={<IconBookmark />}
    />
  </BottomNavigation>
);

export default function DiscoverPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
        }}
      >
        <Sec02Personalization />
        <Sec03Best />
        <Sec04BigBanner />
        <Sec05NewOpen />
        <Sec06Banner />
        <Sec07OttPopular />
        <Sec08LongSubscribe />
        <Sec09SktBenefit />
      </div>
      <Gnb />
    </div>
  );
}
