import React, { useState } from "react";
import axiosInstance from "../../config/Axios";

const PostAd = () => {
  const [formData, setFormData] = useState({
    adTitle: "",
    price: "",
    description: "",
    photo: null,
  });

  const [successMessage, setSuccessMessage] = useState(""); // For displaying success messages

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Ad Data:", formData);

      const adData = new FormData();
      adData.append("adTitle", formData.adTitle);
      adData.append("price", formData.price);
      adData.append("description", formData.description);
      adData.append("photo", formData.photo);

      const response = await axiosInstance.post(
        "/api/ads/createAdvertisements",
        adData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response);
      setSuccessMessage("Item created successfully!"); // Show success message
      setFormData({
        adTitle: "",
        price: "",
        description: "",
        photo: null,
      }); // Reset form fields
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Post Your Ad</h1>
      
      {successMessage && ( // Display success message
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="adTitle" className="block text-sm font-medium text-gray-700">
            Ad Title
          </label>
          <input
            type="text"
            id="adTitle"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleChange}
            placeholder="Enter ad title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price in USD"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a brief description"
            rows="3"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
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
          <button
            type="submit"
            className="w-full bg-[#F50963] text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostAd;
