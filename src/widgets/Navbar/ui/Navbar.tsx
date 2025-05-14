import { classNames } from "shared/lib/classNames/classNames";
import csl from "./Navbar.module.scss";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(csl.navbar, {}, [className])}>
      <div className={csl.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={"/"}
          className={csl["main-link"]}
        >
          {t("main")}
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>
          {t("about")}
        </AppLink>
      </div>
    </div>
  );
};
