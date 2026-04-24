export type MockProduct = {
  id: string;
  title: string;
  brand: string;
  priceKrw: number;
  discountRate?: number;
  thumbnailUrl: string;
  tags?: string[];
  badge?: string;
};

const pic = (seed: string) =>
  `https://picsum.photos/seed/${seed}/480/480`;

export const mockProducts: MockProduct[] = [
  { id: 'p01', title: '넷플릭스 스탠다드 구독권', brand: 'Netflix', priceKrw: 13500, discountRate: 10, thumbnailUrl: pic('netflix'), tags: ['OTT'], badge: 'BEST' },
  { id: 'p02', title: '유튜브 프리미엄 12개월', brand: 'YouTube', priceKrw: 118000, discountRate: 18, thumbnailUrl: pic('youtube'), tags: ['OTT'] },
  { id: 'p03', title: '웨이브 베이직 월구독', brand: 'Wavve', priceKrw: 7900, thumbnailUrl: pic('wavve'), tags: ['OTT', '국내'] },
  { id: 'p04', title: '티빙 라이트 월구독', brand: 'TVING', priceKrw: 5500, discountRate: 20, thumbnailUrl: pic('tving'), tags: ['OTT'] },
  { id: 'p05', title: '디즈니플러스 프리미엄', brand: 'Disney+', priceKrw: 13900, thumbnailUrl: pic('disney'), tags: ['OTT'], badge: 'NEW' },
  { id: 'p06', title: '쿠팡플레이 멤버십', brand: 'Coupang Play', priceKrw: 7890, thumbnailUrl: pic('coupang'), tags: ['OTT'] },
  { id: 'p07', title: '왓챠 베이직 월구독', brand: 'Watcha', priceKrw: 7900, discountRate: 15, thumbnailUrl: pic('watcha'), tags: ['OTT'] },
  { id: 'p08', title: '밀리의 서재 프리미엄', brand: 'Millie', priceKrw: 9900, thumbnailUrl: pic('millie'), tags: ['독서'] },
  { id: 'p09', title: '플로 뮤직 월구독', brand: 'FLO', priceKrw: 8000, discountRate: 12, thumbnailUrl: pic('flo'), tags: ['음악'] },
  { id: 'p10', title: '지니뮤직 월정액', brand: 'Genie', priceKrw: 8400, thumbnailUrl: pic('genie'), tags: ['음악'] },
];

export const featured = mockProducts[0];
