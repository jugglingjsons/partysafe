// i18n.js
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en', // Set your default language here
  resources: {
    "app.title": {
      "en": "My App",
      "fr": "Mon Application",
      "de": "Meine Anwendung"
    },
  });

export default i18n;
