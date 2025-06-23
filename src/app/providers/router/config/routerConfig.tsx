import { UserRole } from "@/entities/User";
import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ArticleDetailPage } from "@/pages/ArticleDetailPage";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import {
  getRouteAbout,
  getRouteAdmin,
  getRouteArticleCreate,
  getRouteArticleDetails,
  getRouteArticleEdit,
  getRouteArticles,
  getRouteForbidden,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";
import { AppRouter } from "@/shared/const/router";
import { AppRouterProps } from "@/shared/types/router";

export const routerConfig: Record<AppRouter, AppRouterProps> = {
  [AppRouter.MAIN]: { path: getRouteMain(), element: <MainPage /> },
  [AppRouter.ABOUT]: { path: getRouteAbout(), element: <AboutPage /> },
  [AppRouter.FORBIDDEN]: {
    path: getRouteProfile(":id"),
    element: <ForbiddenPage />,
  },
  [AppRouter.PROFILE]: {
    path: getRouteArticles(),
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRouter.ARTICLES]: {
    path: getRouteArticleDetails(":id"),
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRouter.ARTICLE_DETAILS]: {
    path: getRouteArticleCreate(),
    element: <ArticleDetailPage />,
    authOnly: true,
  },
  [AppRouter.ARTICLE_CREATE]: {
    path: getRouteArticleEdit(":id"),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRouter.ARTICLE_EDIT]: {
    path: getRouteAdmin(),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRouter.ADMIN_PANEL]: {
    path: getRouteForbidden(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  [AppRouter.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
