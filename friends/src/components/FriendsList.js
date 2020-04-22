import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Friend from './Friend'

const FriendsList = () => {
    const [ formValues, setFormValues ] = useState({
        name: '',
        age: '',
        email: '',
    })

    // id of friend to be edited
    const [ selectedId, setSelectedId ] = useState('')

    // data from server
    const [ data, setData ] = useState([])

    // is set to true when editing
    const [ isEditing, setIsEditing ] = useState(false)

    // update state with new form values when form is updated
    const updateForm = event => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const setFriendToEdit = friend => {
        // switch to editing mode
        setIsEditing(true)
        // populate form with existing friend data
        setFormValues({
            name: friend.name,
            age: friend.age,
            email: friend.email
        })
        // set id of post to be edited
        setSelectedId(friend.id)
    }

    // submit get request to the server
    const getData = () => {
        axiosWithAuth()
            .get('/api/friends')
            .then(response => {
                // console.log(response)
                setData(response.data)
            })
            .catch(error => alert(error))
    }

    // submit post request to the server
    const postData = () => {
        axiosWithAuth()
            .post('/api/friends', formValues)
            .then(response => {
                // console.log(response)
                setData(response.data)
            })
            .catch(error => alert(error))
    }

    // edits an existing post in the server
    const putData = () => {
        axiosWithAuth()
            .put(`/api/friends/${selectedId}`, formValues)
            .then(response => {
                // console.log(response)
                setData(response.data)
            })
            .catch(error => alert(error))
            // exit editing mode
            setIsEditing(false)
            // set form inputs to empty string
            setFormValues({
                name: '',
                age: '',
                email: ''
            })
            // set selected id to empty string
            setSelectedId('')
    }

    const deleteFriend = friendToEdit => {
        axiosWithAuth()
            .delete(`/api/friends/${friendToEdit}`)
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
        </form>
        {isEditing ? <button onClick={putData}>Submit Put</button> : 
            <div>
                <button onClick={getData}>Submit Get</button>
                <button onClick={postData}>Submit Post</button>
            </div>
        }
        <div className="friends">
            {data.map(friend => <Friend key={friend.id} friend={friend} setFriendToEdit={setFriendToEdit} deleteFriend={deleteFriend}/>)}
        </div>
        </>
    )
}

export default FriendsList