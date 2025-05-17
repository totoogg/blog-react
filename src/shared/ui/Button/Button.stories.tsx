import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, ButtonSize, ButtonTheme } from "./Button";

const meta = {
  title: "shared/Button",
  component: Button,

  tags: ["autodocs"],

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Text",
  },
};

export const Clear: Story = {
  args: {
    children: "Text",
    theme: ButtonTheme.CLEAR,
  },
};

export const ClearInverted: Story = {
  args: {
    children: "Text",
    theme: ButtonTheme.CLEAR_INVERTED,
  },
};

export const Background: Story = {
  args: {
    children: "Text",
    theme: ButtonTheme.BACKGROUND,
  },
};

export const BackgroundInverted: Story = {
  args: {
    children: "Text",
    theme: ButtonTheme.BACKGROUND_INVERTED,
  },
};

export const Outline: Story = {
  args: {
    children: "Text",
    theme: ButtonTheme.OUTLINE,
  },
};

export const Square: Story = {
  args: {
    children: "Text",
    square: true,
  },
};

export const SquareM: Story = {
  args: {
    children: "Text",
    square: true,
    size: ButtonSize.M,
  },
};

export const SquareL: Story = {
  args: {
    children: "Text",
    square: true,
    size: ButtonSize.L,
  },
};

export const SquareXL: Story = {
  args: {
    children: "Text",
    square: true,
    size: ButtonSize.XL,
  },
};

export const OutlineDark: Story = {
  args: {
    children: "Text",
    theme: ButtonTheme.OUTLINE,
  },
  decorators: [
    (Story) => (
      <div className="app dark">
        <Story />
      </div>
    ),
  ],
};
