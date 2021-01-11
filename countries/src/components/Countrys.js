import React from 'react'
import Country from './Country'

const Countrys = ({countrys, handleCountryShowClick, getWeatherFromApi, weathers}) => {

  // show a message if there are more then 10 countries to display
  if(countrys.length > 10){
    return <div>Too many matches, specify another filter</div>
  }

  // show the country if there is only one filtered
  // gets weather info cached in weathers array if it exists, otherwise, get data from API
  // I could renew cache info after 5min, for instance, but I'm looking forward to learn more about react :)
  if(countrys.length === 1){
    const weatherFound = weathers.find((w) => w.location.name.toUpperCase().indexOf(countrys[0].capital.toUpperCase()) >= 0)
    if(!weatherFound){
      getWeatherFromApi(countrys[0])
    }
    return <Country country={countrys[0]} weather={weatherFound} />
  }

  return (
    <div>
      { countrys.map((c) =>
        <div key={c.alpha3Code}>
          {c.name} <button onClick={() => handleCountryShowClick(c)}>show</button>
        </div>)
      }
    </div>)
}

export default Countrys
