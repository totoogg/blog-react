import { Currency } from "../../model/types/currency";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Select } from "shared/ui/Select/Select";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { content: Currency.BLR, value: Currency.BLR },
  { content: Currency.RUB, value: Currency.RUB },
  { content: Currency.EUR, value: Currency.EUR },
  { content: Currency.USD, value: Currency.USD },
];

export const CurrencySelect: FC<CurrencySelectProps> = memo(
  ({ className, value, onChange, readonly }) => {
    const { t } = useTranslation("profile");

    const onChangeHandler = useCallback(() => {
      onChange?.(value as Currency);
    }, [onChange, value]);

    return (
      <Select
        className={classNames("", {}, [className])}
        label={t("currency")}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  }
);

CurrencySelect.displayName = "CurrencySelect";
