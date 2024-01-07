import React, { useState } from 'react'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import { Link } from 'react-router-dom'

type TabType = 'login' | 'signup'

const HomePage = () => {

    const [activeTab, setActiveTab] = useState<TabType>('login');

  const handleTabClick = (tab : TabType) => {
    setActiveTab(tab);
  };

    
  return (
    <div className="mx-auto  max-w-xl">
    <div className="flex justify-center p-3 bg-white w-full mt-4 rounded-lg border-2 text-center">
      <h1 className="text-4xl font-semibold text-black">Conversa</h1>
    </div>

    <div className="bg-white w-full p-4 rounded-lg border-2 shadow-lg">
      <div className="flex">
        <Link onClick={() => handleTabClick('login')} to="#" className={`font-bold w-1/2 p-2 text-center ${activeTab === "login" ? "bg-gray-800 text-white" : "bg-white "} rounded-l-lg border-r border-t border-b`}>
          Login
        </Link>
        <Link  onClick={() => handleTabClick('signup')} to="#" className={`font-bold w-1/2 p-2 text-center  rounded-r-lg border-l border-t border-b  ${activeTab === "signup" ? "bg-gray-800 text-white" : "bg-white "} `}>
          Signup
        </Link>
      </div>

      <div className="mt-1 ">
        
      {activeTab === 'login' && <Signin />}
          {activeTab === 'signup' && <Signup />}
      </div>
    </div>
  </div>
  )
}

export default HomePage