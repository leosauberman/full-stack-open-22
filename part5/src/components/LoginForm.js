import { useState } from 'react';
import loginService from '../services/login';
import { Notification } from './Notification';
import PropTypes from 'prop-types';

export const LoginForm = ({
    setUser,
    notify,
    message,
    alertType
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (ev) => {
        ev.preventDefault();
        loginService.login(username, password)
            .then(res => {
                if (res.status === 200) {
                    window.localStorage.setItem('user', JSON.stringify(res.data));
                    setUser(res.data);
                    setUsername('')
                    setPassword('')
                    notify('Successful login! Welcome :)', false);
                }
            })
            .catch(() => {
                notify('Wrong username or password', true);
            })
    }

    return (
        <>
            <Notification message={message} type={alertType}/>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    message: PropTypes.string,
    alertType: PropTypes.string
}
