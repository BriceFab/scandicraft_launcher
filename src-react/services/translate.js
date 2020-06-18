import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translate_fr from '../translates/fr.json';

i18next
  .use(LanguageDetector)
  .init({
    lng: 'fr',
    fallbackLng: 'fr',
    debug: true,
    resources: {
      fr: {
        translation: translate_fr
      },
    },
  });