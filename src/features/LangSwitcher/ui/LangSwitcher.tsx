import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '../../../shared/ui/deprecated/Button/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(
  ({ className, short }) => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <ButtonDeprecated
            theme={ButtonTheme.CLEAR_INVERTED}
            onClick={toggle}
            className={classNames('', {}, [className])}
          >
            {t(!short ? 'langShort' : 'lang')}
          </ButtonDeprecated>
        }
        on={
          <Button onClick={toggle} variant="clear">
            {t(!short ? 'langShort' : 'lang')}
          </Button>
        }
      />
    );
  },
);

LangSwitcher.displayName = 'LangSwitcher';
