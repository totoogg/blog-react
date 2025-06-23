import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Modal } from "./Modal";
// eslint-disable-next-line blog2Plugin/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import React from "react";
import { Theme } from "@/shared/const/theme";

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
    (Story) => {
      React.useEffect(() => {
        document.body.classList.add("app_dark_theme");
        return () => {
          document.body.classList.remove("app_dark_theme");
        };
      }, []);

      return (
        <ThemeProvider initialTheme={Theme.DARK}>
          <div className="app app_dark_theme">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};
