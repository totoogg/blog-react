import { FC, memo, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from '@/shared/ui/deprecated/Icon/Icon';
import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/consts/consts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const data = useSelector(getArticleDetailsData);
    const { t } = useTranslation('article');

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlockComponent
              key={block.id}
              block={block}
              className={cls.block}
            />
          );
        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlockComponent
              key={block.id}
              block={block}
              className={cls.block}
            />
          );
        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlockComponent
              key={block.id}
              className={cls.block}
              block={block}
            />
          );
        default:
          return null;
      }
    }, []);

    useEffect(() => {
      if (__PROJECT__ !== 'storybook') {
        dispatch(fetchArticleById(id));
      }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
      content = (
        <>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            border={'50%'}
          />
          <Skeleton className={cls.title} width={300} height={32} />
          <Skeleton className={cls.skeleton} width={600} height={24} />
          <Skeleton className={cls.skeleton} width={'100%'} height={200} />
          <Skeleton className={cls.skeleton} width={'100%'} height={200} />
        </>
      );
    } else if (error) {
      content = (
        <Text title={t('articleDetailTitleError')} align={TextAlign.CENTER} />
      );
    } else {
      content = (
        <>
          <HStack justify="center" max className={cls.avatarWrapper}>
            <Avatar size={200} src={data?.img} className={cls.avatar} />
          </HStack>
          <VStack gap="4" data-testId="ArticleDetails.Info">
            <Text title={data?.title} text={data?.subtitle} size={TextSize.L} />
            <HStack gap="8" className={cls.articleInfo}>
              <Icon Svg={EyeIcon} className={cls.icon} />
              <Text text={String(data?.views)} />
            </HStack>
            <HStack gap="8" className={cls.articleInfo}>
              <Icon Svg={CalendarIcon} className={cls.icon} />
              <Text text={data?.createdAt} />
            </HStack>
          </VStack>

          {data?.blocks.map(renderBlock)}
        </>
      );
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <VStack
          gap="16"
          max
          className={classNames(cls.ArticleDetails, {}, [className])}
        >
          {content}
        </VStack>
      </DynamicModuleLoader>
    );
  },
);

ArticleDetails.displayName = 'ArticleDetails';
