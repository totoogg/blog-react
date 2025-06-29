import { Preview } from '@storybook/react';
import '../../src/app/styles/index.scss';
import RouterDecorator from '../../src/shared/config/storybook/RouteDecorator/RouteDecorator';
import { StoreProvider } from '../../src/app/providers/StoreProvider/ui/StoreProvider';
import { I18nextProvider } from 'react-i18next';
import { Suspense } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../../public/locales/en/translation.json';
import enTranslationsAbout from '../../public/locales/en/about.json';
import enTranslationsMain from '../../public/locales/en/main.json';
import enTranslationsProfile from '../../public/locales/en/profile.json';
import enTranslationsArticle from '../../public/locales/en/article.json';
import ruTranslations from '../../public/locales/ru/translation.json';
import ruTranslationsAbout from '../../public/locales/ru/about.json';
import ruTranslationsMain from '../../public/locales/ru/main.json';
import ruTranslationsProfile from '../../public/locales/ru/profile.json';
import ruTranslationsArticle from '../../public/locales/ru/article.json';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { Theme } from '../../src/shared/const/theme';

initialize();

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
      about: enTranslationsAbout,
      main: enTranslationsMain,
      profile: enTranslationsProfile,
      article: enTranslationsArticle,
    },
    ru: {
      translation: ruTranslations,
      about: ruTranslationsAbout,
      main: ruTranslationsMain,
      profile: ruTranslationsProfile,
      article: ruTranslationsArticle,
    },
  },
});

const preview: Preview = {
  decorators: [
    (Story, context) => {
      i18n.changeLanguage(context.globals.locale);

      return (
        <I18nextProvider i18n={i18n}>
          <Suspense fallback="">
            <RouterDecorator>
              <StoreProvider initialState={{}}>
                <div className="app_redesigned">
                  <Story />
                </div>
              </StoreProvider>
            </RouterDecorator>
          </Suspense>
        </I18nextProvider>
      );
    },
  ],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ru', title: 'Русский' },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    msw: {
      handlers: [],
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
        { name: 'dark', class: Theme.DARK, color: '#000000' },
        { name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
      ],
    },
  },
  loaders: [mswLoader],
};

export default preview;
