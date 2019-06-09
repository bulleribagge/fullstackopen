import React, { useState } from 'react'
import Number from './Number'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleAddName = (e) => {
    e.preventDefault();
    if(!persons.find(x => x.name === newName))
    {
      setPersons(persons.concat({name: newName}));
      setNewName('');
    }else{
      alert(`${newName} is already in the phonebook`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => handleNameChange(e)}/>
        </div>
        <div>
          <button type="submit" onClick={(e) => handleAddName(e)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(x => 
        <Number key={x.name} person={x}/>
      )}
    </div>
  )
}

export default App