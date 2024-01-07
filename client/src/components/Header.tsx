import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Header = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();


  return (
    <>
    <div>
      <header className="bg-gray-800 text-white py-4 px-4 flex items-center justify-between">
        <Link to='/chats'>
          <h1 className="text-3xl ml-3 font-bold">Your Logo</h1>
        </Link>
        {
          user.token !== "" && (
            <div className='flex gap-2 items-center justify-center'>
              <Link to='/profile' className="mr-2">
                <img className='rounded-full h-9 w-9 object-cover' src={user.user.pic} alt="Profile" />
              </Link>
        </div> 
          )
        }
        
      </header>
    </div>
    </>
  );
};

export default Header;
