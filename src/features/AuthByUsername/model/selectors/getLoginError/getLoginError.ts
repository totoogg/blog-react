import { StateSchema } from "app/providers/StoryProvider";

export const getLoginError = (state: StateSchema) => state?.loginForm?.error;
