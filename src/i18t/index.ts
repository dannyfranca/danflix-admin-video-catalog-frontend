import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources: Resource = {
  en: {
    translation: {
      Dashboard: "Dashboard",
      Categories: "Categories",
      "Category List": "Category List",
      "Add Category": "Add Category",
      "Create Category": "Create Category",
      "Edit Category": "Edit Category",
    },
  },
  "pt-BR": {
    translation: {
      Dashboard: "Painel",
      Categories: "Categorias",
      "Category List": "Listagem de Categorias",
      "Add Category": "Adicionar Categoria",
      "Create Category": "Criar Categoria",
      "Edit Category": "Editar Categoria",
    },
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