import { AppRouter, AppRoutesPaths } from '@/shared/const/router';
import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

export function useRouteChange() {
  const location = useLocation();
  const [appRoute, setAppRoute] = useState<AppRouter>(AppRouter.MAIN);

  useEffect(() => {
    Object.entries(AppRoutesPaths).forEach(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route.slice(1) as AppRouter);
      }
    });
  }, [location.pathname]);

  return appRoute;
}
