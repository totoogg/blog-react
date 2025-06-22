import { classNames } from "@/shared/lib/classNames/classNames";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import cls from './ErrorPage.module.scss'

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ className }) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames(cls.errorPage, {}, [className])}>
      <p>{t("ErrorText")}</p>
      <button onClick={reloadPage}>{t("UpdatePage")}</button>
    </div>
  );
};
