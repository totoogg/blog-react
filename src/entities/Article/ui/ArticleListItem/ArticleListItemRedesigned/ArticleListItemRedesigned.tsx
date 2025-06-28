import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned: FC<ArticleListItemProps> = memo(
  ({ className, article, view, target }) => {
    const { t } = useTranslation();

    const userInfo = (
      <>
        <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
        <Text bold text={article.user.username} />
      </>
    );
    const views = (
      <HStack gap="8">
        <Icon Svg={EyeIcon} />
        <Text text={String(article.views)} className={cls.views} />
      </HStack>
    );

    if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
        <Card
          padding="24"
          max
          data-testid="ArticleListItem"
          className={classNames(cls.articleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <VStack gap="16" max>
            <HStack gap="8" max>
              {userInfo}
              <Text text={article.createdAt} />
            </HStack>
            <Text text={article.title} bold />
            <Text text={article.subtitle} size="sizeS" />
            <AppImage
              fallback={<Skeleton width={'100%'} height={250} />}
              src={article.img}
              alt={article.title}
              className={cls.img}
            />
            {textBlock?.paragraphs && (
              <Text
                className={cls.textBlock}
                text={textBlock.paragraphs.slice(0, 2).join(' ')}
              />
            )}
            <HStack max justify="between">
              <AppLink to={getRouteArticleDetails(article.id)} target={target}>
                <Button variant="outline">{t('readMore')}</Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <AppLink
        data-testid="ArticleListItem"
        to={getRouteArticleDetails(article.id)}
        target={target}
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card} border="round" padding="0">
          <AppImage
            fallback={<Skeleton width={'100%'} height={200} />}
            src={article.img}
            alt={article.title}
            className={cls.img}
          />
          <VStack gap="4" className={cls.info}>
            <Text text={article.title} className={cls.title} />
            <VStack gap="4" className={cls.footer} max>
              <HStack max justify="between">
                <Text text={article.createdAt} className={cls.date} />
                {article.views}
              </HStack>
              <HStack gap="4">{userInfo}</HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  },
);

ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned';
