import { projectFirestore } from "../../firebase/config";

// styles
import "./Recipe.css";

// components
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export default function Recipe() {
  const {mode} = useTheme();
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore.collection('recipes').doc(id).get().then((doc) => {
      if(doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      }else{
        setIsPending(false);
        setError('Could not load the recipe')
      }
    })
  }, [id])
  
  return (
    <div className={`recipe ${mode}`}>
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
