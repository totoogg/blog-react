import { DeepPartial } from "shared/lib/deepPartial/deepPartial";
import { profileActions, profileReducer } from "./profileSlice";
import { Country } from "entities/Country";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import {
  ProfileSchema,
  ValidateProfileError,
} from "../types/editableProfileCardSchema";

const data = {
  age: 10,
  lastname: "lastName",
  first: "name",
  avatar: "avatar",
  country: Country.Belarus,
};

describe("profileSlice", () => {
  test("test set readonly", () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({ readonly: true });
  });

  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: "" },
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({ readonly: true, validateErrors: undefined, data, form: data });
  });

  test("test update profile", () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { username: "" },
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: "123" })
      )
    ).toEqual({ form: { username: "123" } });
  });

  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.SERVER_ERROR],
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.pending("", undefined)
      )
    ).toEqual({ isLoading: true, validateError: undefined });
  });

  test("test update profile service fulfilled", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, "")
      )
    ).toEqual({
      isLoading: false,
      validateError: undefined,
      readonly: true,
      form: data,
      data,
    });
  });
});
