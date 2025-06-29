import { FC, HTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'normalBorder' | 'partial';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
  fullHeight?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap0',
  '8': 'gap8',
  '16': 'gap16',
  '24': 'gap24',
};

export const Card: FC<CardProps> = memo(
  ({
    className,
    children,
    variant = 'normal',
    max,
    padding = '8',
    fullHeight,
    border = 'normal',
    ...otherProps
  }) => {
    const paddingClass = mapPaddingToClass[padding];

    return (
      <div
        className={classNames(
          cls.card,
          { [cls.max]: max, [cls.fullHeight]: fullHeight },
          [className, cls[variant], cls[paddingClass], cls[border]],
        )}
        {...otherProps}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
