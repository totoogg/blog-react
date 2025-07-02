import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

const Skeleton = SkeletonRedesigned;

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
  <Suspense fallback={<Skeleton width={'100%'} height={140} />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
);
