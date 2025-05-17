import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Modal } from "./Modal";
import { Theme, ThemeProvider } from "app/providers/ThemeProvider";

const meta = {
  title: "shared/Modal",
  component: Modal,

  tags: ["autodocs"],

  args: { onClose: fn() },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    children: "Text",
  },
};

export const Dark: Story = {
  args: {
    isOpen: true,
    children: "Text",
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme={Theme.DARK}>
        <div className="app dark">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
