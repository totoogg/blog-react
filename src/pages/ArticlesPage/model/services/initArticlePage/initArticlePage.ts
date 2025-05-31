import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";
import { getArticlePageInited } from "../../selectors/articlePageSelectors";
import { articlePageAction } from "../../slices/articlePageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { AppDispatch } from "app/providers/StoreProvider";

export const initArticlePage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/initArticlePage", async (_, { getState, dispatch }) => {
  const inited = getArticlePageInited(getState());

  if (!inited) {
    dispatch(articlePageAction.initState());
    (dispatch as AppDispatch)(fetchArticlesList({ page: 1 }));
  }
});
