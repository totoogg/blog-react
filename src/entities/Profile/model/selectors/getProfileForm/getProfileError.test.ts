import { StateSchema } from "app/providers/StoryProvider";
import { DeepPartial } from "shared/lib/deepPartial/deepPartial";
import { getProfileForm } from "./getProfileForm";

describe("getProfileForm", () => {
  test("should return form", () => {
    const data = {
      age: 10,
      lastname: "lastName",
      first: "name",
      avatar: "avatar",
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };

    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
