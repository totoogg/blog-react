import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { RouterPath } from "@/shared/config/routerConfig/routerConfig";
import { SidebarItemType } from "../types/sidebar";
import MainIcon from "@/shared/assets/icons/main-20-20.svg";
import AboutIcon from "@/shared/assets/icons/about-20-20.svg";
import ProfileIcon from "@/shared/assets/icons/profile-20-20.svg";
import ArticleIcon from "@/shared/assets/icons/article-20-20.svg";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      text: "main",
      path: RouterPath.main,
      Icon: MainIcon,
    },
    {
      text: "about",
      path: RouterPath.about,
      Icon: AboutIcon,
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        text: "profile",
        path: RouterPath.profile + userData?.id,
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        text: "articles",
        path: RouterPath.articles,
        Icon: ArticleIcon,
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
