import { FC, memo, SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
  ['data-testid']?: string;
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
      {...otherProps}
      width={width}
      height={height}
      className={classNames(cls.icon, {}, [className])}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        data-testid={props?.['data-testid']}
        style={{ height, width }}
        onClick={props.onClick}
        type="button"
        className={classNames(cls.button, {}, [className])}
      >
        <Svg
          {...otherProps}
          width={width}
          height={height}
          className={classNames(cls.icon, {}, [])}
          onClick={undefined}
        />
      </button>
    );
  }

  return icon;
});

Icon.displayName = 'Icon';
