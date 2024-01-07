import React from "react";
import { FormEvent, useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useUserContext } from "../context/UserContext";

interface formDataType {
  name  : string
  email : string
  password : string 
}


const Signin = () => {

  const { user , setUser} = useUserContext()

  const navigate = useNavigate()

  const [ formData , setFormData] = useState<formDataType>({
    name   : "",
    email : "" ,
    password : "" 
  })


  const handleOnSubmit = async (e : FormEvent)=>{
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/signin', formData)
      console.log(data);
      setUser({
        user: data.user,
        token : data.token
      })
      localStorage.setItem("userInfo",JSON.stringify(data))
      toast.success("Login Success")
      navigate('/chats')
    } catch (error : any) {
       console.log(error.message);
    }
  }
  return (
    <div className="mt-4 p-4">
      <form onSubmit={handleOnSubmit} className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-xl ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            placeholder="Your Email"
            onChange={(e)=> setFormData({...formData , email : e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            placeholder="Your Password"
            onChange={(e)=> setFormData({...formData , password : e.target.value})}
          />
        </div>
        <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-md font-bold hover:bg-gray-700" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;