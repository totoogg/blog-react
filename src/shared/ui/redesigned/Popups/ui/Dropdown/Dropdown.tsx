import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import cls from './Dropdown.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Fragment } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

export interface DropdownItem {
  disabled?: boolean;
  content?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: React.ReactNode;
  direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = 'bottom right' } = props;

  const menuClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <Menu
      as="div"
      className={classNames(cls.dropdown, {}, [className, popupCls.popup])}
    >
      <MenuButton className={popupCls.trigger}>{trigger}</MenuButton>
      <MenuItems
        anchor="bottom"
        className={classNames(cls.dropdown, {}, menuClasses)}
      >
        {items.map((item, index) => {
          const content = ({ focus }: { focus: boolean }) => (
            <button
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={classNames(cls.item, { [popupCls.focus]: focus })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <MenuItem
                as={AppLink}
                to={item.href}
                key={index}
                disabled={item.disabled}
              >
                {content}
              </MenuItem>
            );
          }

          return (
            <MenuItem as={Fragment} key={index} disabled={item.disabled}>
              {content}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}
