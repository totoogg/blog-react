import type { Meta, StoryObj } from "@storybook/react";
import { CommentCard } from "./CommentCard";
import React from "react";

const meta = {
  title: "entities/comment/CommentCard",
  component: CommentCard,

  tags: ["autodocs"],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    comment: {
      id: "1",
      text: "some comment 1",
      user: { id: "1", username: "XXXXX" },
    },
  },
};

export const Dark: Story = {
  args: {
    comment: {
      id: "1",
      text: "some comment 1",
      user: { id: "1", username: "XXXXX" },
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

export const Loading: Story = {
  args: {
    comment: {
      id: "1",
      text: "some comment 1",
      user: { id: "1", username: "XXXXX" },
    },
    isLoading: true,
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
