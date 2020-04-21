import React from 'react'
import Friend from './Friend'

const FriendsList = props => {

    const getData = () => {
        
    }

    const postData = () => {
        
    }

    return(
        <form>
            <label htmlFor='name'> Name: 
                <input name='name' id='name' value={props.name} onChange={updateForm}/>
            </label>
            <label htmlFor='age'> Age: 
                <input name='age' id='age' value={props.age} onChange={updateForm}/>
            </label>
            <label htmlFor='email'> Email: 
                <input name='email' id='email' value={props.email} onChange={updateForm}/>
            </label>
            <button className='submitButtonGet' onClick={getData}>Submit Get</button>
            <button className='submitButtonPost' onClick={postData}>Submit Post</button>
        </form>
        <div className="friends">
            {props.data.map(friend => <Friend key={friend.id} friend={friend}/>)}
        </div>
    )
}

export default FriendsList