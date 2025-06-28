import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo: FC<AppLogoProps> = memo(({ className, size = 50 }) => {
  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.appLogoWrapper, {}, [className])}
    >
      <AppSvg
        width={size}
        height={size}
        color="black"
        className={cls.appLogo}
      />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  );
});

AppLogo.displayName = 'AppLogo';
