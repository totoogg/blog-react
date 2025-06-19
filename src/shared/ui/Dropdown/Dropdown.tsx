import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import cls from "./Dropdown.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Fragment } from "react";
import { DropdownDirection } from "shared/types/ui";
import { AppLink } from "../AppLink/AppLink";

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

const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": cls.optionsBottomLeft,
  "bottom right": cls.optionsBottomRight,
  "top left": cls.optionsTopLeft,
  "top right": cls.optionsTopRight,
};

export function Dropdown(props: DropdownProps) {
  const { className, items, trigger, direction = "bottom right" } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(cls.dropdown, {}, [className])}>
      <MenuButton className={cls.btn}>{trigger}</MenuButton>
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
              className={classNames(cls.item, { [cls.focus]: focus })}
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
