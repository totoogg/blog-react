import { FC, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
}

export const Skeleton: FC<SkeletonProps> = memo(
  ({ className, border, height, width }) => {
    const styles: React.CSSProperties = {
      width,
      height,
      borderRadius: border,
    };

    return (
      <div
        className={classNames(cls.skeleton, {}, [className])}
        style={styles}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
