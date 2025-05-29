import type { Meta, StoryObj } from "@storybook/react";
import { ArticleListItem } from "./ArticleListItem";
import React from "react";
import { ArticleType, ArticleView } from "../../model/types/article";

const article = {
  id: "1",
  title: "Title 1",
  subtitle: "Subtitle 1",
  img: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  views: 123,
  createdAt: "01.01.2021",
  type: [ArticleType.IT],
  blocks: [],
  user: {
    id: "1",
    username: "XXXXX",
    avatar: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
};

const meta = {
  title: "entities/Article/ArticleListItem",
  component: ArticleListItem,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalBig: Story = {
  args: {
    view: ArticleView.BIG,
    article,
  },
};

export const DarkBig: Story = {
  args: {
    view: ArticleView.BIG,
    article,
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

export const NormalSmall: Story = {
  args: {
    view: ArticleView.SMALL,
    article,
  },
};

export const DarkSmall: Story = {
  args: {
    view: ArticleView.SMALL,
    article,
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
