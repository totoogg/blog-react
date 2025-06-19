import { StateSchema } from "app/providers/StoreProvider";
import { DeepPartial } from "shared/lib/deepPartial/deepPartial";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

describe("getProfileValidateErrors", () => {
  test("should return validate errors", () => {
    const errors: ValidateProfileError[] = [
      ValidateProfileError.INCORRECT_USER_AGE,
    ];
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: errors,
      },
    };

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
