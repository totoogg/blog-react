import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import {
  Button as ButtonDeprecate,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { getRouteArticleCreate } from '@/shared/const/router';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => 'navbarRedesigned',
    off: () => 'navbar',
  });

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <header className={classNames(cls[mainClass], {}, [className])}>
            <Text
              theme={TextTheme.INVERTED}
              className={cls.appName}
              title={t('name')}
            />
            <AppLink
              theme={AppLinkTheme.SECONDARY}
              to={getRouteArticleCreate()}
              className={cls.createBtn}
            >
              {t('createArticleBtn')}
            </AppLink>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
          </header>
        }
        on={
          <header className={classNames(cls[mainClass], {}, [className])}>
            <HStack gap="16" className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
          </header>
        }
      />
    );
  }

  return (
    <header className={classNames(cls[mainClass], {}, [className])}>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <ButtonDeprecate
            theme={ButtonTheme.CLEAR_INVERTED}
            className={cls.links}
            onClick={onShowModal}
          >
            {t('logIn')}
          </ButtonDeprecate>
        }
        on={
          <Button variant="clear" className={cls.links} onClick={onShowModal}>
            {t('logIn')}
          </Button>
        }
      />

      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
