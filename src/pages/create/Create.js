import { useState, useRef, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
// styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );
  //redirect the user after adding a recipe
  useEffect(() => {
    console.log(data);
    if (data) {
      history.push("/");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      method,
      ingredients,
      cookingTime: cookingTime + " minutes",
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing =
      ingredient.charAt(0).toUpperCase().trim() + ingredient.slice(1).trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevList) => [...prevList, ing]);
    }
    setIngredient("");
    ingredientInput.current.focus();
  };
  return (
    <div className="create">
      <h2 className="page-title">Create your own recipes!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          ></input>
        </label>
        <label>
          <span>Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients: {""}
          {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient}, </em>
          ))}
        </p>
        <label>
          <span>Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          ></textarea>
        </label>
        <label>
          <span>Cooking Time</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          ></input>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
