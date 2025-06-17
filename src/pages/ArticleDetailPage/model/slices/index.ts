import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsRecommendationReducer } from "./articleDetailsRecommendationSlice";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";

export const articleDetailsPageReducer = combineReducers({
  recommendations: articleDetailsRecommendationReducer,
  comments: articleDetailsCommentsReducer,
}) as Reducer<ArticleDetailsPageSchema>;
