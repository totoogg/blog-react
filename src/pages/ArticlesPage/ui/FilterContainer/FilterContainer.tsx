import { FC, memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilter } from '../../lib/hooks/useArticleFilter';

interface FilterContainerProps {
  className?: string;
}

export const FilterContainer: FC<FilterContainerProps> = memo(
  ({ className }) => {
    const {
      onChangeOrder,
      onChangeSort,
      order,
      sort,
      type,
      search,
      onChangeSearch,
      onChangeType,
    } = useArticleFilter();

    return (
      <ArticlesFilters
        onChangeOrder={onChangeOrder}
        onChangeSearch={onChangeSearch}
        onChangeSort={onChangeSort}
        onChangeType={onChangeType}
        order={order}
        sort={sort}
        type={type}
        search={search}
        className={className}
      />
    );
  },
);

FilterContainer.displayName = 'FilterContainer';
