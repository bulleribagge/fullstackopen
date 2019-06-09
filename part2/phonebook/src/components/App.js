import React, { useState } from 'react'
import Number from './Number'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '78241491498' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredPersons = searchTerm === '' ? persons : persons.filter(x => x.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)

  const handleAddPerson = (e) => {
    e.preventDefault();
    console.log('newPhoneNumber', newPhoneNumber);
    if (!persons.find(x => x.name === newName)) {
      setPersons(persons.concat({ name: newName, phoneNumber: newPhoneNumber }));
      setNewName('');
      setNewPhoneNumber('');
    } else {
      alert(`${newName} is already in the phonebook`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={searchTerm} onChange={(e) => handleSearchTermChange(e)} />
      <form>
        <div>
          name: <input value={newName} onChange={(e) => handleNameChange(e)} />
        </div>
        <div>
          phonenumber: <input value={newPhoneNumber} onChange={(e) => handlePhoneNumberChange(e)} />
        </div>
        <div>
          <button type="submit" onClick={(e) => handleAddPerson(e)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredPersons.map(x =>
            <Number key={x.name} person={x} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App