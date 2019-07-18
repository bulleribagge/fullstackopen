import React, { useState, useEffect } from 'react'
import PhoneBook from './PhoneBook';
import PersonForm from './PersonForm'
import Filter from './Filter'
import personService from '../services/persons'
import Notification from './Notification'
import '../index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const displayNotificationMessage = (msg, delay = 3000) => {
    setNotificationMessage(msg)

    setTimeout(() => {
      setNotificationMessage(null)
    }, delay)
  }

  const filteredPersons = searchTerm === '' ? persons : persons.filter(x => x.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!persons.find(x => x.name === newName)) {
      const newPerson = { name: newName, number: newPhoneNumber }
      personService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewPhoneNumber('');
        displayNotificationMessage('Person added')
      })
    } else {
      var shouldUpdate = window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`);
      if(shouldUpdate)
      {
        var personToUpdate = persons.filter(x => x.name === newName)[0]
        personToUpdate.number = newPhoneNumber
        console.log(personToUpdate)
        personService.put(personToUpdate)
        .then(updatedPerson => {
          const newPersons = persons.filter(x => x.id !== personToUpdate.id).concat(updatedPerson)
          setPersons(newPersons)
          displayNotificationMessage('Person updated')
        })
      }
    }
  }

  const handleDeletePerson = (e, id) => {
    const personToDelete = persons.filter(x => x.id === id)[0]
    const shouldDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if(shouldDelete)
    {
      personService.remove(id)
      .then(_ => {
        const newPersons = persons.filter(x => x.id !== id)
        setPersons(newPersons)
      })
    }
  }

  useEffect(() => {
    personService.get()
    .then(persons => {
      setPersons(persons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
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
      <PhoneBook persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App