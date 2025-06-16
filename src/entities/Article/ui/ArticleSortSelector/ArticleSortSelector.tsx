import { FC, memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleSortSelector.module.scss";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { useTranslation } from "react-i18next";
import { ArticleSortField } from "entities/Article/model/types/article";
import { SortOrder } from "shared/types";

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
        { value: "asc", content: t("labelAsc") },
        { value: "desc", content: t("labelDesc") },
      ],
      [t]
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        { value: ArticleSortField.CREATED, content: t("sortDate") },
        { value: ArticleSortField.TITLE, content: t("sortTitle") },
        { value: ArticleSortField.VIEWS, content: t("sortView") },
      ],
      [t]
    );

    return (
      <div className={classNames(cls.articleSortSelector, {}, [className])}>
        <Select<ArticleSortField>
          options={sortFieldOptions}
          label={t("labelSort")}
          value={sort}
          onChange={onChangeSort}
        />
        <Select<SortOrder>
          options={orderOptions}
          label={t("OrderBy")}
          onChange={onChangeOrder}
          value={order}
          className={cls.order}
        />
      </div>
    );
  }
);

ArticleSortSelector.displayName = "ArticleSortSelector";
