import React from 'react'
import Person from './Person'

const PhoneBook = ({ persons }) => (
    <table>
        <tbody>
            {persons.map(x =>
                <Person key={x.name} person={x} />
            )}
        </tbody>
    </table>
)

export default PhoneBook