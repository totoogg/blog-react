import { FC, memo, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon: FC<IconProps> = memo((props) => {
  const {
    className,
    Svg,
    width = 32,
    clickable,
    height = 32,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      width={width}
      height={height}
      className={classNames(cls.icon, {}, [className])}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        style={{ height, width }}
        onClick={props.onClick}
        type="button"
        className={classNames(cls.button, {}, [className])}
      >
        <Svg
          width={width}
          height={height}
          className={classNames(cls.icon, {}, [])}
          {...otherProps}
          onClick={undefined}
        />
      </button>
    );
  }

  return icon;
});

Icon.displayName = 'Icon';
