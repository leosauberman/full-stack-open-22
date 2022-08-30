import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((res) => res.data);
}

const save = (number) => {
    const request = axios.post(baseUrl, number);
    return request.then((res) => res.data);
}

const deletePhone = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((res) => res.data);
}

const update = (number) => {
    const request = axios.put(`${baseUrl}/${number.id}`, number);
    return request.then((res) => res.data);
}

export default {
    getAll,
    save,
    deletePhone,
    update
}

