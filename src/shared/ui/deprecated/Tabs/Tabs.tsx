import { FC, memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 */
export const Tabs: FC<TabsProps> = memo(
  ({ className, onTabClick, tabs, value }) => {
    const clickHandler = useCallback(
      (tab: TabItem) => {
        return () => {
          onTabClick(tab);
        };
      },
      [onTabClick],
    );

    return (
      <div className={classNames(cls.tabs, {}, [className])}>
        {tabs.map((tab) => (
          <Card
            theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
            className={cls.tabs}
            onClick={clickHandler(tab)}
            key={tab.value}
          >
            {tab.content}
          </Card>
        ))}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
