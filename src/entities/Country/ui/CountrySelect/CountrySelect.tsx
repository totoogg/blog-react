import { Country } from "../../model/types/country";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";

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
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(() => {
      onChange?.(value as Country);
    }, [onChange, value]);

    return (
      <Select
        className={classNames("", {}, [className])}
        label={t("country")}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  }
);

CountrySelect.displayName = "CountrySelect";
