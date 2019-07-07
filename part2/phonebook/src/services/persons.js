import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const get = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = newPerson => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(res => res.data)
}

const remove = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res)
}

const put = updatedPerson => {
    const req = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    return req.then(res => res.data)
}

export default {
    create,
    remove,
    get,
    put
}