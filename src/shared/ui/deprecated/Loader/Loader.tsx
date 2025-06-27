import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

/**
 * @deprecated
 */
export const Loader: FC<LoaderProps> = ({ className }) => {
  return <span className={classNames(cls.loader, {}, [className])}></span>;
};
