import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { RouteProps } from "react-router-dom";

export enum AppRouter {
  MAIN = "main",
  ABOUT = "about",
  NOT_FOUND = "not_found",
}

export const RouterPath: Record<AppRouter, string> = {
  [AppRouter.MAIN]: "/",
  [AppRouter.ABOUT]: "/about",
  [AppRouter.NOT_FOUND]: "*",
};

export const routerConfig: Record<AppRouter, RouteProps> = {
  [AppRouter.MAIN]: { path: RouterPath.main, element: <MainPage /> },
  [AppRouter.ABOUT]: { path: RouterPath.about, element: <AboutPage /> },
  [AppRouter.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
