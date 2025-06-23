import { FC, memo, useCallback, useState } from "react";
import { Card } from "@/shared/ui/Card/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { useTranslation } from "react-i18next";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { BrowserView, MobileView } from "react-device-detect";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  onCancel?: (star: number) => void;
  hasFeedback?: boolean;
  onAccept?: (star: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard: FC<RatingCardProps> = memo(
  ({
    className,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    title,
    rate = 0,
  }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startCount, setStartCount] = useState(rate);
    const [feedback, setFeedback] = useState("");

    const onSelectStars = useCallback(
      (selectedStartCount: number) => {
        setStartCount(selectedStartCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStartCount);
        }
      },
      [hasFeedback, onAccept]
    );

    const acceptHandler = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(startCount, feedback);
    }, [feedback, onAccept, startCount]);

    const cancelHandler = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(startCount);
    }, [onCancel, startCount]);

    const modalContent = (
      <>
        <Text title={feedbackTitle} />
        <Input
          value={feedback}
          onChange={setFeedback}
          placeholder={t("review")}
        />
      </>
    );

    return (
      <Card className={className} max>
        <VStack align="center" gap="8" max>
          <Text title={startCount ? t("thanksForRate") : title} />
          <StarRating
            selectedStar={startCount}
            size={40}
            onSelect={onSelectStars}
          />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} lazy>
            <VStack gap="32" max>
              {modalContent}
              <HStack max gap="16" justify="end">
                <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                  {t("closeBtn")}
                </Button>
                <Button onClick={acceptHandler}>{t("sendBtn")}</Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
            <VStack gap="32" max>
              {modalContent}
              <Button fullWidth size={ButtonSize.L} onClick={acceptHandler}>
                {t("sendBtn")}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </Card>
    );
  }
);

RatingCard.displayName = "RatingCard";
