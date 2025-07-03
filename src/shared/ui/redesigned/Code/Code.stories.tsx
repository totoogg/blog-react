import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';
import React from 'react';

const meta = {
  title: 'shared/Code',
  component: Code,

  tags: ['autodocs'],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    text: `import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "./Code";
import React from "react";

const meta = {
  title: "shared/Code",
  component: Code,

  tags: ["autodocs"],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;`,
  },
};

export const Dark: Story = {
  args: {
    text: `import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "./Code";
import React from "react";

const meta = {
  title: "shared/Code",
  component: Code,

  tags: ["autodocs"],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;`,
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
