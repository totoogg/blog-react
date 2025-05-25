import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types/profile";
import { ThunkConfig } from "app/providers/StoreProvider/config/StateSchema";

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/fetchProfileData", async (_, { extra, rejectWithValue }) => {
  try {
    const response = await extra.api.get<Profile>("/profile");

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue("error");
  }
});
