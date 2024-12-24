import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from '../locales/en/translations'
import translationVI from '../locales/vi/translations'
import Cookies from "js-cookie";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: Cookies.get('language') || 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
