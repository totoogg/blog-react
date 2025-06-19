import { FC, memo } from "react";
import { ArticleList } from "entities/Article";
import {
  getArticlePageError,
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelectors";
import { getArticles } from "../../model/slices/articlePageSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo(
  ({ className }) => {
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const view = useSelector(getArticlePageView);
    const error = useSelector(getArticlePageError);

    if (error) {
      return <Text text={t("errorArticle")} />;
    }

    return (
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        view={view}
        className={className}
      />
    );
  }
);

ArticleInfiniteList.displayName = "ArticleInfiniteList";
