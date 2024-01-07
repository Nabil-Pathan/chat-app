// UserList.tsx
import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Loader from './Loader';

interface usersType {
  _id: string;
  name: string;
  email: string;
  pic : string
}

interface UserListProps {
  setSelectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserList = ({ setSelectedUserId }: UserListProps) => {
  const { user } = useUserContext();
  const [users, setUsers] = useState<usersType[]>([]);
  const [loading , setLoading] = useState(false)
  const [searchuery , setSearchQuery] =  useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('/api/user/all-users', config);
      setUsers(data.users);
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error.message);
    }
  };

  const onUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSearchChange = async (e:any)=>{
    try {
       const query = e.target.value
       setSearchQuery(query)

       const config = {
         headers : {
          Authorization : `Bearer ${user.token}`
         }
       }
        const { data }  = await axios.get(`/api/user/search-user?searchQuery=${query}`, config)
        setUsers(data)
    } catch (error : any) {
       console.log(error.message);
    }
  }

  return (
    <>
    {
      loading ? (<Loader/>) : (
        <div className="md:w-1/2 w-full md:min-h-screen">
      <div className="flex items-center w-full mb-4">
        <div className="relative flex items-center w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute left-3 text-gray-500">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>
          <input onChange={handleSearchChange} type="text" placeholder="Search Users..." className="p-2 pl-10 border-gray-300 border outline-none w-full rounded-md" />
        </div>
      </div>
      <div className="w-full">
        <ul className="p-4">
          {users.map((user) => (
            <Link
              to={`/single-chat/${user._id}`}
              key={user._id}
              onClick={() => onUserSelect(user._id)}
              className="border-gray-200 border flex items-center gap-2 mb-2 cursor-pointer p-4 rounded-md transition duration-300 hover:bg-blue-100 transform hover:scale-105"
            >
              <img src={user.pic}className='w-8 h-8 rounded-full object-cover' />
              <p className=" font-semibold">{user.name}</p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
      )
    }
    
    </>
  );
};

export default UserList;
