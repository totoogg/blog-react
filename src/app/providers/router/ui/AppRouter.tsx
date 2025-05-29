import { memo, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AppRouterProps,
  routerConfig,
} from "shared/config/routerConfig/routerConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRouterProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
});

AppRouter.displayName = "AppRouter";
