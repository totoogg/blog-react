import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPage.module.scss";
import {
  ArticleList,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articlePageAction,
  articlePageReducer,
  getArticles,
} from "../../model/slices/articlePageSlice";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { useSelector } from "react-redux";
import {
  getArticlePageIsLoading,
  getArticlePageView,
} from "../../model/selectors/articlePageSelectors";
import { Page } from "shared/ui/Page/Page";
import { fetchNextArticlePage } from "../../model/services/fetchNextArticlePage/fetchNextArticlePage";

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

  useInitialEffect(() => {
    dispatch(articlePageAction.initState());
    dispatch(fetchArticlesList({ page: 1 }));
  });

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage());
  }, [dispatch]);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageAction.setView(view));
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.articlesPage, {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList articles={articles} isLoading={isLoading} view={view} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
