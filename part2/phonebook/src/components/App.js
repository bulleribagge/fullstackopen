import React, { useState } from 'react'
import PhoneBook from './PhoneBook';
import PersonForm from './PersonForm'
import Filter from './Filter'

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
      <Filter 
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <h3>Add new person</h3>
      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers</h2>
      <PhoneBook persons={filteredPersons} />
    </div>
  )
}

export default App