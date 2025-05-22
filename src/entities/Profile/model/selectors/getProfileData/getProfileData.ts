import { StateSchema } from "app/providers/StoryProvider";

export const getProfileData = (state: StateSchema) => state.profile?.data;
