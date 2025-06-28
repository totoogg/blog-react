import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import {
  Text as TextDeprecated,
  TextAlign,
} from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> =
  memo(({ className, block }) => {
    return (
      <div
        className={classNames(cls.articleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} alt={block.type} className={cls.img} />
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
            on={<Text text={block.title} align="center" />}
          />
        )}
      </div>
    );
  });

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
