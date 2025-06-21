import type { Meta, StoryObj } from "@storybook/react";
import { NotificationItem } from "./NotificationItem";
import React from "react";

const meta = {
  title: "NotificationItem/NotificationItem",
  component: NotificationItem,

  tags: ["autodocs"],
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    item: {
      id: 1,
      title: "Title",
      description: "Description",
      href: "XXXXXXXXXXXXXXXXXXXXX",
    },
  },
};

export const Dark: Story = {
  args: {
    item: {
      id: 1,
      title: "Title",
      description: "Description",
      href: "XXXXXXXXXXXXXXXXXXXXX",
    },
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
