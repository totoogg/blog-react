import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18ForTests from '@/shared/config/i18n/i18ForTests';

export default function renderWithTranslation(component: ReactNode) {
  return render(
    <I18nextProvider i18n={i18ForTests}>{component}</I18nextProvider>,
  );
}
