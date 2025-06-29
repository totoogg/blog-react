import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonDeprecate,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecate } from '@/shared/ui/deprecated/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> =
  memo(({ className }) => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onEditCancel = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
          >
            <TextDeprecate title={t('profile')} />
            {canEdit && (
              <>
                {readonly ? (
                  <ButtonDeprecate
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEdit}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    {t('edit')}
                  </ButtonDeprecate>
                ) : (
                  <HStack gap="8">
                    <ButtonDeprecate
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onEditCancel}
                      data-testid="EditableProfileCardHeader.CancelButton"
                    >
                      {t('cancel')}
                    </ButtonDeprecate>
                    <ButtonDeprecate
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSave}
                      data-testid="EditableProfileCardHeader.SaveButton"
                    >
                      {t('save')}
                    </ButtonDeprecate>
                  </HStack>
                )}
              </>
            )}
          </HStack>
        }
        on={
          <Card border="partial" padding="24" max>
            <HStack
              max
              justify="between"
              className={classNames('', {}, [className])}
            >
              <Text title={t('profile')} />
              {canEdit && (
                <>
                  {readonly ? (
                    <Button
                      variant="outline"
                      onClick={onEdit}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      {t('edit')}
                    </Button>
                  ) : (
                    <HStack gap="8">
                      <Button
                        variant="outline"
                        colorBtn="error"
                        onClick={onEditCancel}
                        data-testid="EditableProfileCardHeader.CancelButton"
                      >
                        {t('cancel')}
                      </Button>
                      <Button
                        variant="outline"
                        colorBtn="success"
                        onClick={onSave}
                        data-testid="EditableProfileCardHeader.SaveButton"
                      >
                        {t('save')}
                      </Button>
                    </HStack>
                  )}
                </>
              )}
            </HStack>
          </Card>
        }
      />
    );
  });

EditableProfileCardHeader.displayName = 'EditableProfileCardHeader';
