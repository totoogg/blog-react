import { StateSchema } from "app/providers/StoryProvider";

export const getProfileIsLoading = (state: StateSchema) =>
  state.profile?.isLoading;
