import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const LoginForm = props => {
    const [ credentials, setCredentials ] = useState({
        username: '',
        password: ''
    })

    const [ isLoading, setIsLoading ] = useState(false) 

    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        setIsLoading(true)
        axiosWithAuth().post('/api/login', credentials)
        .then(response => {
            console.log(response)
            window.localStorage.setItem('token', response.data.payload)
            setIsLoading(false)
            setCredentials({
                username: '',
                password: ''
            })
            props.history.push('/friends')
        })
        .catch(() => {
            setIsLoading(false)
            alert('This username and password combination is incorrect.')
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
                    id='password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Log In</button>
            </form>
            {isLoading && (
                <div>
                    <Loader type='TailSpin' width='50'/>
                </div>
            )}
        </div>
    )
}

export default LoginForm