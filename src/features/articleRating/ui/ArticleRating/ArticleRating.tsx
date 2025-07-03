import { RatingCard } from '@/entities/Rating';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating: FC<ArticleRatingProps> = memo(
  ({ className, articleId }) => {
    const { t } = useTranslation();
    const userId = useSelector(getUserAuthData);
    const { data, isLoading } = useArticleRating({
      articleId,
      userId: userId?.id ?? '',
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
      (star: number, feedback?: string) => {
        try {
          rateArticleMutation({
            userId: userId?.id ?? '',
            articleId,
            rate: star,
            feedback,
          });
        } catch (error) {
          console.log(error);
        }
      },
      [articleId, rateArticleMutation, userId?.id],
    );

    const onCancel = useCallback(
      (star: number) => {
        handleRateArticle(star);
      },
      [handleRateArticle],
    );

    const onAccept = useCallback(
      (star: number, feedback?: string) => {
        handleRateArticle(star, feedback);
      },
      [handleRateArticle],
    );

    const Skeleton = SkeletonRedesigned;

    if (isLoading) {
      return <Skeleton width={'100%'} height={120} />;
    }

    const rating = data?.[0];

    return (
      <RatingCard
        onCancel={onCancel}
        onAccept={onAccept}
        rate={rating?.rate}
        title={t('rateArticle')}
        hasFeedback
        feedbackTitle={t('commitArticle')}
        className={className}
      />
    );
  },
);

ArticleRating.displayName = 'ArticleRating';

export default ArticleRating;
