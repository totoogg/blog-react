import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  getRouteAdmin,
  getRouteProfile,
  getRouteSetting,
} from '@/shared/const/router';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { useSelector } from 'react-redux';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const onLogOut = useCallback(() => {
    dispatch(userActions.logOut());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (!authData) {
    return null;
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t('admin'),
            href: getRouteAdmin(),
          },
        ]
      : []),
    {
      content: t('Setting'),
      href: getRouteSetting(),
    },
    {
      content: t('profile'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('logOut'),
      onClick: onLogOut,
    },
  ];

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      direction="bottom left"
      items={items}
      trigger={<Avatar size={40} src={authData.avatar} />}
    />
  );
});

AvatarDropdown.displayName = 'AvatarDropdown';
