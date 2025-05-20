import { StateSchema } from "app/providers/StoryProvider";

export const getLoginUsername = (state: StateSchema) =>
  state?.loginForm?.username || "";
