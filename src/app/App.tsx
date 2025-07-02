import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { memo, Suspense, useEffect } from 'react';
import { getUserInited, initAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

window.addEventListener('error', (e) => {
  if (e.message.includes('ResizeObserver')) e.preventDefault();
});

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <div id="app" className={classNames('app_redesigned', {}, [theme])}>
        <AppLoaderLayout />
      </div>
    );
  }

  return (
    <div id="app" className={classNames('app_redesigned', {}, [theme])}>
      <Suspense fallback="">
        <MainLayout
          header={<Navbar />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  );
});

App.displayName = 'App';

export default withTheme(App);
