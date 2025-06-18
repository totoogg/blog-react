import { FC, memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailPage.module.scss";
import { useTranslation } from "react-i18next";
import { ArticleDetails, ArticleList } from "entities/Article";
import { useParams } from "react-router-dom";
import { Text, TextSize } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { useSelector } from "react-redux";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { fetchCommentsByArticleId } from "../../model/service/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AddCommentForm } from "features/addCommentForm";
import { addCommentForArticle } from "../../model/service/addCommentForArticle/addCommentForArticle";
import { Page } from "widgets/Page/Page";
import { getArticleRecommendations } from "../../model/slices/articleDetailsRecommendationSlice";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { fetchArticleRecommendations } from "../../model/service/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { VStack } from "shared/ui/Stack";

interface ArticleDetailPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailPage: FC<ArticleDetailPageProps> = ({ className }) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const recommendationsIsLoading = useSelector(
    getArticleRecommendationsIsLoading
  );
  const dispatch = useAppDispatch();

  const onSendComment = useCallback(
    (value: string) => {
      dispatch(addCommentForArticle(value));
    },
    [dispatch]
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendations());
  });

  if (!id) {
    return (
      <Page className={classNames(cls.articleDetailPage, {}, [className])}>
        {t("articleError")}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.articleDetailPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={t("recommendation")}
          />
          <ArticleList
            articles={recommendations}
            isLoading={recommendationsIsLoading}
            className={cls.recommendations}
            target="_blank"
          />
          <Text
            size={TextSize.L}
            className={cls.commentTitle}
            title={t("comment")}
          />
          <AddCommentForm onSendComment={onSendComment} />
          <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailPage);
