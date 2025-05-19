import type { Meta, StoryObj } from "@storybook/react";
import { Text, TextTheme } from "./Text";

const meta = {
  title: "shared/Text",
  component: Text,

  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Title",
    text: "Text",
  },
};

export const Error: Story = {
  args: {
    title: "Title",
    text: "Text",
    theme: TextTheme.ERROR,
  },
};

export const OnlyText: Story = {
  args: {
    text: "Text",
  },
};

export const OnlyTitle: Story = {
  args: {
    title: "Title",
  },
};

export const PrimaryDark: Story = {
  args: {
    title: "Title",
    text: "Text",
  },
  decorators: [
    (Story) => (
      <div className="app dark">
        <Story />
      </div>
    ),
  ],
};

export const OnlyTextDark: Story = {
  args: {
    text: "Text",
  },
  decorators: [
    (Story) => (
      <div className="app dark">
        <Story />
      </div>
    ),
  ],
};

export const OnlyTitleDark: Story = {
  args: {
    title: "Title",
  },
  decorators: [
    (Story) => (
      <div className="app dark">
        <Story />
      </div>
    ),
  ],
};
