import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import { enTranslations } from "./en";
import { ptBrTranslations } from "./pt-BR";

const resources: Resource = {
  en: {
    translation: enTranslations,
  },
  "pt-BR": {
    translation: ptBrTranslations,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
