import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  getArticlePageView,
  getArticlePageSort,
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageType,
} from '../../model/selectors/articlePageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlePageAction } from '../../model/slices/articlePageSlice';

export function useArticleFilter() {
  const view = useSelector(getArticlePageView);
  const sort = useSelector(getArticlePageSort);
  const order = useSelector(getArticlePageOrder);
  const search = useSelector(getArticlePageSearch);
  const type = useSelector(getArticlePageType);

  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debounceFetcherData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageAction.setView(view));
      dispatch(articlePageAction.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlePageAction.setSort(newSort));
      dispatch(articlePageAction.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (newSort: SortOrder) => {
      dispatch(articlePageAction.setOrder(newSort));
      dispatch(articlePageAction.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlePageAction.setSearch(search));
      dispatch(articlePageAction.setPage(1));
      debounceFetcherData();
    },
    [debounceFetcherData, dispatch],
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlePageAction.setType(value));
      dispatch(articlePageAction.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return {
    sort,
    view,
    order,
    search,
    type,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
  };
}
