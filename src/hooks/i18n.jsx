import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeEn from "../locales/en/home.json";
import homeAr from "../locales/ar/home.json";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  ns: [
    "home",
  ],
  defaultNS: "home",
  resources: {
    en: {
      home: homeEn,
    },
    ar: {
      home: homeAr,
    },
  },
});

export default i18n;
