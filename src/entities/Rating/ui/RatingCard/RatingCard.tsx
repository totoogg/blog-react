import { FC, memo, useCallback, useState } from 'react';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { useTranslation } from 'react-i18next';
import {
  Button as ButtonDeprecated,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
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
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <>
            <TextDeprecated title={feedbackTitle} />
            <InputDeprecated
              data-testid="RatingCard.Input"
              value={feedback}
              onChange={setFeedback}
              placeholder={t('review')}
            />
          </>
        }
        on={
          <>
            <Text title={feedbackTitle} />
            <Input
              data-testid="RatingCard.Input"
              value={feedback}
              onChange={setFeedback}
              placeholder={t('review')}
            />
          </>
        }
      />
    );

    const content = (
      <>
        <VStack align="center" gap="8" max>
          <ToggleFeatures
            feature="isAppRedesigned"
            off={
              <TextDeprecated title={startCount ? t('thanksForRate') : title} />
            }
            on={<Text title={startCount ? t('thanksForRate') : title} />}
          />

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
              <ToggleFeatures
                feature="isAppRedesigned"
                off={
                  <HStack max gap="16" justify="end">
                    <ButtonDeprecated
                      data-testid="RatingCard.Close"
                      onClick={cancelHandler}
                      theme={ButtonTheme.OUTLINE_RED}
                    >
                      {t('closeBtn')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      data-testid="RatingCard.Send"
                      onClick={acceptHandler}
                    >
                      {t('sendBtn')}
                    </ButtonDeprecated>
                  </HStack>
                }
                on={
                  <HStack max gap="16" justify="end">
                    <Button
                      data-testid="RatingCard.Close"
                      onClick={cancelHandler}
                      variant="outline"
                    >
                      {t('closeBtn')}
                    </Button>
                    <Button
                      data-testid="RatingCard.Send"
                      onClick={acceptHandler}
                    >
                      {t('sendBtn')}
                    </Button>
                  </HStack>
                }
              />
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
            <VStack gap="32" max>
              {modalContent}
              <ToggleFeatures
                feature="isAppRedesigned"
                off={
                  <ButtonDeprecated
                    fullWidth
                    size={ButtonSize.L}
                    onClick={acceptHandler}
                  >
                    {t('sendBtn')}
                  </ButtonDeprecated>
                }
                on={
                  <Button fullWidth size="sizeL" onClick={acceptHandler}>
                    {t('sendBtn')}
                  </Button>
                }
              />
            </VStack>
          </Drawer>
        </MobileView>
      </>
    );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <CardDeprecated className={className} max data-testid="RatingCard">
            {content}
          </CardDeprecated>
        }
        on={
          <Card
            padding="24"
            border="partial"
            className={className}
            max
            data-testid="RatingCard"
          >
            {content}
          </Card>
        }
      />
    );
  },
);

RatingCard.displayName = 'RatingCard';
