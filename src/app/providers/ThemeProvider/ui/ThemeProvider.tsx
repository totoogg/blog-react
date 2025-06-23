import { FC, ReactElement, useMemo, useState } from "react";
import {
  ThemeContext,
} from "../../../../shared/lib/context/ThemeContext";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";
import { Theme } from "@/shared/const/theme";

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactElement;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
  document.body.className = theme;

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext value={defaultProps}>{children}</ThemeContext>;
};
