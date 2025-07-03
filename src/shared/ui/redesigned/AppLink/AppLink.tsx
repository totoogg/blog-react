import { FC, memo } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import { classNames } from '../../../lib/classNames/classNames';
import csl from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
  className?: string;
  variant?: AppLinkVariant;
  children?: React.ReactNode;
  activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const {
    to,
    className,
    children,
    activeClassName = '',
    variant = 'primary',
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(csl['appLink'], { [activeClassName]: isActive }, [
          className,
          csl[variant],
        ])
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});

AppLink.displayName = 'AppLink';
