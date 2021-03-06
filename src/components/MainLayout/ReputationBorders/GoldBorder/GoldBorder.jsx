import { Icon } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Border from "../Border";

const GoldBorder = ({ children }) => {
  const { t } = useTranslation();
  let icon = (
    <span>
      <Icon type="crown" style={{ fontSize: 18 }} />
      <Icon type="crown" style={{ fontSize: 25 }} />
      <Icon type="crown" style={{ fontSize: 18 }} />
    </span>
  );

  return (
    <Border
      mainColor="#eab92f"
      customBackground="linear-gradient(315deg, #fbb034 0%, #ffdd00 74%)"
      title={t("border.titles.gold")}
      borderIcon={icon}
    >
      {children}
    </Border>
  );
};

export default GoldBorder;
