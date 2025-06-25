import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
    ));

export const ArticleList: FC<ArticleListProps> = memo(
  ({ className, articles, isLoading, view = ArticleView.SMALL, target }) => {
    const { t } = useTranslation();

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t('ArticleNotFound')} />
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.articleList, {}, [className, cls[view]])}
        data-testId="ArticleList"
      >
        {articles.map((el) => (
          <ArticleListItem
            article={el}
            view={view}
            className={cls.card}
            target={target}
            key={el.id}
          />
        ))}
        {isLoading && getSkeletons(view)}
      </div>
    );
  },
);

ArticleList.displayName = 'ArticleList';
