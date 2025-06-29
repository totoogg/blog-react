import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo(
  ({ className, comment, isLoading }) => {
    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    if (isLoading) {
      return (
        <VStack
          data-testid="CommentCard.Loading"
          gap="8"
          max
          className={classNames(cls.commentCard, {}, [className, cls.loading])}
        >
          <div className={cls.header}>
            <Skeleton width={30} height={30} border="50%" />
            <Skeleton width={100} height={16} className={cls.username} />
          </div>
          <Skeleton width={'100%'} height={50} className={cls.text} />
        </VStack>
      );
    }

    if (!comment) {
      return null;
    }

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <VStack
            data-testid="CommentCard.Content"
            gap="8"
            max
            className={classNames(cls.commentCard, {}, [className])}
          >
            <AppLinkDeprecated
              to={getRouteProfile(comment.user.id)}
              className={cls.header}
            >
              {comment.user.avatar ? (
                <AvatarDeprecated size={30} src={comment.user.avatar} />
              ) : null}
              <TextDeprecated
                className={cls.username}
                title={comment.user.username}
              />
            </AppLinkDeprecated>
            <TextDeprecated className={cls.text} text={comment.text} />
          </VStack>
        }
        on={
          <Card padding="24" border="round" max>
            <VStack
              data-testid="CommentCard.Content"
              gap="8"
              max
              className={classNames(cls.commentCardRedesigned, {}, [className])}
            >
              <AppLink to={getRouteProfile(comment.user.id)}>
                <HStack gap="8">
                  {comment.user.avatar ? (
                    <Avatar size={30} src={comment.user.avatar} />
                  ) : null}
                  <Text title={comment.user.username} bold />
                </HStack>
              </AppLink>
              <Text className={cls.text} text={comment.text} />
            </VStack>
          </Card>
        }
      />
    );
  },
);

CommentCard.displayName = 'CommentCard';
