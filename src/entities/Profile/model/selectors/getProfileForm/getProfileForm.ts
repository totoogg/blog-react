import { StateSchema } from "app/providers/StoryProvider";

export const getProfileForm = (state: StateSchema) => state.profile?.form;
