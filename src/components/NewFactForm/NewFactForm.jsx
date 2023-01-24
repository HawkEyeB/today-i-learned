import React, { useState } from "react";
import "../../css_variables.css";
import "./NewFactForm.css";
import { CATEGORIES } from "../../const";
import supabase from "../../supabase";
import { useTranslation } from "react-i18next";

// Validação dos sites para o campo Source
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm(props) {
  const { setFacts } = props;
  const { setShowForm } = props;
  const { t } = useTranslation();

  // Utilizando States para controle dos formulários na mão do React
  const [description, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = description.length;

  // State responsável para desabilitar os botões enquanto realiza o cadastro
  const [isUploading, setIsUploading] = useState(false);
  //
  // Função necessária para inserção das informações no Banco e na Lista
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      description &&
      isValidHttpUrl(source) &&
      category &&
      textLength <= 200
    ) {
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("tb_facts")
        .insert([{ description, source, category }])
        .select();
      setIsUploading(false);

      if (!error) {
        setFacts(function (facts) {
          return [newFact[0], ...facts];
        });
      }

      // Deixando os campos do formulário vázios depois da inserção
      setText("");
      setSource("");
      setCategory("");

      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t("facts")}
        value={description}
        onChange={function (e) {
          return setText(e.target.value);
        }}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>

      <input
        type="text"
        placeholder={t("source")}
        value={source}
        onChange={function (e) {
          return setSource(e.target.value);
        }}
        disabled={isUploading}
      />

      <select
        value={category}
        onChange={function (e) {
          return setCategory(e.target.value);
        }}
        disabled={isUploading}
      >
        <option value="">{t("categoria")}:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>

      <button className="btn btn-large" disabled={isUploading}>
        {t("post")}
      </button>
    </form>
  );
}

export default NewFactForm;
