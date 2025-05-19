import { StateSchema } from "app/providers/StoryProvider";

export const getUserAuthData = (state: StateSchema) => state.user.authData;
