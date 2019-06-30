import React from 'react'

const Person = ({ person }) => (
    <tr>
        <td>{person && person.name}</td>
        <td>{person && person.number}</td>
    </tr>
)

export default Person