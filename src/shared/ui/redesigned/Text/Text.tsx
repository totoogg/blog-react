import { FC, memo } from 'react';
import { classNames } from '../../../lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextTheme = 'primary' | 'accent' | 'error';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 'sizeS' | 'sizeM' | 'sizeL';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  sizeS: 'h3',
  sizeM: 'h2',
  sizeL: 'h1',
};

export const Text: FC<TextProps> = memo(
  ({
    className,
    text,
    title,
    theme = 'primary',
    align = 'left',
    size = 'sizeM',
    'data-testid': dataTestId = 'Text',
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
        {title && (
          <HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
            {title}
          </HeaderTag>
        )}
        {text && (
          <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
            {text}
          </p>
        )}
      </div>
    );
  },
);

Text.displayName = 'Text';
