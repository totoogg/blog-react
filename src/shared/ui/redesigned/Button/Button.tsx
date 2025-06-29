import { FC, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonTheme = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';
export type ButtonSize = 'sizeM' | 'sizeL' | 'sizeXl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  /**
   * Theme for button
   * @default ButtonTheme.OUTLINE
   */
  variant?: ButtonTheme;
  /**
   * Square button
   * @default false
   */
  square?: boolean;
  /**
   * Size button
   * @default ButtonSize.M
   */
  size?: ButtonSize;
  /**
   * Disabled button
   * @default false
   */
  disabled?: boolean;
  /**
   * Button content
   */
  children?: React.ReactNode;
  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  colorBtn?: ButtonColor;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    disabled,
    fullWidth,
    size = 'sizeM',
    addonLeft,
    addonRight,
    colorBtn = 'normal',
    ...otherProps
  } = props;

  const mod: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
    [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
  };

  return (
    <button
      className={classNames(cls.button, mod, [
        className,
        cls[variant],
        cls[size],
        cls[colorBtn],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      <div className={cls.addonLeft}>{addonLeft}</div>
      {children}
      <div className={cls.addonRight}>{addonRight}</div>
    </button>
  );
});

Button.displayName = 'Button';
