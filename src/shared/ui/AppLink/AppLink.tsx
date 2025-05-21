import { FC, memo } from "react";
import { Link, LinkProps } from "react-router-dom";
import { classNames } from "../../lib/classNames/classNames";
import csl from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: React.ReactNode;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(csl["appLink"], {}, [className, csl[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});

AppLink.displayName = "AppLink";
