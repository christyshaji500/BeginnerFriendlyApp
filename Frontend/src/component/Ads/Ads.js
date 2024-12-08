import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/Axios";

const Ads = () => {
  const [fetchAd, setFetchAd] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMode, setModalMode] = useState("view"); 
  const [newImage, setNewImage] = useState(null); 

  const [isImageChanged,setIsImageChaned] = useState(false)

  useEffect(() => {
    const getSavedAds = async () => {
      try {
        const response = await axiosInstance.get("/api/ads/getAllAdvertisments");
        setFetchAd(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSavedAds();
  }, []);

  const handleOpenModal = (ad, mode) => {
    setSelectedAd(ad);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAd(null);
    setNewImage(null); 
    setIsImageChaned(false)
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

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setIsImageChaned(true)
      setNewImage(file); 
      const previewUrl = URL.createObjectURL(file); 
      setSelectedAd({ ...selectedAd, image: previewUrl }); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">My Ads</h1>
      {fetchAd.length > 0 ? (
        <div className="space-y-6">
          {fetchAd.map((ad) => (
            <div
              key={ad.id}
              className="flex items-center justify-between p-4 bg-white rounded-md shadow-md"
            >
              
              <div className="w-1/4">
                <img
                  src={`http://localhost:4000${ad.image}`}
                  alt={ad.title}
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>

              
              <div className="w-1/2 px-4">
                <h2 className="text-lg font-bold text-gray-800">{ad.title}</h2>
                <p className="text-sm text-gray-600 mt-1">Price: ${ad.price}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {ad.description}
                </p>
              </div>

              
              <div className="w-1/4 flex  items-center space-x-2">
                <button
                  className="w-full px-4 py-2 bg-white text-black rounded-xl border-2  hover:border-[#F50963] "
                  onClick={() => handleOpenModal(ad, "view")}
                >
                  View Ad
                </button>
                <button
                  className="w-full px-4 py-2 bg-[#F50963] text-white rounded-xl border-2 hover:border-black "
                  onClick={() => handleOpenModal(ad, "edit")}
                >
                  Edit Ad
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">You have no ads to display.</p>
      )}

      
      {isModalOpen && selectedAd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/2 p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "view" ? "View Ad" : "Edit Ad"}
            </h2>
            <div className="space-y-4">
             
              <div className="flex flex-col items-center">
                <img
                  src={isImageChanged ? selectedAd.image :`http://localhost:4000${selectedAd.image}`} 
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

             
              <div className="flex space-x-2">
                <label className="block text-sm font-semibold mt-1">Title:</label>
                {modalMode === "view" ? (
                  <p>{selectedAd.title}</p>
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

             
              <div className="flex space-x-2">
                <label className="block text-sm font-semibold mt-1">Price:</label>
                {modalMode === "view" ? (
                  <p>${selectedAd.price}</p>
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

              
              <div>
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
                  ></textarea>
                )}
              </div>
            </div>

            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Close
              </button>
              {modalMode === "edit" && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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

export default Ads;
