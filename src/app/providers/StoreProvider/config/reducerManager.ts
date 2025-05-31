import {
  Action,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from "./StateSchema";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers as ReducersMapObject);
  let keysToRemove: StateSchemaKey[] = [];
  const mountedReducers: MountedReducers = {};

  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,
    reduce: (state: StateSchema | undefined, action: Action) => {
      let newState = state;
      if (keysToRemove.length > 0 && state) {
        newState = { ...state };
        keysToRemove.forEach((key) => {
          if (newState) {
            delete newState[key];
          }
        });
        keysToRemove = [];
      }
      return combinedReducer(newState, action) as StateSchema;
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      mountedReducers[key] = true;
      combinedReducer = combineReducers(reducers as ReducersMapObject);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      mountedReducers[key] = false;

      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers as ReducersMapObject);
    },
  };
}
