import { StateSchema } from "app/providers/StoryProvider";

export const getUserInited = (state: StateSchema) => state.user._inited;
