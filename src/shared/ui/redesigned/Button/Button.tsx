import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonTheme = 'clear' | 'outline';

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
    ...otherProps
  } = props;

  const mod: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      className={classNames(cls.button, mod, [
        className,
        cls[variant],
        cls[size],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
