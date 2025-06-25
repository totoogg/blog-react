import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { useEffect } from 'react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { userReducer } from '@/entities/User';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { DeepPartial } from '@/shared/lib/deepPartial/deepPartial';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  user: userReducer,
};

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,

  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAuthLight: Story = {};

export const NoAuthDark: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add('app_dark_theme');
        return () => {
          document.body.classList.remove('app_dark_theme');
        };
      }, []);

      return (
        <div className="app app_dark_theme">
          <Story />
        </div>
      );
    },
  ],
};

export const AuthDark: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add('app_dark_theme');
        return () => {
          document.body.classList.remove('app_dark_theme');
        };
      }, []);

      return (
        <StoreProvider
          asyncReducers={defaultAsyncReducers}
          initialState={{
            user: {
              authData: {},
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

export const AuthLight: Story = {
  decorators: [
    (Story) => (
      <StoreProvider
        asyncReducers={defaultAsyncReducers}
        initialState={{
          user: {
            authData: {},
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
