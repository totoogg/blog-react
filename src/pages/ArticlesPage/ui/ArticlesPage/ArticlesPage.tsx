import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPage.module.scss";
import { ArticleList } from "entities/Article";

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  return (
    <div className={classNames(cls.articlesPage, {}, [className])}>
      <ArticleList article={[]} />
    </div>
  );
};

export default memo(ArticlesPage);
