import React, { useState } from 'react'

const Login = () => {
    const [ credentials, setCredentials ] = useState({
        username: '',
        password: ''
    })

    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className='LoginForm'>
            <h1>Login Page</h1>
            <form>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    name='username'
                    type='text'
                    onChange={handleChange}
                />
                <label htmlFor='password'>Password</label>
                <input
                    name='password'
                    type='password'
                    onChange={handleChange}
                />
                <button>Log In</button>
            </form>
        </div>
    )
}

export default LoginForm