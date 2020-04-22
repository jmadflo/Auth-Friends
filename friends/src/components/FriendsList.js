import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import Friend from './Friend'

const FriendsList = () => {
    const [ formValues, setFormValues ] = useState({
        name: '',
        age: '',
        email: '',
        favoriteColor: '',
        favoriteFood: ''
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
            email: friend.email,
            favoriteColor: friend.favoriteColor,
            favoriteFood: friend.favoriteFood
        })
        // set id of post to be edited
        setSelectedId(friend.id)
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

    // edits an existing post in the server
    const putData = event => {
        event.preventDefault()
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
                email: '',
                favoriteColor: '',
                favoriteFood: ''
            })
            // set selected id to empty string
            setSelectedId('')
    }

    // deletes friend
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
        <h1>Check Out My Somewhat Cool Friends!</h1>
        <form>
            <label htmlFor='name'> Name: </label>
            <input name='name' id='name' value={formValues.name} onChange={updateForm}/>
            
            <label htmlFor='age'> Age: </label>
            <input name='age' id='age' value={formValues.age} onChange={updateForm}/>
            
            <label htmlFor='email'> Email: </label>
            <input name='email' id='email' value={formValues.email} onChange={updateForm}/>
            
            <label htmlFor='favoriteColor'> Favorite Color: </label>
            <input name='favoriteColor' id='favoriteColor' value={formValues.favoriteColor} onChange={updateForm}/>
            
            <label htmlFor='favoriteFood'> Favorite Food: </label>
            <input name='favoriteFood' id='favoriteFood' value={formValues.favoriteFood} onChange={updateForm}/>
            {isEditing ? <button onClick={putData}>Amend Friend</button> : 
            <div className='formButtons'>
                <button onClick={getData}>Get Friends</button>
                <button onClick={postData}>Add Friend</button>
            </div>
        }     
        </form>
        <div className="friends">
            {data.map(friend => <Friend key={friend.id} friend={friend} setFriendToEdit={setFriendToEdit} deleteFriend={deleteFriend}/>)}
        </div>
        </>
    )
}

export default FriendsList