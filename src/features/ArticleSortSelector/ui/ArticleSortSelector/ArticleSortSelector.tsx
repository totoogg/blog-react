import { FC, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { useTranslation } from 'react-i18next';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo(
  ({ className, onChangeOrder, onChangeSort, order, sort }) => {
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        { value: 'asc', content: t('labelAsc') },
        { value: 'desc', content: t('labelDesc') },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        { value: ArticleSortField.CREATED, content: t('sortDate') },
        { value: ArticleSortField.TITLE, content: t('sortTitle') },
        { value: ArticleSortField.VIEWS, content: t('sortView') },
      ],
      [t],
    );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <div className={classNames(cls.articleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
              options={sortFieldOptions}
              label={t('labelSort')}
              value={sort}
              onChange={onChangeSort}
            />
            <Select<SortOrder>
              options={orderOptions}
              label={t('OrderBy')}
              onChange={onChangeOrder}
              value={order}
              className={cls.order}
            />
          </div>
        }
        on={
          <div
            className={classNames(cls.articleSortSelectorRedesigned, {}, [
              className,
            ])}
          >
            <VStack gap="8">
              <Text text={t('labelSort')} />
              <ListBox
                items={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
              />
              <ListBox
                items={orderOptions}
                onChange={onChangeOrder}
                value={order}
              />
            </VStack>
          </div>
        }
      />
    );
  },
);

ArticleSortSelector.displayName = 'ArticleSortSelector';
