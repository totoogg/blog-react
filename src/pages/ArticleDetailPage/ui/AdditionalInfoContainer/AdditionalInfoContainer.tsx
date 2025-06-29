import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditional } from '@/widgets/ArticleAdditional';
import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cls from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleDetails } from '@/shared/const/router';

export const AdditionalInfoContainer: FC = memo(() => {
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleDetails(article.id) + '/edit');
    }
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card padding="24" border="partial" className={cls.card}>
      <ArticleAdditional
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});

AdditionalInfoContainer.displayName = 'AdditionalInfoContainer';
