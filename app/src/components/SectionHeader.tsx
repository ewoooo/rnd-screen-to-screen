'use client';

import { FlexBox, Typography, TextButton } from '@wanteddev/wds';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  caption?: string;
  action?: ReactNode;
  onSeeAll?: () => void;
};

export const SectionHeader = ({ title, caption, action, onSeeAll }: Props) => {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="space-between"
      sx={{ padding: '20px 16px 12px', width: '100%' }}
    >
      <FlexBox flexDirection="column" gap="2px">
        <Typography variant="headline1" weight="bold">
          {title}
        </Typography>
        {caption && (
          <Typography variant="caption1" color="semantic.label.alternative">
            {caption}
          </Typography>
        )}
      </FlexBox>
      {action ?? (onSeeAll && <TextButton onClick={onSeeAll}>전체보기</TextButton>)}
    </FlexBox>
  );
};
