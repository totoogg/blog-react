import { FeatureFlags } from '@/shared/types/featureFlag';
import { setFeatureFlags } from '@/shared/lib/features';
import { ReactRenderer } from '@storybook/react/*';
import { PartialStoryFn } from 'storybook/internal/types';

export const FeaturesFlagsDecorator =
  (features: FeatureFlags) =>
  // eslint-disable-next-line react/display-name
  (
    StoryComponent: PartialStoryFn<
      ReactRenderer,
      {
        [x: string]: unknown;
      }
    >,
  ) => {
    setFeatureFlags(features);
    return <StoryComponent />;
  };
