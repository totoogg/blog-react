import type { Meta, StoryObj } from "@storybook/react";
import ArticleRating from "./ArticleRating";
import React from "react";

const meta = {
  title: "ArticleRating/ArticleRating",
  component: ArticleRating,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    articleId: "1",
  },
};

export const Dark: Story = {
  args: {
    articleId: "1",
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
