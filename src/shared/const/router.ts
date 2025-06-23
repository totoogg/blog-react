export enum AppRouter {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLE_DETAILS = "article_details",
  ARTICLE_CREATE = "article_create",
  ARTICLE_EDIT = "article_edit",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",

  NOT_FOUND = "not_found",
}

export const RouterPath: Record<AppRouter, string> = {
  [AppRouter.MAIN]: "/",
  [AppRouter.ABOUT]: "/about",
  [AppRouter.PROFILE]: "/profile/", // + id
  [AppRouter.ARTICLES]: "/articles",
  [AppRouter.ARTICLE_DETAILS]: "/articles/", // + id
  [AppRouter.ARTICLE_CREATE]: "/articles/new/",
  [AppRouter.ARTICLE_EDIT]: "/articles/:id/edit",
  [AppRouter.ADMIN_PANEL]: "/admin",
  [AppRouter.FORBIDDEN]: "/forbidden",
  [AppRouter.NOT_FOUND]: "*",
};
