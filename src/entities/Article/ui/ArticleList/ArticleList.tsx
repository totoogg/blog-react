import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { PAGE_ID } from "widgets/Page/Page";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton className={cls.card} view={view} key={index} />
    ));

export const ArticleList: FC<ArticleListProps> = memo(
  ({ className, articles, isLoading, view = ArticleView.SMALL, target }) => {
    const { t } = useTranslation();

    const isBig = view === ArticleView.BIG;
    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = isBig
      ? articles.length
      : Math.ceil(articles.length / itemsPerRow);

    const rowRender = ({ index, key, style }: ListRowProps) => {
      const items = [];
      const fromIndex = index * itemsPerRow;
      const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

      for (let i = fromIndex; i < toIndex; i++) {
        items.push(
          <ArticleListItem
            view={view}
            article={articles[i]}
            className={cls.card}
            target={target}
            key={articles[i].id}
          />
        );
      }

      return (
        <div key={key} style={style} className={cls.row}>
          {items}
        </div>
      );
    };

    if (!isLoading && !articles.length) {
      return (
        <div
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t("ArticleNotFound")} />
        </div>
      );
    }

    return (
      <WindowScroller
        scrollElement={document.getElementById(PAGE_ID) as Element}
      >
        {({
          height,
          width,
          registerChild,
          onChildScroll,
          scrollTop,
          isScrolling,
        }) => (
          <div
            ref={registerChild}
            className={classNames(cls.articleList, {}, [className, cls[view]])}
          >
            <List
              height={height ?? 700}
              rowCount={rowCount}
              rowHeight={isBig ? 700 : 330}
              rowRenderer={rowRender}
              width={width ? width - 80 : 700}
              autoHeight
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
            />
            {isLoading && getSkeletons(view)}
          </div>
        )}
      </WindowScroller>
    );
  }
);

ArticleList.displayName = "ArticleList";
