import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login';

const login = (username, password) =>
    axios.post(baseUrl, { username, password });

const module = {
    login
}

export default module;