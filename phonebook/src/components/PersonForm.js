import React from 'react'

const PersonForm = ({handleSubmit, handleNameChange, handlePhoneChange, newName, newPhone}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handlePhoneChange} value={newPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
