import { classNames } from "shared/lib/classNames/classNames";
import { FC } from "react";
import cls from "./ErrorPage.module.scss";
import { useTranslation } from "react-i18next";

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ className }) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames(cls["error-page"], {}, [className])}>
      <p>{t("ErrorText")}</p>
      <button onClick={reloadPage}>{t("UpdatePage")}</button>
    </div>
  );
};
