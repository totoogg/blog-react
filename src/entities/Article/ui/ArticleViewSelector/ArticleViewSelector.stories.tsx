import type { Meta, StoryObj } from "@storybook/react";
import { ArticleViewSelector } from "./ArticleViewSelector";
import React from "react";
import { ArticleView } from "entities/Article/model/types/article";

const meta = {
  title: "entities/Article/ArticleViewSelector",
  component: ArticleViewSelector,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    view: ArticleView.BIG,
  },
};

export const Dark: Story = {
  args: {
    view: ArticleView.BIG,
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
