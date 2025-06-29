import { FC, memo, useEffect } from 'react';
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
import {
  Text as TextDeprecated,
  TextAlign,
  TextSize,
} from '@/shared/ui/deprecated/Text/Text';
import { useTranslation } from 'react-i18next';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderBlock } from './renderBlock';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

const Skeleton = toggleFeatures({
  name: 'isAppRedesigned',
  on: () => SkeletonRedesigned,
  off: () => SkeletonDeprecated,
});

const Deprecated = () => {
  const data = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify="center" max className={cls.avatarWrapper}>
        <AvatarDeprecated size={200} src={data?.img} className={cls.avatar} />
      </HStack>
      <VStack gap="4" data-testid="ArticleDetails.Info">
        <TextDeprecated
          title={data?.title}
          text={data?.subtitle}
          size={TextSize.L}
        />
        <HStack gap="8" className={cls.articleInfo}>
          <IconDeprecated Svg={EyeIcon} className={cls.icon} />
          <TextDeprecated text={String(data?.views)} />
        </HStack>
        <HStack gap="8" className={cls.articleInfo}>
          <IconDeprecated Svg={CalendarIcon} className={cls.icon} />
          <TextDeprecated text={data?.createdAt} />
        </HStack>
      </VStack>
      {data?.blocks.map(renderBlock)}
    </>
  );
};

const Redesigned = () => {
  const data = useSelector(getArticleDetailsData);

  return (
    <>
      <Text title={data?.title} bold size="sizeL" />
      <Text title={data?.subtitle} />
      <AppImage
        fallback={<Skeleton width={'100%'} height={420} border={'16px'} />}
        src={data?.img}
        className={cls.img}
      />

      {data?.blocks.map(renderBlock)}
    </>
  );
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const { t } = useTranslation('article');

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
        <TextDeprecated
          title={t('articleDetailTitleError')}
          align={TextAlign.CENTER}
        />
      );
    } else {
      content = (
        <ToggleFeatures
          feature="isAppRedesigned"
          off={<Deprecated />}
          on={<Redesigned />}
        />
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
