import React, { useTransition } from "react";
import "./CategoryFilter.css";
import "../../css_variables.css";
import { CATEGORIES } from "../../const";
import { useTranslation } from "react-i18next";

function CategoryFilter(props) {
  // Importação dos Props para o App
  const { setCurrentCategory } = props;
  const { t } = useTranslation();
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={function () {
              return setCurrentCategory("all");
            }}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.id} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={function () {
                return setCurrentCategory(cat.name);
              }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
