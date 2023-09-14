import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Your translations resources
const resources = {
  en: {
    translation: {
      'app.title': 'My App',
      // Add more translations here as needed
    },
  },
  fr: {
    translation: {
      'app.title': 'Mon Application',
      // Add more translations here as needed
    },
  },
  de: {
    translation: {
      'app.title': 'Meine Anwendung',
      // Add more translations here as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set your default language here
  fallbackLng: 'en', // Fallback language in case translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
