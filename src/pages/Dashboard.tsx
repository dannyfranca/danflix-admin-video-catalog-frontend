import * as React from "react";
import { useTranslation } from "react-i18next";

import Page from "../components/Page";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return <Page title={t("Dashboard")} />;
};

export default Dashboard;
