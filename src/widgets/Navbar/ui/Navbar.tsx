import { classNames } from "shared/lib/classNames/classNames";
import csl from "./Navbar.module.scss";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={classNames(csl.navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={csl.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={"/"}
          className={csl.mainLink}
        >
          Main
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>
          About
        </AppLink>
      </div>
    </div>
  );
};
