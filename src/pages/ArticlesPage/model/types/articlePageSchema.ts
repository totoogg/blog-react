import { EntityState } from "@reduxjs/toolkit";
import { Article, ArticleView } from "entities/Article";
import { ArticleSortField, ArticleType } from "entities/Article";
import { SortOrder } from "shared/types";

export interface ArticlePageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;
  view: ArticleView;
  page: number;
  limit: number;
  hasMore: boolean;
  _inited: boolean;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;
}
