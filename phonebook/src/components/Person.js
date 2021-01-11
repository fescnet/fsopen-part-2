import React from 'react'

const Person = ({person, deleteHandler}) => <div key={person.name}>{person.name} {person.number} <button onClick={() => { deleteHandler(person) }}>delete</button></div>

export default Person
