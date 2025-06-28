import { FC, memo } from 'react';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticleFilter } from '../../lib/hooks/useArticleFilter';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer: FC<ViewSelectorContainerProps> = memo(
  ({ className }) => {
    const { view, onChangeView } = useArticleFilter();

    return (
      <ArticleViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  },
);

ViewSelectorContainer.displayName = 'ViewSelectorContainer';
