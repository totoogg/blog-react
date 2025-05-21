import { Preview } from "@storybook/react";
import "../../src/app/styles/index.scss";
import RouterDecorator from "../../src/shared/config/storybook/RouteDecorator/RouteDecorator";
import { StoreProvider } from "../../src/app/providers/StoryProvider/ui/StoreProvider";
import { I18nextProvider } from "react-i18next";
import { Suspense } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../../public/locales/en/translation.json";
import enTranslationsAbout from "../../public/locales/en/about.json";
import enTranslationsMain from "../../public/locales/en/main.json";
import ruTranslations from "../../public/locales/ru/translation.json";
import ruTranslationsAbout from "../../public/locales/ru/about.json";
import ruTranslationsMain from "../../public/locales/ru/main.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enTranslations,
      about: enTranslationsAbout,
      main: enTranslationsMain,
    },
    ru: {
      translation: ruTranslations,
      about: ruTranslationsAbout,
      main: ruTranslationsMain,
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
            <StoreProvider initialState={{}}>
              <RouterDecorator>
                <div className="app app_light_theme">
                  <Story />
                </div>
              </RouterDecorator>
            </StoreProvider>
          </Suspense>
        </I18nextProvider>
      );
    },
  ],
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "ru", title: "Русский" },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
