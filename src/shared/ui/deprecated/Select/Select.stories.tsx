import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { useEffect } from 'react';

const meta = {
  title: 'shared/deprecated/Select',
  component: Select,

  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Label',
    options: [
      { value: '1', content: '1' },
      { value: '2', content: '2' },
      { value: '3', content: '3' },
    ],
  },
};

export const Dark: Story = {
  args: {
    label: 'Label',
    options: [
      { value: '1', content: '1' },
      { value: '2', content: '2' },
      { value: '3', content: '3' },
    ],
  },
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
