import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
    ));

export const ArticleList: FC<ArticleListProps> = memo(
  ({ className, articles, isLoading, view = ArticleView.SMALL }) => {
    const renderArticle = (article: Article) => (
      <ArticleListItem
        view={view}
        article={article}
        className={cls.card}
        key={article.id}
      />
    );

    if (isLoading) {
      return (
        <div
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          {getSkeletons(view)}
        </div>
      );
    }

    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </div>
    );
  }
);

ArticleList.displayName = "ArticleList";
