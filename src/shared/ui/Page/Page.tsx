import React, { FC, memo, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Page.module.scss";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";

interface PageProps {
  className?: string;
  children: React.ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo(
  ({ className, children, onScrollEnd }) => {
    const wrapperRef = useRef(null) as React.RefObject<HTMLDivElement | null>;
    const triggerRef = useRef(null) as React.RefObject<HTMLDivElement | null>;

    useInfiniteScroll({
      triggerRef: triggerRef as React.RefObject<HTMLDivElement>,
      wrapperRef: wrapperRef as React.RefObject<HTMLDivElement>,
      callback: onScrollEnd,
    });

    return (
      <section
        ref={wrapperRef}
        className={classNames(cls.page, {}, [className])}
      >
        {children}
        <div ref={triggerRef} />
      </section>
    );
  }
);

Page.displayName = "Page";
