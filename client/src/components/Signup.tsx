import React from "react";
import { FormEvent, useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";


interface formDataType {
  name  : string
  email : string
  pic : string
  password : string 
}

const Signup = () => {

  const navigate = useNavigate()

  const [ formData , setFormData] = useState<formDataType>({
    name   : "",
    email : "" ,
    pic: "",
    password : "" 
  })


  const handleSubmit = async (e : FormEvent)=>{
    e.preventDefault()
     try {
         const { data } = await axios.post('/api/auth/signup', formData)
         console.log(data);
         localStorage.setItem("userInfo",JSON.stringify(data))
         toast.success("Signup Success")
         navigate('/chats')
     } catch (error : any) {
        console.log(error.message);
     }
  }
  
  const postDetails = (e : any) =>{
    
    const pics = e.target.files[0]

    if(pics === undefined){
      toast.error('Please Select an Image')
    }

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
       const data = new FormData()
       data.append("file",pics)
       data.append("upload_preset","new-chat-app")
       data.append("cloud_name","dpvicaxva")

       fetch("https://api.cloudinary.com/v1_1/dpvicaxva/image/upload",{
        method: "POST",
        body: data
      }).then((res)=> res.json())
      .then(data =>{
         setFormData({...formData , pic : data.url.toString()})
         console.log(data.url.toString());
      })

      .catch((err)=>{
        console.log(err);
      })
    }
      
  }

    return (
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded-lg ">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="name"
              placeholder="Your Name"
              onChange={(e)=> setFormData({...formData , name : e.target.value})}
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Profile Pic
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={postDetails}

            />
          </div>
          <button  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md font-bold hover:bg-gray-700" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  };
  
  export default Signup;