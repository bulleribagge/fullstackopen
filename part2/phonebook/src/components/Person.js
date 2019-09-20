import React from 'react'

const Person = ({ person, handleDeletePerson }) => (
    <tr>
        <td>{person && person.name}</td>
        <td>{person && person.number}</td>
        <td>{person && 
            <button onClick={(e) => handleDeletePerson(e, person._id)}>delete</button>
        }</td>
    </tr>
)

export default Person