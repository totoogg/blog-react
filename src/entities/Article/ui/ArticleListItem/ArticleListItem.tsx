import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import { Article } from '../../model/types/article';
import { ArticleView } from '../../model/consts/consts';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
  return <ArticleListItemRedesigned {...props} />;
});

ArticleListItem.displayName = 'ArticleListItem';
