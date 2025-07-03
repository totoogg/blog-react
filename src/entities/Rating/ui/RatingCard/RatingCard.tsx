import { FC, memo, useCallback, useState } from 'react';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { useTranslation } from 'react-i18next';

import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { StarRating } from '@/shared/ui/redesigned/StarRating';

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
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
      (selectedStartCount: number) => {
        setStartCount(selectedStartCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStartCount);
        }
      },
      [hasFeedback, onAccept],
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
          data-testid="RatingCard.Input"
          value={feedback}
          onChange={setFeedback}
          placeholder={t('review')}
        />
      </>
    );

    const content = (
      <>
        <VStack align="center" gap="8" max>
          <Text title={startCount ? t('thanksForRate') : title} />

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
                <Button
                  data-testid="RatingCard.Close"
                  onClick={cancelHandler}
                  variant="outline"
                >
                  {t('closeBtn')}
                </Button>
                <Button data-testid="RatingCard.Send" onClick={acceptHandler}>
                  {t('sendBtn')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
            <VStack gap="32" max>
              {modalContent}
              <Button fullWidth size="sizeL" onClick={acceptHandler}>
                {t('sendBtn')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </>
    );

    return (
      <Card
        padding="24"
        border="partial"
        className={className}
        max
        data-testid="RatingCard"
      >
        {content}
      </Card>
    );
  },
);

RatingCard.displayName = 'RatingCard';
