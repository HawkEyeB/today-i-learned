import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../css_variables.css";
import "./Header.css";

function Header(props) {
  // Responsável por fazer o botão funcionar no componente App
  const { setShowForm } = props;
  const { show } = props;
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{t("tittle")}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={function () {
          return setShowForm((show) => !show);
        }}
      >
        {show ? t("buttonClose") : t("buttonOpen")}
      </button>
    </header>
  );
}
export default Header;
