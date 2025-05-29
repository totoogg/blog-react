import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { fetchNextArticlePage } from "./fetchNextArticlePage";
import {
  ActionCreateType,
  TestAsyncThunk,
} from "shared/lib/tests/TestsAsyncThunk/TestsAsyncThunk";

jest.mock("../fetchArticlesList/fetchArticlesList");

describe("fetchNextArticlePage", () => {
  test("successes", async () => {
    const thunk = new TestAsyncThunk(
      fetchNextArticlePage as ActionCreateType<void, void, string>,
      {
        articlePage: {
          page: 2,
          ids: [],
          entities: {},
          limit: 5,
          isLoading: false,
          hasMore: true,
        },
      }
    );

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
  });

  test("fetchArticleList not called", async () => {
    const thunk = new TestAsyncThunk(
      fetchNextArticlePage as ActionCreateType<void, void, string>,
      {
        articlePage: {
          page: 2,
          ids: [],
          entities: {},
          limit: 5,
          isLoading: false,
          hasMore: false,
        },
      }
    );

    await thunk.callThunk();

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
