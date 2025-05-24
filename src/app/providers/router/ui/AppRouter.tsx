import { getUserAuthData } from "entities/User";
import { memo, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { routerConfig } from "shared/config/routerConfig/routerConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";

export const AppRouter = memo(() => {
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(
    () =>
      Object.values(routerConfig).filter(({ authOnly }) => {
        return authOnly ? authOnly && isAuth : true;
      }),
    [isAuth]
  );

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <div className="page-wrapper">
              <Suspense fallback={<PageLoader />}>{element}</Suspense>
            </div>
          }
        />
      ))}
    </Routes>
  );
});

AppRouter.displayName = "AppRouter";
