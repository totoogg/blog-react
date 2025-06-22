import { FC, memo, SVGProps } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon: FC<IconProps> = memo(
  ({ className, Svg, inverted, ...otherProps }) => {
    return (
      <Svg
        {...otherProps}
        className={classNames(inverted ? cls.inverted : cls.icon, {}, [
          className,
        ])}
      />
    );
  }
);

Icon.displayName = "Icon";
