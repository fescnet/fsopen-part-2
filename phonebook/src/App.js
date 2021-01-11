import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Message from './components/Message'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [term, setTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const getPersonsFromServer = () => {
    personsService.getAll()
      .then(personsReturned => {
        setPersons(personsReturned)
      })
      .catch(() => {
        displayMessage(`Unable to retrieve data from server.`, true)
      })
  }

  const clearForm = () => {
    setNewName('')
    setNewPhone('')
  }

  useEffect(getPersonsFromServer, [])

  // handlers

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleTerm = (event) => {
    const value = event.target.value
    setTerm(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if(!newName){
      displayMessage('Name is required', true)
      return;
    }

    if(!newPhone){
      displayMessage('Number is required', true)
      return;
    }

    // if a number is added to an already existing user, the new number will replace the old number
    const existingPerson = persons.find(p => p.name.toUpperCase() === newName.toUpperCase())
    if(existingPerson){
      if(!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        return;

      personsService.update(existingPerson.id, {...existingPerson, number: newPhone})
        .then(changedPerson => {
          setPersons(persons.map(p => p.id !== changedPerson.id ? p : changedPerson))
          clearForm()
          displayMessage(`Number changed successfully!`, false)
        })
        .catch(error => {
          displayMessage(`The number could not be changed`, true)
        })
      return;
    }

    // it's a new person
    const newPerson = {name: newName, number: newPhone}
    personsService.create(newPerson)
      .then(personCreated => {
        setPersons(persons.concat(personCreated))
        clearForm()
        displayMessage(`Person added!`, false)
      })
      .catch(error => {
        displayMessage(error.response.data.error, true)
      })
  }

  // filter

  const filter = (term) => {
    if(term){
      return persons.filter((p) => p.name.toUpperCase().includes(term.toUpperCase()))
    }
    return persons
  }

  const filteredPersons = filter(term)

  // delete a person

  const deleteHandler = person => {

    if(!window.confirm(`Delete ${person.name}?`))
      return false;

    personsService.deleteOne(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        displayMessage(`Person deleted successfully!`, false)
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        displayMessage(`Information of ${person.name} has already been removed from server`, true)
      })
  }

  // error / success messages

  const displayMessage = (text, isError) => {
    setMessage(text)
    setIsError(isError)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message text={message} isError={isError} />
      <Filter handleTerm={handleTerm} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App
