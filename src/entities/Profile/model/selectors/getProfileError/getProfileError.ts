import { StateSchema } from "app/providers/StoryProvider";

export const getProfileError = (state: StateSchema) => state.profile?.error;
