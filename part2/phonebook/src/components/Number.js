import React from 'react'

export default Number = ({ person }) => (
    <tr>
        <td>{person && person.name}</td>
        <td>{person && person.phoneNumber}</td>
    </tr>
)