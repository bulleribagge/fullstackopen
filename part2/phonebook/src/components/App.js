import React, { useState, useEffect } from 'react'
import PhoneBook from './PhoneBook';
import PersonForm from './PersonForm'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
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
      const newPerson = { name: newName, number: newPhoneNumber }
      axios.post("http://localhost:3001/persons", newPerson)
      .then(res => {
        setPersons(persons.concat(res.data));
        setNewName('');
        setNewPhoneNumber('');
      })
    } else {
      alert(`${newName} is already in the phonebook`);
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(res => {
      setPersons(res.data)
      console.log(res.data)
    })
  }, [])

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