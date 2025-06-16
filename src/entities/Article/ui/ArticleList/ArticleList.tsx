import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const renderArticle = (article: Article) => (
      <ArticleListItem
        view={view}
        article={article}
        className={cls.card}
        key={article.id}
      />
    );

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t("ArticleNotFound")} />
        </div>
      );
    }

    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
        {isLoading && getSkeletons(view)}
      </div>
    );
  }
);

ArticleList.displayName = "ArticleList";
