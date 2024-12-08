import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/Axios";
import { FaTrash } from "react-icons/fa"; 
const MyAccount = () => {
  const [user, setUser] = useState({});
  const [advertisments, setAdvertisments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 5;

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [modalMode, setModalMode] = useState("view"); 
  const [newImage, setNewImage] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/users/getprofile");
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const fetchAdvertismentsDetails = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/ads/getSpecificAdvertismentsForAUser"
      );
      setAdvertisments(response.data.data);
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };


  const totalPages = Math.ceil(advertisments.length / adsPerPage);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = advertisments.slice(indexOfFirstAd, indexOfLastAd);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

 
  const handleOpenModal = (ad, mode) => {
    setSelectedAd(ad);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAd(null);
    setNewImage(null);
    setIsImageChanged(false);
  };

  
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("id", selectedAd.id);
      formData.append("title", selectedAd.title);
      formData.append("price", selectedAd.price);
      formData.append("description", selectedAd.description);

      if (newImage) {
        formData.append("image", newImage);
      }

      await axiosInstance.put("/api/ads/updateAd", formData);
      console.log("Ad updated successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageChanged(true);
      setNewImage(file);
      const previewUrl = URL.createObjectURL(file);
      setSelectedAd({ ...selectedAd, image: previewUrl });
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchAdvertismentsDetails();
  }, []);

  const handleDeleteItem = async (itemId) => {
    const confirmDelete = window.confirm("Do you really want to delete this ad?");
    if (!confirmDelete) {
      return; 
    }
  
    try {
      console.log("Item to delete:", itemId);
      const response = await axiosInstance.put("/api/ads/deleteAdvertisment", {
        item: itemId,
      });
  
      if (response.data.success) {
        console.log("Ad deleted successfully:", response.data.data);
  
        setAdvertisments((prevAds) =>
          prevAds.filter((ad) => ad._id !== itemId)
        );
      } else {
        console.error("Failed to delete ad:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };
  


  return (
    <div className="flex flex-col h-screen">
    
      <div className="flex-none w-full p-4 bg-gray-100 border-b border-gray-300">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <p>{user.email}</p>
        <p>{user.location}</p>
      </div>

     
      <div className="flex-grow w-full p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">My Ads</h2>
        {currentAds.length > 0 ? (
          currentAds.map((ad) => (
            <div
              key={ad.id}
              className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4 last:border-none"
            >
             
              <div className="w-1/5">
                <img
                  src={`http://localhost:4000${ad.image}`}
                  alt={ad.title}
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>

              
              <div className="w-3/5 px-4">
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-sm text-gray-600">{ad.description}</p>
                <p className="text-sm text-gray-600 mt-2 font-bold">
                  Price: ${ad.price}
                </p>
              </div>

          
              <div className="w-1/5 flex  items-center space-x-2">
                <button
                  onClick={() => handleOpenModal(ad, "view")}
                  className="w-full px-4 py-2 bg-white text-black rounded-xl border-2  hover:border-[#F50963]"
                >
                  View
                </button>
                <button
                  onClick={() => handleOpenModal(ad, "edit")}
                  className="w-full px-4 py-2 bg-[#F50963] text-white rounded-xl border-2 hover:border-black "
                >
                  Edit
                </button>
                <button
                 onClick={() => handleDeleteItem(ad._id)}
                  className="w-full px-4 py-2 bg-black text-white rounded-xl border-2 hover:border-black flex items-center justify-center"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No ads to display.</p>
        )}

        
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

     
      {isModalOpen && selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/2 p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "view" ? "View Ad" : "Edit Ad"}
            </h2>
            <div className="space-y-4">
            
              <div className="flex flex-col items-center">
                <img
                  src={
                    isImageChanged
                      ? selectedAd.image
                      : `http://localhost:4000${selectedAd.image}`
                  }
                  alt={selectedAd.title}
                  className="w-40 h-40 object-cover rounded-md"
                />
                {modalMode === "edit" && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-4"
                  />
                )}
              </div>

             
              <div className="flex space-x-3">
                <label className="block text-sm font-semibold  mt-2">Title:</label>
                {modalMode === "view" ? (
                  <p className="mt-1">{selectedAd.title}</p>
                ) : (
                  <input
                    type="text"
                    value={selectedAd.title}
                    onChange={(e) =>
                      setSelectedAd({ ...selectedAd, title: e.target.value })
                    }
                    className="w-full border rounded-md p-2"
                  />
                )}
              </div>

       
              <div className="flex space-x-3">
                <label className="block text-sm font-semibold mt-2">Price:</label>
                {modalMode === "view" ? (
                  <p className="mt-1">${selectedAd.price}</p>
                ) : (
                  <input
                    type="number"
                    value={selectedAd.price}
                    onChange={(e) =>
                      setSelectedAd({ ...selectedAd, price: e.target.value })
                    }
                    className="w-full border rounded-md p-2"
                  />
                )}
              </div>

          
              <div >
                <label className="block text-sm font-semibold mb-2">
                  Description:
                </label>
                {modalMode === "view" ? (
                  <p>{selectedAd.description}</p>
                ) : (
                  <textarea
                    value={selectedAd.description}
                    onChange={(e) =>
                      setSelectedAd({ ...selectedAd, description: e.target.value })
                    }
                    className="w-full border rounded-md p-2"
                    rows="4"
                  />
                )}
              </div>
            </div>

           
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
              {modalMode === "edit" && (
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
