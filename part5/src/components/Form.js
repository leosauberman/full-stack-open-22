import { useState } from 'react';
import blogService from '../services/blogs';

const Form = (props) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');

    const createBlog = (ev) => {
        ev.preventDefault();
        blogService.create(title, url, author)
            .then((res) => {
                setTitle('');
                setUrl('');
                setAuthor('');
                props.updateList(res);
                props.notify('Blog created successfully!', false);
                props.toggle();
            })
            .catch(() => props.notify('Unable to create blog, try again later', true));
    }

    return (
        <form onSubmit={createBlog}>
            <label htmlFor='title'>title: </label>
            <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                id='title'
                name='title'
                type='text'
                minLength="5" />
            <label htmlFor='url'>url: </label>
            <input
                value={url}
                onChange={({ target }) => setUrl(target.value)}
                id='url'
                name='url'
                type='text'
                minLength="5"/>
            <label htmlFor='author'>author</label>
            <input
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                id='author'
                name='author'
                type='text'
                minLength="3" />
            <button type='submit'>Create</button>
        </form>
    )
}

export default Form;