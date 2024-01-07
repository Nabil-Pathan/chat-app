import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

interface UserData {
  _id : string
  name: string;
  email: string;
  pic : string
}

interface User {
  user: UserData;
  token: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    user: {
      _id : "",
      name: "",
      email: "",
      pic : ""
    },
    token: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfoString = localStorage.getItem("userInfo");
      
      if (userInfoString) {
        const userInfo: User = JSON.parse(userInfoString);
        setUser(userInfo);
      }

      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={{ user, setUser } as UserContextType}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
