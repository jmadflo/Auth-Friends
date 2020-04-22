import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const LoginForm = props => {
    const [ credentials, setCredentials ] = useState({
        username: '',
        password: ''
    })

    // will use to render loader conditionally
    const [ isLoading, setIsLoading ] = useState(false) 

    // update state with new form values
    const updateForm = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        // render spinner
        setIsLoading(true)
        axiosWithAuth().post('/api/login', credentials)
        .then(response => {
            console.log(response)
            // store token in local storage with label 'token'
            localStorage.setItem('token', response.data.payload)
            setIsLoading(false)
            setCredentials({
                username: '',
                password: ''
            })
            // redirect user to /friends after successful login
            props.history.push('/friends')
        })
        .catch(() => {
            setIsLoading(false)
            alert('This username and password combination is incorrect.')
        })
    }

    return (
        <>
            <h1>Login Page</h1>
            <form>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    name='username'
                    type='text'
                    onChange={updateForm}
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    onChange={updateForm}
                />
                <button onClick={handleSubmit}>Log In</button>
            </form>
            
            {/* Render loader under form when loading */}
            {isLoading && (
                <div>
                    <Loader type='TailSpin' color='blue' width='50'/>
                </div>
            )}
        </>
    )
}

export default LoginForm