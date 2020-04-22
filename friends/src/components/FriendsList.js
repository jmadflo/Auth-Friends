import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Friend from './Friend'

const FriendsList = props => {

    const [ formValues, setFormValues ] = useState({
        name: '',
        age: '',
        email: '',
    })

    const [ data, setData ] = useState([])

    const [ isEditing, setIsEditing ] = useState(false)

    // update state with new form values when form is updated
    const updateForm = event => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    // submit get request to the server
    const getData = event => {
        event.preventDefault()
        axiosWithAuth()
            .get('/api/friends')
            .then(response => {
                // console.log(response)
                setData(response.data)
            })
            .catch(error => alert(error))
    }

    // submit post request to the server
    const postData = event => {
        event.preventDefault()
        axiosWithAuth()
            .post('/api/friends', formValues)
            .then(response => {
                // console.log(response)
                setData(response.data)
            })
            .catch(error => alert(error))
    }

    return(
        <>
        <form>
            <label htmlFor='name'> Name: 
                <input name='name' id='name' value={formValues.name} onChange={updateForm}/>
            </label>
            <label htmlFor='age'> Age: 
                <input name='age' id='age' value={formValues.age} onChange={updateForm}/>
            </label>
            <label htmlFor='email'> Email: 
                <input name='email' id='email' value={formValues.email} onChange={updateForm}/>
            </label>
            {isEditing ? <button>Submit Put</button> : 
                <div>
                    <button onClick={getData}>Submit Get</button>
                    <button onClick={postData}>Submit Post</button>
                </div>
            }
            
        </form>
        <div className="friends">
            {data.map(friend => <Friend key={friend.id} friend={friend}/>)}
        </div>
        </>
    )
}

export default FriendsList