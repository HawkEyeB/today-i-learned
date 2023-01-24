import React, { useEffect, useState } from "react";
import supabase from "./supabase";
import "./App.css";
import "./css_variables.css";

import Header from "./components/Header/Header.jsx";
import FactList from "./components/FactList/FactList.jsx";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter.jsx";
import NewFactForm from "./components/NewFactForm/NewFactForm";
import { t } from "i18next";

// Se eu preciso de uma função em outro componente, eu preciso coloca-las no Father

function App() {
  // Mostra e esconde o formulário
  const [showForm, setShowForm] = useState(false);

  // Iniciando os States de cada componente
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  // Coletando e selecionando os dados do SupaBase
  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("tb_facts").select("*");

        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        const { data: tb_facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(100);
        console.log(error);

        if (!error) setFacts(tb_facts);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  // Utilização dos States para funcionamento das funções dos componentes
  return (
    <>
      {/* Responsável pela abertura e fechamento do formulário */}
      <Header show={showForm} setShowForm={setShowForm} />

      {/* Responsável pela funcionalidade do Formulário quando aberto */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        {/* Responsável por filtrar os fatos pelas categorias */}
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

// Função para disponibilizar um mini gif de loading
function Loader() {
  return <p className="message">{t("loading")}</p>;
}

export default App;
