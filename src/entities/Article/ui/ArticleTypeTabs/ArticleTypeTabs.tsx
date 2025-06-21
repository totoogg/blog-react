import { FC, memo, useCallback, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { TabItem, Tabs } from "shared/ui/Tabs/Tabs";
import { ArticleType } from "entities/Article/model/consts/consts";
import { useTranslation } from "react-i18next";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = memo(
  ({ className, value, onChangeType }) => {
    const { t } = useTranslation();
    const typeTabs = useMemo<TabItem[]>(
      () => [
        {
          value: ArticleType.ALL,
          content: t("ALL"),
        },
        {
          value: ArticleType.IT,
          content: t("IT"),
        },
        {
          value: ArticleType.ECONOMICS,
          content: t("ECONOMICS"),
        },
        {
          value: ArticleType.SCIENCE,
          content: t("SCIENCE"),
        },
      ],
      [t]
    );

    const onTableType = useCallback(
      (tab: TabItem) => {
        onChangeType(tab.value as ArticleType);
      },
      [onChangeType]
    );

    return (
      <Tabs
        value={value}
        tabs={typeTabs}
        onTabClick={onTableType}
        className={classNames("", {}, [className])}
      ></Tabs>
    );
  }
);

ArticleTypeTabs.displayName = "ArticleTypeTabs";
