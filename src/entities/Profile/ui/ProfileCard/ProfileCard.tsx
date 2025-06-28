import { FC } from 'react';
import { Profile } from '../../model/types/profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  onChangeFirstname?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { error, isLoading } = props;

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={<ProfileCardDeprecatedLoader />}
        on={<ProfileCardRedesignedSkeleton />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        off={<ProfileCardDeprecatedError />}
        on={<ProfileCardRedesignedError />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={<ProfileCardDeprecated {...props} />}
      on={<ProfileCardRedesigned {...props} />}
    />
  );
};
