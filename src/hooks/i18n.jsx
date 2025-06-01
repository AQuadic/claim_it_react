import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeAr from "../locales/ar/home.json";
import homeEn from "../locales/en/home.json";

import resultAr from "../locales/ar/result.json";
import resultEn from "../locales/en/result.json";

import notFoundAr from "../locales/ar/notFound.json";
import notFoundEn from "../locales/en/notFound.json";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  ns: ["home", "result", "notFound"],
  defaultNS: "home",
  resources: {
    en: {
      home: homeEn,
      result: resultEn,
      notFound: notFoundEn,
    },
    ar: {
      home: homeAr,
      result: resultAr,
      notFound: notFoundAr,
    },
  },
});

export default i18n;
