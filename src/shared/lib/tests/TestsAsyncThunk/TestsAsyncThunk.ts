import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { ThunkExtraArg } from "app/providers/StoreProvider/config/StateSchema";
import axios, { AxiosStatic } from "axios";
import { DeepPartial } from "../../../lib/deepPartial/deepPartial";

export type ActionCreateType<Return, Arg, RejectValue> = (
  arg: Arg
) => AsyncThunkAction<
  Return,
  Arg,
  {
    rejectValue: RejectValue;
    extra: ThunkExtraArg;
    state: StateSchema;
  }
>;

jest.mock("axios");

const mockedAxios = jest.mocked(axios);

export class TestAsyncThunk<Return, Arg, RejectValue> {
  dispatch: Dispatch;
  getState: () => StateSchema;
  actionCreator: ActionCreateType<Return, Arg, RejectValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: jest.MockedFn<any>;

  constructor(
    actionCreator: ActionCreateType<Return, Arg, RejectValue>,
    state?: DeepPartial<StateSchema>
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => (state || {}) as StateSchema);

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg?: Arg) {
    const action = this.actionCreator(arg!);
    return action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    } as ThunkExtraArg);
  }
}
