import { Country } from '../../model/types/country';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/deprecated/Popups';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { content: Country.America, value: Country.America },
  { content: Country.Belarus, value: Country.Belarus },
  { content: Country.Russia, value: Country.Russia },
  { content: Country.Germen, value: Country.Germen },
];

export const CountrySelect: FC<CountrySelectProps> = memo(
  ({ className, value, onChange, readonly }) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(() => {
      onChange?.(value as Country);
    }, [onChange, value]);

    return (
      <ListBox
        className={classNames('', {}, [className])}
        value={value}
        defaultValue={t('country')}
        items={options}
        onChange={onChangeHandler}
        readonly={readonly}
        direction="top right"
        label={t('country')}
      />
    );
  },
);

CountrySelect.displayName = 'CountrySelect';
