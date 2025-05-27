import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./CommentList.module.scss";
import { useTranslation } from "react-i18next";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../model/types/comment";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo(
  ({ className, comments, isLoading }) => {
    const { t } = useTranslation();

    if (isLoading) {
      return (
        <div className={classNames(cls.commentList, {}, [className])}>
          <CommentCard isLoading />
          <CommentCard isLoading />
          <CommentCard isLoading />
        </div>
      );
    }

    return (
      <div className={classNames(cls.commentList, {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              className={cls.comment}
              comment={comment}
              key={comment.id}
              isLoading={isLoading}
            />
          ))
        ) : (
          <div>{t("notComments")}</div>
        )}
      </div>
    );
  }
);

CommentList.displayName = "CommentList";
