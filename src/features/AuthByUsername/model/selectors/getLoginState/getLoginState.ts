import { StateSchema } from "app/providers/StoryProvider";

export const getLoginState = (state: StateSchema) => state?.loginForm;
