import { FC } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";
import { DeepPartial } from "shared/lib/deepPartial/deepPartial";

interface StoryProviderProps {
  children: React.ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: FC<StoryProviderProps> = ({
  children,
  initialState,
}) => {
  const store = createReduxStore(initialState as StateSchema);

  return <Provider store={store}>{children}</Provider>;
};
