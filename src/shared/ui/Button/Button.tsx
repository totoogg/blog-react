import { FC, memo } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  OUTLINE_RED = "outlineRed",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
  M = "sizeM",
  L = "sizeL",
  XL = "sizeXl",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    disabled,
    fullWidth,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mod: Mods = {
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      className={classNames(cls.button, mod, [className, cls[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
