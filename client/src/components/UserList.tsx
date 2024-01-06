// UserList.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

interface usersType {
  _id: string;
  name: string;
  email: string;
}

interface UserListProps {
  setSelectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserList = ({ setSelectedUserId }: UserListProps) => {
  const { user } = useUserContext();
  const [users, setUsers] = useState<usersType[]>([]);

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('/api/user/all-users', config);
      setUsers(data.users);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex w-full justify-center">
      {/* Left Section - User List */}
      <div className="w-full ">
        <h2 className="text-2xl font-bold text-center mt-1">Users</h2>
        <ul className="p-4">
          {users.map((user) => (
            <Link
              to={`/single-chat/${user._id}`}
              key={user._id}
              onClick={() => onUserSelect(user._id)}
              className="block mb-2 cursor-pointer p-4 rounded-md transition duration-300 hover:bg-blue-100 transform hover:scale-105"
            >
              <p className="text-blue-600 font-semibold">{user.name}</p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
