import { FC, memo } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  INVERTED = "inverted",
  ERROR = "error",
}

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

export enum TextSize {
  S = "sizeS",
  M = "sizeM",
  L = "sizeL",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

type HeaderTagType = "h1" | "h2" | "h3";

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: "h3",
  [TextSize.M]: "h2",
  [TextSize.L]: "h1",
};

export const Text: FC<TextProps> = memo(
  ({
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
  }) => {
    const HeaderTag = mapSizeToHeaderTag[size];

    return (
      <div
        className={classNames(cls.textWrapper, {}, [
          className,
          cls[theme],
          cls[align],
          cls[size],
        ])}
      >
        {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
        {text && <p className={cls.text}>{text}</p>}
      </div>
    );
  }
);

Text.displayName = "Text";
