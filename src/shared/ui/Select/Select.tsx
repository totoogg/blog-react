import { FC, memo, useMemo } from "react";
import cls from "./Select.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

export interface SelectOption {
  value: string;
  content: string;
}

export interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select: FC<SelectProps> = memo(
  ({ className, label, onChange, options, value, readonly }) => {
    const optionList = useMemo(() => {
      return options?.map((opt) => (
        <option className={cls.option} value={opt.value} key={opt.value}>
          {" "}
          {opt.content}
        </option>
      ));
    }, [options]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    console.log(cls);

    return (
      <div className={classNames(cls.wrapper, {}, [className])}>
        {label && <span className={cls.label}>{label + ">"}</span>}
        <select
          className={cls.select}
          value={value}
          onChange={onChangeHandler}
          disabled={readonly}
        >
          {optionList}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
