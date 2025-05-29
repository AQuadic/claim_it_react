import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Language from "../icons/Language";

const LanguageComp = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem("language");
    return savedLang || i18n.language || "en";
  });

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
    if (i18n.language !== newLang && i18n.changeLanguage) {
      i18n.changeLanguage(newLang).then(() => {
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        document.body.dir = newLang === "ar" ? "rtl" : "ltr";
      });
    } else {
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      document.body.dir = newLang === "ar" ? "rtl" : "ltr";
    }
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <button
      className="cursor-pointer flex items-center gap-2 text-electric-blue p-4"
      type="button"
      onClick={toggleLanguage}
    >
      <Language />
    </button>
  );
};

export default LanguageComp;
