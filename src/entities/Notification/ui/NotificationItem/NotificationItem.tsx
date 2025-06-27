import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import {
  Card as CardDeprecated,
  CardTheme,
} from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = memo(
  ({ className, item }) => {
    const content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <CardDeprecated
            theme={CardTheme.OUTLINED}
            className={classNames(cls.notificationItem, {}, [className])}
          >
            <TextDeprecated title={item.title} text={item.description} />
          </CardDeprecated>
        }
        on={
          <Card className={classNames(cls.notificationItem, {}, [className])}>
            <Text title={item.title} text={item.description} />
          </Card>
        }
      />
    );

    if (item.href) {
      return (
        <a
          className={cls.link}
          href={item.href}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }

    return content;
  },
);

NotificationItem.displayName = 'NotificationItem';
