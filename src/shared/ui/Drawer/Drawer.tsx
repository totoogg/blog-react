import { FC, memo } from "react";
import cls from "./Drawer.module.scss";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import { useModal } from "shared/lib/hooks/useModal/useModal";

interface DrawerProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  isOpen?: boolean;
  lazy?: boolean;
}

export const Drawer: FC<DrawerProps> = memo(
  ({ children, className, onClose, isOpen, lazy }) => {
    const { theme } = useTheme();
    const { close, isClosing, isMounted } = useModal({
      animationDelay: 300,
      isOpen,
      onClose,
    });

    const mods: Mods = {
      [cls.opened]: isOpen,
      [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
      return null;
    }

    return (
      <Portal>
        <div
          className={classNames(cls.drawer, mods, [
            className,
            theme,
            "app_drawer",
          ])}
        >
          <Overlay onClick={close} />
          <div className={cls.content}>{children}</div>
        </div>
      </Portal>
    );
  }
);

Drawer.displayName = "Drawer";
