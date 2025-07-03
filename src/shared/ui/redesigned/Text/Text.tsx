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
  bold?: boolean;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  sizeS: 'h3',
  sizeM: 'h2',
  sizeL: 'h1',
};

const mapSizeClass: Record<TextSize, string> = {
  sizeS: cls['sizeS'],
  sizeM: cls['sizeM'],
  sizeL: cls['sizeL'],
};

export const Text: FC<TextProps> = memo(
  ({
    className,
    text,
    title,
    theme = 'primary',
    align = 'left',
    size = 'sizeM',
    bold,
    'data-testid': dataTestId = 'Text',
  }) => {
    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeClass[size];

    return (
      <div
        className={classNames(cls.textWrapper, { [cls.bold]: bold }, [
          className,
          cls[theme],
          cls[align],
          cls[size],
          sizeClass,
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
