import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailPage.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";

interface ArticleDetailPageProps {
  className?: string;
}

const ArticleDetailPage: FC<ArticleDetailPageProps> = ({ className }) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailPage, {}, [className])}>
        {t("articleError")}
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleDetailPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailPage);
