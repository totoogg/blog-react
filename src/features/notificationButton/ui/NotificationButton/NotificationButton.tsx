import { FC, memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationButton.module.scss';

import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
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
      <Icon Svg={NotificationIcon} onClick={onOpenDrawer} clickable />
    );

    return (
      <div>
        <BrowserView>
          <Popover
            className={classNames(cls.notificationButton, {}, [className])}
            direction="bottom left"
            trigger={trigger}
          >
            <NotificationList />
          </Popover>
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
