import React from 'react'

const Friend = props => {
    return (
        <div className='Friend'>
            <p>Name:{` ${props.friend.name}`}</p>
            <p>Age:{` ${props.friend.age}`}</p>
            <p>Email:{` ${props.friend.email}`}</p>
            <button onClick={() => props.setFriendToEdit(props.friend)}>Edit</button>
            <button onClick={() => props.deleteFriend(props.friend.id)}>Delete</button>
        </div>
    )
}

export default Friend