import type { Meta, StoryObj } from "@storybook/react";
import { ArticleDetails } from "./ArticleDetails";
import React from "react";

const meta = {
  title: "entities/ArticleDetails",
  component: ArticleDetails,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleDetails>;

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
