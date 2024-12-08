import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/Axios";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    photo: null,
    location: "",
    contactNumber: "",
  });

  
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await axiosInstance.get("/api/users/getprofile");
        console.log(response.data);
        setUserData(response.data.data);

        const userProfile = response?.data?.data;

        setFormData({
          firstName: userProfile.firstName || "",
          lastName: userProfile.lastName || "",
          email: userProfile.email || "",
          username: userProfile.username || "",
          photo: null, 
          location: userProfile.location || "",
          contactNumber: userProfile.contactNumber || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Saved Profile Data:", formData);

      const userData = new FormData();
      userData.append("firstName", formData.firstName);
      userData.append("lastName", formData.lastName);
      userData.append("userName", formData.userName);
      userData.append("email", formData.email);
      userData.append("location", formData.location);
      userData.append("contactNumber", formData.contactNumber);
      userData.append("photo", formData.photo);

      const response = await axiosInstance.post(
        "/api/users/updateprofile",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

     
      setSuccessMessage("Profile updated successfully!");
      
      setTimeout(() => {
        navigate("/myaccount"); 
      }, 2000);
      
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
      
     
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

       
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

       
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

      
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-[#F50963] hover:file:bg-blue-100"
          />
        </div>

    
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

      
        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter your contact number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        
        <div>
          <button
            type="submit"
            className="w-full bg-[#F50963] text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
