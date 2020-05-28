import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import "../css/Login.css";
const Login = ({ appUser, setAppUser }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [usertype, setUserType] = React.useState('');

    const handleLogIn = () => {
        console.log(username)
        console.log(password)

        const body = {
            username: username,
            password: password,
        }

        axios.post('/api/authenticate', body)
            .then((res) => {
                if (res.data.success || res.data.usertype) {
                    console.log('Worked')
                    setAppUser(username)
                    setUserType(res.data.usertype)

                }
                else {
                    //auth error
                    setError(res.data.error)

                }
                console.log(error)
            })
            .catch(() => {
                setError('Failed to authenticate')
            })
    }

    if (appUser && usertype === 'store') {
        return <Redirect to="/store" />
    }
    else if (appUser && usertype === 'admin') {
        return <Redirect to="/storeManagement" />
    }

    return (

        <div>
            <h1 className="homepage-head">HOMEPAGE</h1>
            <div className="flex-box">
                <div>
                    <input className="username-input" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <input className="password-input" type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button className="login-bttn" disabled={!username || !password} onClick={handleLogIn}>Log in</button>
                </div>
            </div>
            <div id="error">
                {error && <strong>{error}</strong>}
            </div>
        </div>
    );
};
export default Login;

