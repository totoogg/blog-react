import { FC, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfilePageHeader.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from "entities/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "entities/User";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("profile");
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onEditCancel = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(cls["profilePageHeader"], {}, [className])}>
      <Text title={t("profile")} />
      {canEdit && (
        <div className={cls.btnsWrapper}>
          {readonly ? (
            <Button
              className={cls.edit}
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
            >
              {t("edit")}
            </Button>
          ) : (
            <>
              <Button
                className={cls.edit}
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onEditCancel}
              >
                {t("cancel")}
              </Button>
              <Button
                className={cls.save}
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
              >
                {t("save")}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
