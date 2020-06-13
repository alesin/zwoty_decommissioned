import React from 'react'
import {Redirect} from 'react-router-dom'

const UserPage = (props) => {
    const user = props.user

    if (!user.id) return <Redirect to='/login' />

    return (
        <div className='h100 w100 flex column align-items-center justify-center'>
        <div className='flex'>
            <img src={user.imageUrl} className='rounded mr1' />
            <h1>Welcome back {user.name}, {user.email}!</h1>
        </div>
        <div>
            <button className='btn bg-red white p1 rounded' onClick={props.onClick}>Logout</button>
        </div>
        </div>
    )
}

export default UserPage