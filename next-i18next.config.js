module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de'],
    defaultNS: 'common',
  },
  localePath: './public/locales', // This is the directory where your translation files are located.
  detection: {
    lookupCookie: 'next-i18next',
    order: ['cookie', 'header'],
    caches: ['cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
};
