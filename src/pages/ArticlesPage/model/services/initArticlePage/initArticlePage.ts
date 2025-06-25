import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlePageInited } from '../../selectors/articlePageSelectors';
import { articlePageAction } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { AppDispatch } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField, ArticleType } from '@/entities/Article';

export const initArticlePage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'articlesPage/initArticlePage',
  async (searchParams, { getState, dispatch }) => {
    const inited = getArticlePageInited(getState());

    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const sortFromUrl = searchParams.get('sort') as ArticleSortField;
      const searchFromUrl = searchParams.get('search');
      const typeFromUrl = searchParams.get('type') as ArticleType;

      if (orderFromUrl) {
        dispatch(articlePageAction.setOrder(orderFromUrl));
      }
      if (sortFromUrl) {
        dispatch(articlePageAction.setSort(sortFromUrl));
      }
      if (searchFromUrl) {
        dispatch(articlePageAction.setSearch(searchFromUrl));
      }
      if (typeFromUrl) {
        dispatch(articlePageAction.setType(typeFromUrl));
      }

      dispatch(articlePageAction.initState());
      (dispatch as AppDispatch)(fetchArticlesList({}));
    }
  },
);
