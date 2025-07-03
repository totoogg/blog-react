import type { Meta, StoryObj } from '@storybook/react';
import { ArticleTypeTabs } from './ArticleTypeTabs';
import { action } from '@storybook/addon-actions';
import React from 'react';
import { ArticleType } from '@/entities/Article';

const meta = {
  title: 'entities/Article/ArticleTypeTabs',
  component: ArticleTypeTabs,

  tags: ['autodocs'],
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    value: ArticleType.ALL,
    onChangeType: action('onChangeType'),
  },
};

export const Dark: Story = {
  args: {
    value: ArticleType.ALL,
    onChangeType: action('onChangeType'),
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
