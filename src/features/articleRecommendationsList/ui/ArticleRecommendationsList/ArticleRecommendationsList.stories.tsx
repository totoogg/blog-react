import type { Meta, StoryObj } from "@storybook/react";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";
import React from "react";

const meta = {
  title: "ArticleRecommendationsList/ArticleRecommendationsList",
  component: ArticleRecommendationsList,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleRecommendationsList>;

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
