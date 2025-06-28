import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

interface SettingPageProps {
  className?: string;
}

const SettingPage = memo((props: SettingPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={className}>
      <VStack gap="16">
        <Text title={t('Settings')} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

SettingPage.displayName = 'SettingPage';

export default SettingPage;
