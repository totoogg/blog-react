import { FC, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import { Skeleton } from '../Skeleton';
import UserIcon from '../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  className,
  src,
  size = 100,
  alt,
  fallbackInverted,
}) => {
  const mods: Mods = {};

  const styles = useMemo(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  );
  const fallback = <Skeleton width={size} height={size} border="50%" />;

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      alt={alt}
      src={src}
      className={classNames(cls.avatar, mods, [className])}
      style={styles}
    />
  );
};
