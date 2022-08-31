import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'
const authToken = JSON.parse(window.localStorage.getItem('user')).token;

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (title, url, author) => {
    const request = axios.post(baseUrl, { title, url, author }, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    return request.then(response => response.data);
}

const like = (blog) => {
    const likes = blog.likes + 1;
    const request = axios.put(
        `${baseUrl}/${blog.id}`,
        { ...blog, likes },
        {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }
    );
    return request.then(response => response.data);
}

const remove = (id) => {
    const request = axios.delete(
        `${baseUrl}/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        }
    );
    return request.then(response => response.data);
}

export default { getAll, create, like, remove }