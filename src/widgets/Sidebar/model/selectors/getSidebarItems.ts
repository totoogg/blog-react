import { getUserAuthData } from '@/entities/User';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';
import { SidebarItemType } from '../types/sidebar';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { useSelector } from 'react-redux';

export const useSidebarItems = () => {
  const userData = useSelector(getUserAuthData);

  const sidebarItemsList: SidebarItemType[] = [
    {
      text: 'main',
      path: getRouteMain(),
      Icon: MainIcon,
    },
    {
      text: 'about',
      path: getRouteAbout(),
      Icon: AboutIcon,
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        text: 'profile',
        path: getRouteProfile(userData?.id),
        Icon: ProfileIcon,
      },
      {
        text: 'articles',
        path: getRouteArticles(),
        Icon: ArticleIcon,
      },
    );
  }

  return sidebarItemsList;
};
