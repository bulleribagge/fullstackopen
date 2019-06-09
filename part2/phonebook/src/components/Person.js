import React from 'react'

const Person = ({ person }) => (
    <tr>
        <td>{person && person.name}</td>
        <td>{person && person.phoneNumber}</td>
    </tr>
)

export default Person