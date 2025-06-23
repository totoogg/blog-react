import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig, AppDispatch } from "@/app/providers/StoreProvider";
import {
  getArticlePageHasMore,
  getArticlePageIsLoading,
  getArticlePageNum,
} from "../../selectors/articlePageSelectors";
import { articlePageAction } from "../../slices/articlePageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlePage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/fetchNextArticlePage", async (_, { getState, dispatch }) => {
  const page = getArticlePageNum(getState());
  const hasMore = getArticlePageHasMore(getState());
  const isLoading = getArticlePageIsLoading(getState());

  if (hasMore && !isLoading) {
    dispatch(articlePageAction.setPage(page + 1));
    (dispatch as AppDispatch)(fetchArticlesList({}));
  }
});
