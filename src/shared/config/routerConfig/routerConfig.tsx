import { UserRole } from "entities/User";
import { AboutPage } from "pages/AboutPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { ArticleDetailPage } from "pages/ArticleDetailPage";
import { ArticleEditPage } from "pages/ArticleEditPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RouteProps } from "react-router-dom";

export type AppRouterProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

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

export const routerConfig: Record<AppRouter, AppRouterProps> = {
  [AppRouter.MAIN]: { path: RouterPath.main, element: <MainPage /> },
  [AppRouter.ABOUT]: { path: RouterPath.about, element: <AboutPage /> },
  [AppRouter.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: <ForbiddenPage />,
  },
  [AppRouter.PROFILE]: {
    path: RouterPath.profile + ":id",
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRouter.ARTICLES]: {
    path: RouterPath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRouter.ARTICLE_DETAILS]: {
    path: RouterPath.article_details + ":id",
    element: <ArticleDetailPage />,
    authOnly: true,
  },
  [AppRouter.ARTICLE_CREATE]: {
    path: RouterPath.article_create,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRouter.ARTICLE_EDIT]: {
    path: RouterPath.article_edit,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRouter.ADMIN_PANEL]: {
    path: RouterPath.admin_panel,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [AppRouter.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
