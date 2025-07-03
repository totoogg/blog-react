import type { Meta, StoryObj } from '@storybook/react';
import ArticleRating from './ArticleRating';
import { http, HttpResponse } from 'msw';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/deepPartial/deepPartial';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  user: userReducer,
};

const meta = {
  title: 'features/ArticleRating',
  component: ArticleRating,

  tags: ['autodocs'],
} satisfies Meta<typeof ArticleRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rate: Story = {
  args: {
    articleId: '1',
  },
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/article-ratings?userId=1&articleId=1', () => {
          return HttpResponse.json([{ rate: 3 }]);
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <StoreProvider
        asyncReducers={defaultAsyncReducers}
        initialState={{
          user: {
            authData: { id: '1' },
          },
        }}
      >
        <div className="app app_dark_theme">
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
};

export const WithoutRate: Story = {
  args: {
    articleId: '1',
  },
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/article-ratings?userId=1&articleId=1', () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <StoreProvider
        asyncReducers={defaultAsyncReducers}
        initialState={{
          user: {
            authData: { id: '1' },
          },
        }}
      >
        <div className="app app_dark_theme">
          <Story />
        </div>
      </StoreProvider>
    ),
  ],
};
