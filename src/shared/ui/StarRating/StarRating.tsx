import { FC, memo, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./StarRating.module.scss";
import StarIcon from "@/shared/assets/icons/star.svg";
import { Icon } from "../Icon/Icon";

interface StarRatingProps {
  className?: string;
  onSelect?: (star: number) => void;
  size?: number;
  selectedStar?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<StarRatingProps> = memo(
  ({ className, size = 30, onSelect, selectedStar = 0 }) => {
    const [currentStarCount, setCurrentStarCount] = useState(selectedStar);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStar));

    const onHover = (star: number) => () => {
      if (!isSelected) {
        setCurrentStarCount(star);
      }
    };

    const onLeave = () => () => {
      if (!isSelected) {
        setCurrentStarCount(0);
      }
    };

    const onClick = (star: number) => () => {
      if (!isSelected) {
        onSelect?.(star);
        setCurrentStarCount(star);
        setIsSelected(true);
      }
    };

    return (
      <div className={classNames(cls.starRating, {}, [className])}>
        {stars.map((star) => (
          <Icon
            Svg={StarIcon}
            className={classNames(
              cls.starIcon,
              { [cls.selected]: isSelected },
              [currentStarCount >= star ? cls.hovered : cls.normal]
            )}
            key={star}
            width={size}
            height={size}
            onMouseLeave={onLeave}
            onMouseEnter={onHover(star)}
            onClick={onClick(star)}
            data-testid={"StarRating." + star}
            data-selected={currentStarCount >= star}
          />
        ))}
      </div>
    );
  }
);

StarRating.displayName = "StarRating";
