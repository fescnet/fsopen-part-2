import React from 'react'

const Weather = ({weather}) => {
  if(weather){
    return (
      <div>
        <b>temperature: {weather.current.temperature} Celcius</b>
        <div>{weather.current.weather_icons.map((i) => <img src={i} key={i} alt="weather icon" />)}</div>
        <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </div>
    )
  }
  return (
    <div>
      <div>No weather info yet.  Try again later.</div>
      <div>API limit may have been reached.</div>
    </div>
  )
}

export default Weather
