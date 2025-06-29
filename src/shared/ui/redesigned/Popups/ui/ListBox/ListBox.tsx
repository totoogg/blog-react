import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import cls from './ListBox.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import { Icon } from '../../../Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
export interface ListBoxItem<T extends string> {
  value: T;
  content: React.ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    onChange,
    defaultValue,
    value,
    readonly,
    direction = 'bottom left',
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack gap="4">
      {label && <span>{label + '>'}</span>}
      <HListbox
        disabled={readonly}
        as={'div'}
        className={classNames(cls.listBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <ListboxButton as={'div'} disabled={readonly} className={cls.trigger}>
          <Button
            addonRight={<Icon Svg={ArrowIcon} />}
            variant="filled"
            disabled={readonly}
          >
            {selectedItem?.content ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions
          portal={false}
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <ListboxOption
              as={Fragment}
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {({ focus, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.focus]: focus,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HListbox>
    </HStack>
  );
}
