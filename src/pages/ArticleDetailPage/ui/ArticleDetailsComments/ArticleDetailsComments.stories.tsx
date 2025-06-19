import type { Meta, StoryObj } from "@storybook/react";
import { ArticleDetailsComments } from "./ArticleDetailsComments";
import React from "react";

const meta = {
  title: "pages/ArticleDetailPage/ArticleDetailsComments",
  component: ArticleDetailsComments,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleDetailsComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    id: "1",
  },
};

export const Dark: Story = {
  args: {
    id: "1",
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
