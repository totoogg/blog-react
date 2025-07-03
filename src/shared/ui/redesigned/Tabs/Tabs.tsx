import { FC, memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs: FC<TabsProps> = memo(
  ({ className, onTabClick, tabs, value, direction = 'row' }) => {
    const clickHandler = useCallback(
      (tab: TabItem) => {
        return () => {
          onTabClick(tab);
        };
      },
      [onTabClick],
    );

    return (
      <Flex
        direction={direction}
        gap="8"
        align="start"
        className={classNames(cls.tabs, {}, [className])}
      >
        {tabs.map((tab) => {
          const isSelected = tab.value === value;

          return (
            <Card
              variant={isSelected ? 'light' : 'normal'}
              className={classNames(cls.tabs, { [cls.selected]: isSelected })}
              onClick={clickHandler(tab)}
              key={tab.value}
              border="round"
            >
              {tab.content}
            </Card>
          );
        })}
      </Flex>
    );
  },
);

Tabs.displayName = 'Tabs';
