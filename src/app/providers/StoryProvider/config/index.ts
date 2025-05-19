import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { userReducer } from "entities/User";
import { loginReducer } from "features/AuthByUsername";
import { useDispatch } from "react-redux";
import { counterReducer } from "entities/Counter";

export const createReduxStor = (initialState?: StateSchema) => {
  const rootReducer: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
};

export type AppDispatch = ReturnType<typeof createReduxStor>["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()