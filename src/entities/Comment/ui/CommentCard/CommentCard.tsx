import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { getRouteProfile } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
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
    const Skeleton = SkeletonRedesigned;

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
      <Card padding="24" border="partial" max>
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
    );
  },
);

CommentCard.displayName = 'CommentCard';
