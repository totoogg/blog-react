import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import React from 'react';

const meta = {
  title: 'shared/Button',
  component: Button,

  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Text',
  },
};

export const Clear: Story = {
  args: {
    children: 'Text',
    variant: 'clear',
  },
};

export const Outline: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
  },
};

export const Square: Story = {
  args: {
    children: 'Text',
    square: true,
  },
};

export const SquareM: Story = {
  args: {
    children: 'Text',
    square: true,
    size: 'sizeM',
  },
};

export const SquareL: Story = {
  args: {
    children: 'Text',
    square: true,
    size: 'sizeL',
  },
};

export const SquareXL: Story = {
  args: {
    children: 'Text',
    square: true,
    size: 'sizeXl',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Text',
    disabled: true,
  },
};

export const OutlineDark: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
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
