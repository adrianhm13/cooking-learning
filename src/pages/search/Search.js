import { useLocation } from 'react-router-dom'
import RecipesList from '../../components/RecipesList'
import { useFetch } from '../../hooks/useFetch'
// Styles
import './Search.css'

export default function Search() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    console.log("queryString: ", queryString)
    console.log("queryParams", queryParams)
    console.log("query", query)

    const url = 'http://localhost:3000/recipes?q=' + query
    const {data, isPending, error} = useFetch(url);

    return (
        <div>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Searching...</p>}
            {data && <RecipesList recipes={data} />}
        </div>
    )
}
