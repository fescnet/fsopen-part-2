import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FilterForm from './FilterForm'
import Countrys from './Countrys'

const App = () => {

  const [countrys, setCountrys] = useState([]) // countries from API
  const [filter, setFilter] = useState('') // filter's search term
  const [weathers, setWeathers] = useState([]) // info already cosumed from weather API, works like a cache

  // Get countries from API
  const getAllCountrys = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountrys(response.data)
      })
      .catch(() => console.log('Error'))
  }

  useEffect(getAllCountrys, [])

  // updates filter var with input value
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  // filter the countrys array
  const search = filter => {
    if(countrys.length === 0)
      return []

    if(filter === '')
      return []

    const countrysFound = countrys.filter(c => {
      return c.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0
    })

    return countrysFound
  }

  let countrysFound = search(filter)

  // show button handler
  const handleCountryShowClick = country => {
    setFilter(country.name)
  }

  // gets weather data from api
  // data is stored in an array to avoid repeated calls
  const getWeatherFromApi = country => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}`)
      .then(response => {
        // console.log(response.data)
        if(!response.data.current){
          throw new Error("Error");
        }
        setWeathers(weathers.concat(response.data))
      })
      .catch(() => console.log('Error getting data from weather API.  Probably limit exceeded.'))
  }

  return (
    <div>
      <FilterForm handleFilterChange={handleFilterChange} filter={filter} />
      <Countrys countrys={countrysFound} handleCountryShowClick={handleCountryShowClick} weathers={weathers} getWeatherFromApi={getWeatherFromApi} />
    </div>
  )
}

export default App
