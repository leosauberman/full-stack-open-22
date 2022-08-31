import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Form from './components/Form';
import './index.css';
import { Notification } from './components/Notification';
import Togglable from './components/Toggable';
import { LoginForm } from './components/LoginForm';

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [alertType, setAlertType] = useState('success');
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user);
        }
    }, [])

    const logout = () => {
        window.localStorage.removeItem('user');
        setUser(null);
    }

    const sortByLikes = (array) => array.sort((a,b) => b.likes - a.likes);

    const updateList = (newBlog) => {
        const blogIdx = blogs.findIndex((b) => b.id === newBlog.id);
        let newBlogs = [...blogs];
        if(blogIdx !== -1){
            newBlogs.splice(blogIdx, 1, newBlog);
        }
        else {
            newBlogs = [...newBlogs, newBlog];
        }
        setBlogs(sortByLikes(newBlogs));
    }

    const pushNotification = (message, isError) => {
        setMessage(message);
        setAlertType(isError ? 'error' : 'success');
        setTimeout(() => setMessage(null), 1500);
    }

    const toggle = () => {
        blogFormRef.current.toggleVisibility();
    }

    const handleLike = (id) => {
        const blogLiked = blogs.find((b) => b.id === id);
        blogService.like(blogLiked)
            .then((res) => {
                pushNotification(`${blogLiked.title} liked!`, false);
                updateList(res);
            })
            .catch(() =>
                pushNotification(`Error while liking ${blogLiked.title}`, true))
    }

    const removeFromList = (idx) => {
        const newList = [...blogs]
        newList.splice(idx, 1);
        setBlogs(newList);
    }

    const handleRemove = (id) => {
        const blogToBeRemovedIdx = blogs.findIndex((b) => b.id === id);

        if(window.confirm(`Do you really want to delete ${blogs[blogToBeRemovedIdx].title}?`)){
            blogService.remove(id)
                .then(() => {
                    pushNotification(`${blogs[blogToBeRemovedIdx].title} deleted successfully!`, false);
                    removeFromList(blogToBeRemovedIdx);
                })
                .catch(() =>
                    pushNotification(`Error while deleting ${blogs[blogToBeRemovedIdx].title}`, true))
        }
    }

    if(user === null) {
        return (
            <LoginForm
                setUser={setUser}
                notify={pushNotification}
                message={message}
                alertType={alertType}
            />
        );
    }

    return (
        <div>
            <Notification message={message} type={alertType}/>
            <h2>Create new blog</h2>
            <Togglable buttonLabel='New Blog' ref={blogFormRef}>
                <Form updateList={updateList} notify={pushNotification} toggle={toggle}/>
            </Togglable>
            <h2>Blogs</h2>
            {sortByLikes(blogs).map(blog =>
                <Blog key={blog.id} blog={blog}
                    handleLike={handleLike}
                    handleRemove={handleRemove}
                />
            )}
            <footer>
                <span>Logged in as: {user.name}</span>
                <button onClick={logout}>Log out</button>
            </footer>
        </div>
    )
}

export default App
