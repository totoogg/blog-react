import { FC } from "react";
import cls from "./LoginForm.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.loginForm, {}, [className])}>
      <Input
        type="text"
        className={cls.input}
        placeholder={t("inputUsername")}
        autofocus={true}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={t("inputPassword")}
      />
      <Button theme={ButtonTheme.OUTLINE} className={cls["loginBtn"]}>{t("logIn")}</Button>
    </div>
  );
};
