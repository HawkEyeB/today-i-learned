import React, { useState } from "react";
import "../../css_variables.css";
import { CATEGORIES } from "../../const";
import supabase from "../../supabase";

function Fact(props) {
  // Importação dos Props para o componente FactList
  const { fact } = props;
  const { setFacts } = props;

  const [isUpdating, setIsUpdating] = useState(false);

  // Constante que atualiza o status de um fato quando ele é "Falso"
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  // Função responsável para os votos nos fatos
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("tb_facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts(function (facts) {
        return facts.map((f) => (f.id === fact.id ? updatedFact[0] : f));
      });
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}
        {fact.description}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>

      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default Fact;
