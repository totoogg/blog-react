import { StateSchema } from "@/app/providers/StoreProvider";
import { DeepPartial } from "@/shared/lib/deepPartial/deepPartial";
import { getLoginIsLoading } from "./getLoginIsLoading";

describe("getLoginIsLoading", () => {
  test("should return true", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: { isLoading: true },
    };

    expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
  });

  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
  });
});
