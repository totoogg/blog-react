import { EntityState } from "@reduxjs/toolkit";
import { ArticleDetailsCommentsSchema } from "./ArticleDetailsCommentsSchema";
import { ArticleDetailsRecommendationSchema } from "./ArticleDetailsRecommendationSchema";
import { Article } from "@/entities/Article";
import { Comment } from "@/entities/Comment";

export interface ArticleDetailsPageSchema {
  recommendations: EntityState<Article, string> &
    ArticleDetailsRecommendationSchema;
  comments: EntityState<Comment, string> & ArticleDetailsCommentsSchema;
}
