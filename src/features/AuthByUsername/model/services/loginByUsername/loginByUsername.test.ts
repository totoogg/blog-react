import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { loginByUsername } from "./loginByUsername";
import { StateSchema } from "app/providers/StoryProvider";
import { userActions } from "entities/User";
import { TestAsyncThunk } from "shared/lib/tests/TestsAsyncThunk/TestsAsyncThunk";
import { ThunkExtraArg } from "app/providers/StoryProvider/config/StateSchema";
import { $api } from "shared/api/api";

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

describe("loginByUsername", () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  test("successes login", async () => {
    const mockedAxios = jest.mocked($api);
    mockedAxios.post.mockRejectedValue({ data: 403 });

    const mockExtra: ThunkExtraArg = {
      api: mockedAxios,
      navigate: jest.fn(),
    };
    const userValue = { id: "1", username: "123" };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const action = loginByUsername({ password: "123", username: "123" });
    const result = await action(dispatch, getState, mockExtra);

    expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login", async () => {
    const mockedAxios = jest.mocked($api);
    mockedAxios.post.mockRejectedValue({ data: 403 });

    const mockExtra: ThunkExtraArg = {
      api: mockedAxios,
      navigate: jest.fn(),
    };

    mockedAxios.post.mockReturnValue(Promise.reject({ data: 403 }));
    const action = loginByUsername({ password: "123", username: "123" });
    const result = await action(dispatch, getState, mockExtra);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });

  test("successes login with TestAsyncThunk", async () => {
    const userValue = { id: "1", username: "123" };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ password: "123", username: "123" });

    expect(thunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(userValue)
    );
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(userValue);
  });

  test("error login with TestAsyncThunk", async () => {
    mockedAxios.post.mockReturnValue(Promise.reject({ data: 403 }));
    const thunk = new TestAsyncThunk(loginByUsername);
    const result = await thunk.callThunk({ password: "123", username: "123" });

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("error");
  });
});
