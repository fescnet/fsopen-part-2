import React from 'react'

const Languages = ({langs}) => {
  if(langs.length === 0){
    return <div>No data</div>
  }

  return (
    <ul>
      {langs.map(l => <li key={l.iso639_1}>{l.name}</li>)}
    </ul>
  )
}

export default Languages
