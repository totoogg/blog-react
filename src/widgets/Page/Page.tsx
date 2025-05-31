import React, { FC, memo, useRef, UIEvent } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Page.module.scss";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUIScrollByPath, uiActions } from "features/UI";
import { useLocation } from "react-router-dom";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";

interface PageProps {
  className?: string;
  children: React.ReactNode;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo(
  ({ className, children, onScrollEnd }) => {
    const wrapperRef = useRef(null) as React.RefObject<HTMLDivElement | null>;
    const triggerRef = useRef(null) as React.RefObject<HTMLDivElement | null>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
      getUIScrollByPath(state, pathname)
    );

    useInfiniteScroll({
      triggerRef: triggerRef as React.RefObject<HTMLDivElement>,
      wrapperRef: wrapperRef as React.RefObject<HTMLDivElement>,
      callback: onScrollEnd,
    });

    useInitialEffect(() => {
      if (wrapperRef.current) {
        wrapperRef.current.scrollTop = scrollPosition;
      }
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
      dispatch(
        uiActions.setScrollPosition({
          path: pathname,
          position: e.currentTarget.scrollTop,
        })
      );
    }, 500);

    return (
      <section
        ref={wrapperRef}
        className={classNames(cls.page, {}, [className])}
        onScroll={onScroll}
      >
        {children}
        <div ref={triggerRef} />
      </section>
    );
  }
);

Page.displayName = "Page";
