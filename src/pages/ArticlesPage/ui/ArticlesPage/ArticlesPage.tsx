import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPage.module.scss";
import { ArticleList } from "entities/Article";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articlePageReducer,
  getArticles,
} from "../../model/slices/articlePageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelectors";
import { Page } from "widgets/Page/Page";
import { fetchNextArticlePage } from "../../model/services/fetchNextArticlePage/fetchNextArticlePage";
import { initArticlePage } from "../../model/services/initArticlePage/initArticlePage";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { useSearchParams } from "react-router-dom";

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlePage: articlePageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlePageIsLoading);
  const view = useSelector(getArticlePageView);
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initArticlePage(searchParams));
  });

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.articlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
