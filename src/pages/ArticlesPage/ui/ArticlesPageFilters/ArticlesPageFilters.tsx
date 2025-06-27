import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getArticlePageOrder,
  getArticlePageSearch,
  getArticlePageSort,
  getArticlePageType,
  getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { articlePageAction } from '../../model/slices/articlePageSlice';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { SortOrder } from '@/shared/types/sort';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
  ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlePageView);
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);

    const fetchData = useCallback(() => {
      dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debounceFetcherData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlePageAction.setView(view));
        dispatch(articlePageAction.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
        dispatch(articlePageAction.setSort(newSort));
        dispatch(articlePageAction.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
      (newSort: SortOrder) => {
        dispatch(articlePageAction.setOrder(newSort));
        dispatch(articlePageAction.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlePageAction.setSearch(search));
        dispatch(articlePageAction.setPage(1));
        debounceFetcherData();
      },
      [debounceFetcherData, dispatch],
    );

    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlePageAction.setType(value));
        dispatch(articlePageAction.setPage(1));
        fetchData();
      },
      [dispatch, fetchData],
    );

    return (
      <div className={classNames(cls.articlesPageFilters, {}, [className])}>
        <div className={cls['sortWrapper']}>
          <ArticleSortSelector
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            order={order}
            sort={sort}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t('Search')}
          />
        </Card>
        <ArticleTypeTabs
          className={cls.tabs}
          value={type}
          onChangeType={onChangeType}
        />
      </div>
    );
  },
);

ArticlesPageFilters.displayName = 'ArticlesPageFilters';
