import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AppLink } from './AppLink';
import React from 'react';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,

  tags: ['autodocs'],

  args: { onClick: fn(), to: '/', children: 'Text' },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
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
