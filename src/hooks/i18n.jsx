import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeEn from "../locales/en/home.json";
import homeAr from "../locales/ar/home.json";

import resultEn from "../locales/en/result.json";
import resultAr from "../locales/ar/result.json";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  ns: [
    "home",
    "result"
  ],
  defaultNS: "home",
  resources: {
    en: {
      home: homeEn,
      result: resultEn,
    },
    ar: {
      home: homeAr,
      result: resultAr,
    },
  },
});

export default i18n;
