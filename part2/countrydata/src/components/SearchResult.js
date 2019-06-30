import React from 'react'

const SearchResult = ({ countries  }) => (
    <ul>
        {countries.map(c => 
            <li>{c.name}</li>
        )}
    </ul>
)

export default SearchResult
