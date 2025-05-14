import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AppLink, AppLinkTheme } from "./AppLink";

const meta = {
  title: "shared/AppLink",
  component: AppLink,

  tags: ["autodocs"],

  args: { onClick: fn(), to: "/", children: "Text" },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
  },
};

export const SecondaryDark: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
  },
  decorators: [
    (Story) => (
      <div className="app dark">
        <Story />
      </div>
    ),
  ],
};
