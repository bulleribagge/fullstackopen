import React from 'react'

const PersonForm = ({newName, newPhoneNumber, handleNameChange, handlePhoneNumberChange, handleAddPerson}) => {
    return (
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
    )
}

export default PersonForm