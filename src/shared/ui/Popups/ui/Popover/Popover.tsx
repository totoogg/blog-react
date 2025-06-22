import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Popover.module.scss";
import {
  Popover as HPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import popupCls from "../../styles/popup.module.scss";
import { mapDirectionClass } from "../../styles/consts";
import { DropdownDirection } from "@/shared/types/ui";

interface PopoverProps {
  className?: string;
  trigger: React.ReactNode;
  direction?: DropdownDirection;
  children: React.ReactNode;
}

export function Popover(props: PopoverProps) {
  const { className, trigger, direction = "bottom right", children } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover
      className={classNames(cls.popover, {}, [className, popupCls.popup])}
    >
      <PopoverButton as={"div"} className={popupCls.trigger}>
        {trigger}
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className={classNames(cls.panel, {}, menuClasses)}
      >
        {children}
      </PopoverPanel>
    </HPopover>
  );
}
