import { FC, useMemo } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<AvatarProps> = ({ className, src, size, alt }) => {
  const mods: Mods = {};

  const styles = useMemo(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);

  return (
    <img
      alt={alt}
      src={src}
      className={classNames(cls.avatar, mods, [className])}
      style={styles}
    />
  );
};
