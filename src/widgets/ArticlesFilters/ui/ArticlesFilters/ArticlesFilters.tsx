import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useTranslation } from 'react-i18next';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';

interface ArticlesFiltersProps {
  className?: string;
  search?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  type: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = memo(
  ({
    className,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    sort,
    type,
    search,
  }) => {
    const { t } = useTranslation();

    return (
      <Card
        padding="24"
        className={classNames(cls.articlesFilters, {}, [className])}
      >
        <VStack gap="32">
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder={t('Search')}
          />
          <ArticleTypeTabs
            className={cls.tabs}
            value={type}
            onChangeType={onChangeType}
          />
          <ArticleSortSelector
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            order={order}
            sort={sort}
          />
        </VStack>
      </Card>
    );
  },
);

ArticlesFilters.displayName = 'ArticlesFilters';
