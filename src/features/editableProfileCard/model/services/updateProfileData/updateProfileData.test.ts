import { Country } from "entities/Country";
import { updateProfileData } from "./updateProfileData";
import {
  ActionCreateType,
  TestAsyncThunk,
} from "shared/lib/tests/TestsAsyncThunk/TestsAsyncThunk";
import { Profile } from "entities/Profile";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

const data = {
  id: "1",
  age: 10,
  lastname: "lastName",
  first: "name",
  avatar: "avatar",
  country: Country.Russia,
};

describe("updateProfileData", () => {
  test("successes", async () => {
    const thunk = new TestAsyncThunk(
      updateProfileData as ActionCreateType<Profile, void, string>,
      { profile: { form: data } }
    );

    thunk.api.put.mockResolvedValue({ data });
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("server error", async () => {
    const thunk = new TestAsyncThunk(
      updateProfileData as ActionCreateType<Profile, void, string>,
      { profile: { form: data } }
    );

    thunk.api.put.mockRejectedValue({ response: { status: 403 } });
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test("validation error", async () => {
    const thunk = new TestAsyncThunk(
      updateProfileData as ActionCreateType<Profile, void, string>,
      { profile: { form: { ...data, lastname: "" } } }
    );

    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
