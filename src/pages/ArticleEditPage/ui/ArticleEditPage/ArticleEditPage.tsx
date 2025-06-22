import { FC, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleEditPage.module.scss";
import { Page } from "@/widgets/Page/Page";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<ArticleEditPageProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit ? t("editArticle") + id : t("createArticle")}
    </Page>
  );
});

ArticleEditPage.displayName = "ArticleEditPage";

export default ArticleEditPage;
