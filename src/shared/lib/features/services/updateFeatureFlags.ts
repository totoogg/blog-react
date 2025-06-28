import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '../api/featureFlagApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';
import { FeatureFlags } from '@/shared/types/featureFlag';

interface UpdateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
>('user/saveJsonSettings', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlags(),
          ...newFeatures,
        },
      }) as unknown as AnyAction,
    );

    window.location.reload();
    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue('');
  }
});
