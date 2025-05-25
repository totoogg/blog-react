import { FC, memo, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetails.module.scss";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useSelector } from "react-redux";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { Text, TextAlign } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const data = useSelector(getArticleDetailsData);
    const { t } = useTranslation("article");

    useEffect(() => {
      dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
      content = (
        <div>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            border={"50%"}
          />
          <Skeleton className={cls.title} width={300} height={32} />
          <Skeleton className={cls.skeleton} width={600} height={24} />
          <Skeleton className={cls.skeleton} width={"100%"} height={200} />
          <Skeleton className={cls.skeleton} width={"100%"} height={200} />
        </div>
      );
    } else if (error) {
      content = (
        <Text title={t("articleDetailTitleError")} align={TextAlign.CENTER} />
      );
    } else {
      content = (
        <div>
          <h1>{data?.title}</h1>
          <img src={data?.img} alt={data?.title} />
          <div>{data?.subtitle}</div>
          <div>{data?.views}</div>
          <div>{data?.createdAt}</div>
        </div>
      );
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
          {content}
        </div>
      </DynamicModuleLoader>
    );
  }
);

ArticleDetails.displayName = "ArticleDetails";
