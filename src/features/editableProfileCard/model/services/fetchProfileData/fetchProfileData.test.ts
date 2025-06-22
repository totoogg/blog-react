import { Profile } from "@/entities/Profile";
import { fetchProfileData } from "./fetchProfileData";
import {
  ActionCreateType,
  TestAsyncThunk,
} from "@/shared/lib/tests/TestsAsyncThunk/TestsAsyncThunk";

const data = {
  age: 10,
  lastname: "lastName",
  first: "name",
  avatar: "avatar",
};

describe("fetchProfileData", () => {
  test("successes", async () => {
    const thunk = new TestAsyncThunk(
      fetchProfileData as ActionCreateType<Profile, string, string>
    );
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk("1");

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error", async () => {
    const thunk = new TestAsyncThunk(
      fetchProfileData as ActionCreateType<Profile, string, string>
    );
    thunk.api.get.mockReturnValue(Promise.reject({ data: 403 }));
    const result = await thunk.callThunk("1");

    expect(result.meta.requestStatus).toBe("rejected");
  });
});
