import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoryProvider";
import axios, { AxiosStatic } from "axios";

type ActionCreateType<Return, Arg, RejectValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectValue }>;

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

export class TestAsyncThunk<Return, Arg, RejectValue> {
  dispatch: Dispatch;
  getState: () => StateSchema;
  actionCreator: ActionCreateType<Return, Arg, RejectValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: jest.MockedFn<any>;

  constructor(actionCreator: ActionCreateType<Return, Arg, RejectValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    });

    return result;
  }
}
