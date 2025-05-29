import { FC, HTMLAttributes, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card: FC<CardProps> = memo(
  ({ className, children, ...otherProps }) => {
    return (
      <div className={classNames(cls.card, {}, [className])} {...otherProps}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
