import React from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/images/Component 1.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()

  const auth = localStorage.getItem("token")
  

  const handleNavigate = ()=>{
    navigate('/postads')
  }

  const handleLogin =()=>{
    navigate('/login')
  }
  const handleLogout =()=>{
    localStorage.removeItem("token")
    navigate('/home')
  }

  return (
    <nav className="w-full bg-grey-500 text-white p-4 flex justify-between items-center shadow-md">
      

      <div className="mb-6 flex justify-center ml-4 mt-2">
        <img src={logo} alt="Listbnb Logo" className="h-8 " /> 
      </div>
   
      <div className="flex items-center gap-4">
        <FaUserCircle className="text-2xl bg-black rounded-xl" />
        {auth ?(
          <button
          onClick={handleLogout}
           className="px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100">
          Sign Out</button>
        ) :(
          <button
          onClick={handleLogin}
           className="px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100">
          Sign In</button>
        )}
        
        <button className="px-4 py-2 bg-[#F50963] text-white rounded-xl hover:bg-black"
        onClick={handleNavigate}
        >
          Post Your Ad
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
