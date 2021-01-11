import React from 'react'
import Person from './Person'

const Persons = ({filteredPersons, deleteHandler}) => (
  <div>
    {filteredPersons.map((p) => <Person key={p.name} person={p} deleteHandler={deleteHandler} />)}
  </div>
)

export default Persons
