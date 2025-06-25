import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import React from 'react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { DeepPartial } from '@/shared/lib/deepPartial/deepPartial';
import { Country } from '@/entities/Country';
import { profileReducer } from '@/features/editableProfileCard';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  profile: profileReducer,
};

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,

  tags: ['autodocs'],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        asyncReducers={defaultAsyncReducers}
        initialState={{
          profile: {
            form: {
              username: 'DmitrySmit',
              age: 35,
              country: Country.Russia,
              lastname: 'Smit',
              first: 'Dmitry',
              city: 'Tver',
            },
          },
        }}
      >
        <div className="app">
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
};

export const Dark: Story = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.body.classList.add('app_dark_theme');
        return () => {
          document.body.classList.remove('app_dark_theme');
        };
      }, []);

      return (
        <StoreProvider
          asyncReducers={defaultAsyncReducers}
          initialState={{
            profile: {
              form: {
                username: 'DmitrySmit',
                age: 35,
                country: Country.Russia,
                lastname: 'Smit',
                first: 'Dmitry',
                city: 'Tver',
              },
            },
          }}
        >
          <div className="app app_dark_theme">
            <Story />
          </div>
        </StoreProvider>
      );
    },
  ],
};
