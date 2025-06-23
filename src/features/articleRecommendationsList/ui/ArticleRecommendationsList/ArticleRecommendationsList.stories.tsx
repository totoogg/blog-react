import type { Meta, StoryObj } from "@storybook/react";
import { ArticleRecommendationsList } from "./ArticleRecommendationsList";
import { http, HttpResponse } from "msw";
import { Article } from "@/entities/Article";
import { ArticleType } from "@/entities/Article";
import { StrictMode } from "react";

const meta = {
  title: "features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,

  tags: ["autodocs"],
} satisfies Meta<typeof ArticleRecommendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const article: Article = {
  id: "1",
  img: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  title: "Article 1",
  createdAt: "2021-01-01",
  views: 100,
  user: {
    id: "1",
    username: "XXXXX",
    avatar: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  type: [ArticleType.IT],
  blocks: [],
  subtitle: "",
};

export const Normal: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(__API__ + "/articles?_limit=3", () => {
          return HttpResponse.json([
            { ...article, id: "1" },
            { ...article, id: "2" },
            { ...article, id: "3" },
            { ...article, id: "4" },
          ]);
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <StrictMode>
        <Story />
      </StrictMode>
    ),
  ],
};
