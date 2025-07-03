import { useJsonSettings } from '@/entities/User';
import { ThemeProvider } from './ThemeProvider';
import { ComponentType } from 'react';

export const withTheme = (Component: ComponentType) => {
  // eslint-disable-next-line react/display-name
  return () => {
    const { theme: defaultTheme } = useJsonSettings();

    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    );
  };
};
