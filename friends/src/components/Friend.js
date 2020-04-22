import React from 'react'

const Friend = props => {
    return (
        <div className='Friend'>
            {/* make sure a space separtes the key and the value */}
            <p>Name:{` ${props.friend.name}`}</p>
            <p>Age:{` ${props.friend.age}`}</p>
            <p>Email:{` ${props.friend.email}`}</p>
            <p>Favorite Color:{` ${props.friend.favoriteColor}`}</p>
            <p>Favorite Food:{` ${props.friend.favoriteFood}`}</p>
            <button onClick={() => props.setFriendToEdit(props.friend)}>Edit</button>
            <button className='deleteButton' onClick={() => props.deleteFriend(props.friend.id)}>Delete</button>
        </div>
    )
}

export default Friend