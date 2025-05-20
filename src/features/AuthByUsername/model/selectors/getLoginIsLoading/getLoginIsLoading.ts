import { StateSchema } from "app/providers/StoryProvider";

export const getLoginIsLoading = (state: StateSchema) =>
  state?.loginForm?.isLoading || false;
