import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { getArticlePageInited } from "../../selectors/articlePageSelectors";
import { articlePageAction } from "../../slices/articlePageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { AppDispatch } from "app/providers/StoreProvider";
import { SortOrder } from "shared/types";
import { ArticleSortField } from "entities/Article";

export const initArticlePage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  "articlesPage/initArticlePage",
  async (searchParams, { getState, dispatch }) => {
    const inited = getArticlePageInited(getState());

    if (!inited) {
      const orderFromUrl = searchParams.get("order") as SortOrder;
      const sortFromUrl = searchParams.get("sort") as ArticleSortField;
      const searchFromUrl = searchParams.get("search");

      if (orderFromUrl) {
        dispatch(articlePageAction.setOrder(orderFromUrl));
      }
      if (sortFromUrl) {
        dispatch(articlePageAction.setSort(sortFromUrl));
      }
      if (searchFromUrl) {
        dispatch(articlePageAction.setSearch(searchFromUrl));
      }

      dispatch(articlePageAction.initState());
      (dispatch as AppDispatch)(fetchArticlesList({}));
    }
  }
);
