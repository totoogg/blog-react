import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RouterPath } from "shared/config/routerConfig/routerConfig";
import { useSelector } from "react-redux";
import { getCanEditArticle } from "../../model/selectors/article";
import { getArticleDetailsData } from "entities/Article";
import { HStack } from "shared/ui/Stack";

interface ArticleDetailsPageHeader {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeader> = memo(
  ({ className }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    const onBackToList = useCallback(() => {
      navigate(RouterPath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(RouterPath.article_details + article?.id + "/edit");
    }, [article?.id, navigate]);

    return (
      <HStack max justify="between" className={classNames("", {}, [className])}>
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t("back")}
        </Button>
        {canEdit && (
          <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
            {t("edit")}
          </Button>
        )}
      </HStack>
    );
  }
);

ArticleDetailsPageHeader.displayName = "ArticleDetailsPageHeader";
