import type { Meta, StoryObj } from '@storybook/react';
import ArticlesPage from './ArticlesPage';
import React from 'react';
import Avatar from '@/shared/assets/tests/storybook.jpg';
import { http, HttpResponse } from 'msw';
import { Article, ArticleType } from '@/entities/Article';

const article: Article = {
  id: '1',
  img: Avatar,
  title: 'Article 1',
  createdAt: '2021-01-01',
  views: 100,
  user: {
    id: '1',
    username: 'XXXXX',
    avatar: Avatar,
  },
  type: [ArticleType.IT],
  blocks: [],
  subtitle: '',
};

const meta = {
  title: 'pages/ArticlesPage/ArticlesPage',
  component: ArticlesPage,
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + '/articles?_limit=3', () => {
          return HttpResponse.json([
            { ...article, id: '1' },
            { ...article, id: '2' },
            { ...article, id: '3' },
            { ...article, id: '4' },
          ]);
        }),
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArticlesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

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
        <div className="app app_dark_theme">
          <Story />
        </div>
      );
    },
  ],
};
