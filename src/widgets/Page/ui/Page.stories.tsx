import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";
import React from "react";

const meta = {
  title: "widgets/Page",
  component: Page,

  tags: ["autodocs"],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    children: "Text",
  },
};

export const Dark: Story = {
  args: {
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
        <div className="app app_dark_theme">
          <Story />
        </div>
      );
    },
  ],
};
