'use client';

import {
  Card,
  CardThumbnail,
  CardContent,
  CardTitle,
  CardCaption,
  Typography,
  TextButton,
} from '@wanteddev/wds';
import type { ReactNode } from 'react';
import type { MockProduct } from './_mock';

export const HorizontalScroll = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      padding: '0 16px 16px',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {children}
  </div>
);

type SectionHeaderProps = {
  title: string;
  caption?: string;
  onSeeAll?: () => void;
};

export const SectionHeader = ({ title, caption, onSeeAll }: SectionHeaderProps) => (
  <div
    style={{
      padding: '20px 16px 12px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="headline1" weight="bold">
        {title}
      </Typography>
      {caption && (
        <Typography variant="caption1" color="semantic.label.alternative">
          {caption}
        </Typography>
      )}
    </div>
    {onSeeAll && <TextButton onClick={onSeeAll}>전체보기</TextButton>}
  </div>
);

export const ProductCard = ({ product }: { product: MockProduct }) => (
  <div style={{ flexShrink: 0 }}>
    <Card width="160px" platform="mobile">
      <CardThumbnail
        src={product.thumbnailUrl}
        alt={product.title}
        ratio="1:1"
      />
      <CardContent>
        <CardTitle variant="body2" weight="medium">
          {product.title}
        </CardTitle>
        <CardCaption variant="caption1">{product.brand}</CardCaption>
        <CardCaption variant="body2" weight="bold" color="semantic.label.normal">
          {product.discountRate ? (
            <>
              <span style={{ color: '#ef4444', marginRight: 4 }}>
                {product.discountRate}%
              </span>
              {product.priceKrw.toLocaleString()}원
            </>
          ) : (
            <>{product.priceKrw.toLocaleString()}원</>
          )}
        </CardCaption>
      </CardContent>
    </Card>
  </div>
);
