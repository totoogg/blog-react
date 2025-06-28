import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../ArticleListItem.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

export const ArticleListItemDeprecated: FC<ArticleListItemProps> = memo(
  ({ className, article, view, target }) => {
    const { t } = useTranslation();

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} />
      </>
    );

    if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
        <div
          data-testId="ArticleListItem"
          className={classNames(cls.articleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.header}>
              <Avatar size={30} src={article.user.avatar} />
              <Text text={article.user.username} className={cls.username} />
              <Text text={article.createdAt} className={cls.date} />
            </div>
            <Text text={article.title} className={cls.title} />
            {types}
            <AppImage
              fallback={<Skeleton width={'100%'} height={250} />}
              src={article.img}
              alt={article.title}
              className={cls.img}
            />
            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={cls.textBlock}
              />
            )}
            <div className={cls.footer}>
              <AppLink to={getRouteArticleDetails(article.id)} target={target}>
                <Button theme={ButtonTheme.OUTLINE}>{t('readMore')}</Button>
              </AppLink>
              {views}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <AppLink
        data-testId="ArticleListItem"
        to={getRouteArticleDetails(article.id)}
        target={target}
        className={classNames(cls.articleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <AppImage
              fallback={<Skeleton width={'200'} height={200} />}
              src={article.img}
              alt={article.title}
              className={cls.img}
            />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text text={article.title} className={cls.title} />
        </Card>
      </AppLink>
    );
  },
);

ArticleListItemDeprecated.displayName = 'ArticleListItemDeprecated';
