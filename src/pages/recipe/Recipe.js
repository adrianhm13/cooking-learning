// styles
import "./Recipe.css";

// components
import { useFetch } from "../../hooks/useFetch";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect } from "react";

export default function Recipe() {
  const { id } = useParams();
  const url = "http://localhost:3000/recipes/" + id;
  const history = useHistory();

  const { data: recipe, isPending, error } = useFetch(url);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 1500);
    }
  }, [error, history]);

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
