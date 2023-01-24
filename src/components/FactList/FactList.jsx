import React, { useState } from "react";
import "./FactList.css";
import Facts from "../Facts/Facts.jsx";
import "../../css_variables.css";
import { useTranslation } from "react-i18next";

function FactList(props) {
  // Importação dos props do FactList para o App
  const { facts } = props;
  const { setFacts } = props;
  const { t } = useTranslation();

  if (facts.length === 0) {
    return <p className="message">{t("noFacts")}</p>;
  }

  // Utilização dos props importados do Facts
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Facts key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>{t("quantityFacts", { facts: facts.length })}</p>
    </section>
  );
}
export default FactList;
