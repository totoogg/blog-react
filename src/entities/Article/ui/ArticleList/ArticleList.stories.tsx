import type { Meta, StoryObj } from "@storybook/react";
import { ArticleList } from "./ArticleList";
import React from "react";
import { ArticleType, ArticleView } from "../../model/consts/consts";

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
  title: "entities/Article/ArticleList",
  component: ArticleList,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsLoadingBig: Story = {
  args: {
    isLoading: true,
    view: ArticleView.BIG,
    articles: [],
  },
};

export const IsLoadingSmall: Story = {
  args: {
    isLoading: true,
    view: ArticleView.SMALL,
    articles: [],
  },
};

export const IsLoadingDarkBig: Story = {
  args: {
    isLoading: true,
    view: ArticleView.BIG,
    articles: [],
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

export const IsLoadingDarkSmall: Story = {
  args: {
    isLoading: true,
    view: ArticleView.SMALL,
    articles: [],
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

export const ListBig: Story = {
  args: {
    isLoading: false,
    view: ArticleView.BIG,
    articles: [article, article],
  },
};

export const ListSmall: Story = {
  args: {
    isLoading: false,
    view: ArticleView.SMALL,
    articles: [article, article],
  },
};
