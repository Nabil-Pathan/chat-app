import React from 'react'
import { useUserContext } from '../context/UserContext'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const Profile = () => {
  const navigate = useNavigate()
    const { user , setUser} = useUserContext() 

    const handleLogout = async () => {
      localStorage.removeItem('userInfo');
      setUser({
        user: {
          _id: '',
          name: '',
          email: '',
          pic : ''
        },
        token: '',
      });
      toast.success('Logout Success');
      navigate('/');
    };
  

  return (
    <div className='md:min-h-screen'>

        <h1 className='text-4xl font-bold'>{user.user.name}</h1>


<button className='bg-green-600 text-white px-4 py-3 rounded-md font-bold ' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile