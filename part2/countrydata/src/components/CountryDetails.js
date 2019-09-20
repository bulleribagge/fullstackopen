import React from 'react'
import Weather from './Weather'

const CountryDetails = ({ country }) => (
    <div>
        <h1>{country.name}</h1>
        <p>
            capital {country.capital}<br />
            population {country.population}
        </p>
        <h2>Languages</h2>
        <ul>
            {country.languages.map(x => 
                <li>
                    {x.name}
                </li>
            )}
        </ul>
        <img style={{width: '200px'}} src={country.flag} />
        <Weather capital={country.capital}/>
    </div>
)

export default CountryDetails
