import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
  className?: string;
}

export const NotificationList: FC<NotificationListProps> = memo(
  ({ className }) => {
    const { data: notifications, isLoading } = useNotifications(null, {
      pollingInterval: 10000,
    });

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    if (isLoading) {
      return (
        <VStack
          max
          gap="16"
          className={classNames(cls.notificationList, {}, [className])}
        >
          <Skeleton width="100px" border="8px" height="80px" />
          <Skeleton width="100px" border="8px" height="80px" />
          <Skeleton width="100px" border="8px" height="80px" />
        </VStack>
      );
    }

    return (
      <VStack
        max
        gap="16"
        className={classNames(cls.notificationList, {}, [className])}
      >
        {notifications?.map((el) => (
          <NotificationItem key={el.id} item={el} />
        ))}
      </VStack>
    );
  },
);

NotificationList.displayName = 'NotificationList';
