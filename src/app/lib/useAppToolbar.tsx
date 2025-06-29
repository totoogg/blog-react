import { AppRouter } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { ReactElement } from 'react';

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarAppRoute: OptionalRecord<AppRouter, ReactElement> = {
    [AppRouter.ARTICLES]: <ScrollToolbar />,
    [AppRouter.ARTICLE_DETAILS]: <ScrollToolbar />,
  };

  return toolbarAppRoute[appRoute];
}
