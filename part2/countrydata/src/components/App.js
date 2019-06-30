import React, { useState, useEffect } from 'react'
import Search from './Search'
import SearchResult from './SearchResult'
import CountryDetails from './CountryDetails'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchTerm, setSearchTerm] = useState("Sweden")

    const matchingCountries = countries.filter(c => c.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const fetchCountries = () => {
        console.log('fetching countries...')
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(res => {
                setCountries(res.data)
                console.log('fetched countries...', res.data)
            })
    }

    useEffect(fetchCountries, [])

    return (
        <div>
            <Search searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
            {matchingCountries.length == 0 && 
                <div>No matches</div>
            }
            {matchingCountries.length >= 10 && 
                <div>Too many matches, specify another filter</div>
            }
            {matchingCountries.length > 1 && matchingCountries.length < 10 &&
                <SearchResult countries={matchingCountries}/>
            }
            {matchingCountries.length === 1 &&
                <CountryDetails country={matchingCountries[0]}/>
            }
        </div>
    )
}

export default App