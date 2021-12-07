import { projectFirestore } from "../../firebase/config";
import { useEffect, useState } from "react";
// Styles
import "./Home.css";

// Components
import RecipesList from "../../components/RecipesList";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        // onSnapshot adds an event listener and every time the data changes from firebase, it will trigger the function. It takes a second argument as an error
        if (snapshot.empty) {
          setError("There is no recipes");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );
    return () => unsub(); // projectFirestore returns a function which can assigned to a const so we can call it later to remove the event listener}
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipesList recipes={data} />}
    </div>
  );
}
