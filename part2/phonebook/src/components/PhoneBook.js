import React from 'react'
import Person from './Person'

const PhoneBook = ({ persons, handleDeletePerson }) => (
    <table>
        <tbody>
            {persons.map(x =>
                <Person key={x._id} person={x} handleDeletePerson={handleDeletePerson} />
            )}
        </tbody>
    </table>
)

export default PhoneBook