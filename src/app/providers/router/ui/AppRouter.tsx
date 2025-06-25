import { memo, Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routerConfig } from '../config/routerConfig';
import { RequireAuth } from './RequireAuth';
import { PageLoader } from '@/widgets/PageLoader';
import { AppRouterProps } from '@/shared/types/router';

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
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
});

AppRouter.displayName = 'AppRouter';
