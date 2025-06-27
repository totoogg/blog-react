import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';
import { Popover as PopoverDeprecate } from '@/shared/ui/deprecated/Popups';
import {
  Button as ButtonDeprecate,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecate } from '@/shared/ui/deprecated/Icon/Icon';
import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
  ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
      setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
      setIsOpen(false);
    }, []);

    const trigger = (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <ButtonDeprecate onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <IconDeprecate Svg={NotificationIconDeprecated} inverted />
          </ButtonDeprecate>
        }
        on={<Icon Svg={NotificationIcon} onClick={onOpenDrawer} clickable />}
      />
    );

    return (
      <div>
        <BrowserView>
          <ToggleFeatures
            feature="isAppRedesigned"
            off={
              <PopoverDeprecate
                className={classNames(cls.notificationButton, {}, [className])}
                direction="bottom left"
                trigger={trigger}
              >
                <NotificationList />
              </PopoverDeprecate>
            }
            on={
              <Popover
                className={classNames(cls.notificationButton, {}, [className])}
                direction="bottom left"
                trigger={trigger}
              >
                <NotificationList />
              </Popover>
            }
          />
        </BrowserView>
        <MobileView>
          {trigger}

          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </MobileView>
      </div>
    );
  },
);

NotificationButton.displayName = 'NotificationButton';
