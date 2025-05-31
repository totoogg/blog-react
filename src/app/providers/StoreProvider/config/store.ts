import {
  configureStore,
  Middleware,
  Reducer,
  ReducersMapObject,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { userReducer } from "entities/User";
import { counterReducer } from "entities/Counter";
import { createReducerManager } from "./reducerManager";
import { $api } from "shared/api/api";

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }) as Tuple<[Middleware]>,
  });

  // @ts-expect-error-next-line
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ThunkDispatch<
  StateSchema,
  ThunkExtraArg,
  UnknownAction
>;
