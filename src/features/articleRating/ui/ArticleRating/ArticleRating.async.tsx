import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

const Skeleton = toggleFeatures({
  name: 'isAppRedesigned',
  off: () => SkeletonDeprecated,
  on: () => SkeletonRedesigned,
});

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
  <Suspense fallback={<Skeleton width={'100%'} height={140} />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
);
