import { createContext, useContext } from "react";

interface UserData {
  _id : string
  name: string;
  email: string;
}

interface User {
  user: UserData;
  token: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUserContextValue: UserContextType = {
  user: {
    user:{
      _id : "",
      name: "",
      email: "",
    },

    token : ""
  },
  setUser: () => {},
};


const UserContext = createContext<UserContextType>(defaultUserContextValue);

export const useUserContext = () => useContext(UserContext);

export default UserContext;

