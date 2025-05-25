import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailPage.module.scss";
import { useTranslation } from "react-i18next";

interface ArticleDetailPageProps {
  className?: string;
}

const ArticleDetailPage: FC<ArticleDetailPageProps> = ({ className }) => {
  const { t } = useTranslation("article");

  return (
    <span className={classNames(cls.articleDetailPage, {}, [className])}></span>
  );
};

export default memo(ArticleDetailPage);
