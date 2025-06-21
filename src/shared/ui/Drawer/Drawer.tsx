import { FC, memo } from "react";
import cls from "./Drawer.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";

interface DrawerProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  isOpen?: boolean;
}

export const Drawer: FC<DrawerProps> = memo(
  ({ children, className, onClose, isOpen }) => {
    const { theme } = useTheme();
    const mods = {
      [cls.open]: isOpen,
    };

    return (
      <Portal>
        <div
          className={classNames(cls.drawer, mods, [
            className,
            theme,
            "app_drawer",
          ])}
        >
          <Overlay onClick={onClose} />
          <div className={cls.content}>{children}</div>
        </div>
      </Portal>
    );
  }
);

Drawer.displayName = "Drawer";
