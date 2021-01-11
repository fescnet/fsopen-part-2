import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const Country = ({country, weather}) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <Languages langs={country.languages} />
    <img src={country.flag} alt="Flag" width="200" />
    <h2>Weather in {country.capital}</h2>
    <Weather weather={weather} />
  </div>
)

export default Country
