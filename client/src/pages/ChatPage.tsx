import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import UserList from '../components/UserList';


const ChatPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="flex w-[100%] flex-col md:min-h-screen ">
      <div className="flex   w-[100%] overflow-hidden bg-gray-200">
        <div className="flex items-center justify-center w-full border-r  p-4 bg-white">
          <UserList setSelectedUserId={setSelectedUserId}  />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
