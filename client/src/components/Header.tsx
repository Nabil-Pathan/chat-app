import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Header = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('userInfo');
    setUser({
      user: {
        _id: '',
        name: '',
        email: '',
      },
      token: '',
    });
    toast.success('Logout Success');
    navigate('/');
  };

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
              <Link to='/profile' className="mr-2">Profile</Link>
              <button onClick={handleLogout} className="bg-white md:block hidden text-blue-500 px-2 py-1 rounded">Logout</button>
        </div> 
          )
        }
        
      </header>
    </div>
    </>
  );
};

export default Header;
