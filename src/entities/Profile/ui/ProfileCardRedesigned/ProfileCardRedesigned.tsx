import { FC, memo } from 'react';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify="center" max className={className}>
      <Text
        theme="error"
        title={t('errorTitleProfile')}
        text={t('errorTextProfile')}
        align="center"
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding="24" max>
      <VStack gap="32">
        <HStack max justify="center">
          <Skeleton border="100%" width={120} height={120} />
        </HStack>
        <HStack gap="32" max>
          <VStack gap="16" max>
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
          </VStack>
          <VStack gap="16" max>
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned: FC<ProfileCardProps> = memo(
  ({
    className,
    data,
    onChangeFirstname,
    onChangeLastname,
    onChangeCity,
    onChangeAge,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
    readonly,
  }) => {
    const { t } = useTranslation('profile');

    return (
      <Card max padding="24" className={className}>
        <VStack gap="32">
          {data?.avatar && (
            <HStack justify="center" max>
              <Avatar size={120} src={data?.avatar} alt="Avatar" />
            </HStack>
          )}
          <HStack gap="24" max>
            <VStack gap="16" max>
              <Input
                value={data?.first}
                label={t('name')}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
              />
              <Input
                value={data?.lastname}
                label={t('lastname')}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
              />
              <Input
                value={data?.age}
                label={t('age')}
                onChange={onChangeAge}
                readonly={readonly}
                data-testid="ProfileCard.age"
              />
              <Input
                value={data?.city}
                label={t('city')}
                onChange={onChangeCity}
                readonly={readonly}
              />
            </VStack>
            <VStack gap="16" max>
              <Input
                value={data?.username}
                label={t('username')}
                onChange={onChangeUsername}
                readonly={readonly}
              />
              <Input
                value={data?.avatar}
                label={t('avatar')}
                onChange={onChangeAvatar}
                readonly={readonly}
              />
              <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
              />
              <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
              />
            </VStack>
          </HStack>
        </VStack>
      </Card>
    );
  },
);

ProfileCardRedesigned.displayName = 'ProfileCardRedesigned';
