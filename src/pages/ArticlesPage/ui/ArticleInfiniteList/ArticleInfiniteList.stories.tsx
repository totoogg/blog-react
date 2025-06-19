import type { Meta, StoryObj } from "@storybook/react";
import { ArticleInfiniteList } from "./ArticleInfiniteList";
import React from "react";

const meta = {
  title: "pages/ArticlesPage/ArticleInfiniteList",
  component: ArticleInfiniteList,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Dark: Story = {
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
