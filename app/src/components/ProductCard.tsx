'use client';

import {
  Card,
  CardThumbnail,
  CardContent,
  CardContentItem,
  CardTitle,
  CardCaption,
  ContentBadge,
} from '@wanteddev/wds';
import type { MockProduct } from '@/mock/products';

type Props = {
  product: MockProduct;
  width?: number | string;
};

export const ProductCard = ({ product, width = 140 }: Props) => {
  return (
    <Card width={width} platform="mobile" sx={{ flexShrink: 0 }}>
      <CardThumbnail src={product.thumbnailUrl} alt={product.title} ratio="1:1" />
      <CardContent>
        {product.badge && (
          <CardContentItem position="top" variant="badge">
            <ContentBadge color="neutral">{product.badge}</ContentBadge>
          </CardContentItem>
        )}
        <CardTitle variant="body2" weight="medium" noWrap>
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
  );
};
