import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';
import React from 'react';

const meta = {
  title: 'entities/comment/CommentList',
  component: CommentList,

  tags: ['autodocs'],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    comments: [
      {
        id: '1',
        text: 'some comment 1',
        user: { id: '1', username: 'XXXXX' },
      },
      {
        id: '2',
        text: 'some comment 2',
        user: { id: '1', username: 'XXXXX' },
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Dark: Story = {
  args: {
    comments: [
      {
        id: '1',
        text: 'some comment 1',
        user: { id: '1', username: 'XXXXX' },
      },
      {
        id: '2',
        text: 'some comment 2',
        user: { id: '1', username: 'XXXXX' },
      },
    ],
  },
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
