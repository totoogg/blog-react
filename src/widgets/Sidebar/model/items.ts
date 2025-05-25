import { FC, SVGAttributes } from "react";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import ArticleIcon from "shared/assets/icons/article-20-20.svg";
import { RouterPath } from "shared/config/routerConfig/routerConfig";

export interface SidebarItemType {
  text: string;
  path: string;
  Icon: FC<SVGAttributes<SVGElement>>;
  authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    text: "Main",
    path: RouterPath.main,
    Icon: MainIcon,
  },
  {
    text: "About",
    path: RouterPath.about,
    Icon: AboutIcon,
  },
  {
    text: "Profile",
    path: RouterPath.profile,
    Icon: ProfileIcon,
    authOnly: true,
  },
  {
    text: "Articles",
    path: RouterPath.articles,
    Icon: ArticleIcon,
    authOnly: true,
  },
];
