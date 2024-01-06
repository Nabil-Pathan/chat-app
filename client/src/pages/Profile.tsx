import React from 'react'
import { useUserContext } from '../context/UserContext'
import Header from '../components/Header'


const Profile = () => {
    const { user } = useUserContext() 

  return (
    <div className='md:min-h-screen'>

        <h1 className='text-4xl font-bold'>{user.user.name}</h1>

    </div>
  )
}

export default Profile