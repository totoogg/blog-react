import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";

interface IconProps {
  className?: string;
  Svg: React.FC<React.SVGAttributes<SVGElement>>;
}

export const Icon: FC<IconProps> = memo(({ className, Svg }) => {
  return <Svg className={classNames(cls.icon, {}, [className])} />;
});

Icon.displayName = "Icon";
