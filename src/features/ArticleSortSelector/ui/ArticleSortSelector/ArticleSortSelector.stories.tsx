import type { Meta, StoryObj } from "@storybook/react";
import { ArticleSortSelector } from "./ArticleSortSelector";
import React from "react";
import { ArticleSortField } from "@/entities/Article";

const meta = {
  title: "entities/Article/ArticleSortSelector",
  component: ArticleSortSelector,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleSortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    sort: ArticleSortField.CREATED,
    order: "asc",
    onChangeOrder: () => {},
    onChangeSort: () => {},
  },
};

export const Dark: Story = {
  args: {
    sort: ArticleSortField.CREATED,
    order: "asc",
    onChangeOrder: () => {},
    onChangeSort: () => {},
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
