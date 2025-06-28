import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> =
  memo(({ className, block }) => {
    return (
      <div
        className={classNames(cls.articleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            off={<TextDeprecated title={block.title} className={cls.title} />}
            on={<Text title={block.title} className={cls.title} />}
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <ToggleFeatures
            key={paragraph}
            feature="isAppRedesigned"
            off={<TextDeprecated text={paragraph} className={cls.paragraph} />}
            on={
              <Text
                key={paragraph}
                text={paragraph}
                className={cls.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  });

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent';
