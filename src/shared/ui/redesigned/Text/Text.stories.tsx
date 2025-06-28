import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import React from 'react';

const meta = {
  title: 'shared/Text',
  component: Text,

  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Title',
    text: 'Text',
  },
};

export const Error: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    theme: 'error',
  },
};

export const OnlyText: Story = {
  args: {
    text: 'Text',
  },
};

export const OnlyTitle: Story = {
  args: {
    title: 'Title',
  },
};

export const PrimaryDark: Story = {
  args: {
    title: 'Title',
    text: 'Text',
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

export const OnlyTextDark: Story = {
  args: {
    text: 'Text',
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

export const OnlyTitleDark: Story = {
  args: {
    title: 'Title',
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

export const SizeL: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    size: 'sizeL',
  },
};

export const SizeM: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    size: 'sizeM',
  },
};

export const SizeS: Story = {
  args: {
    title: 'Title',
    text: 'Text',
    size: 'sizeS',
  },
};
