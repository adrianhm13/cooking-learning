import {useState} from 'react'
import {useHistory} from 'react-router-dom'

import './SearchBar.css'

export default function SearchBar() {
    const [term, setTerm] = useState('')
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        setTerm('')
        history.push(`/search?q=${term}`)
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input type="text" id="search" value={term} onChange={(e) => {setTerm(e.target.value)}}/>
            </form>
        </div>
    )
}
