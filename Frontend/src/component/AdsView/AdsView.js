import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/Axios";

const AdsView = () => {

    const {adId} = useParams()

    console.log("adId",adId);
    
  const [fetchAd, setFetchAd] = useState([]);


    useEffect(() => {
        const getSavedAds = async () => {
          try {
            const response = await axiosInstance.get(`/api/ads/getSpecificAdvertisments/${adId}`);
            setFetchAd(response.data.data);
            console.log(response.data.data);
            
          } catch (error) {
            console.error(error);
          }
        };
        getSavedAds();
      }, []);
    
  return (
    <div className="p-6 bg-gray-100">
      
      <div className="flex gap-6">
     
        <div className="w-3/4">
          <img
            src={`http://localhost:4000${fetchAd.image}`}
            alt="Ad Image"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>

    
        <div className="w-2/5 bg-white p-4 rounded-md shadow-md ml-2">
          <p className="text-2xl font-bold text-green-500 mb-2">$ {fetchAd.price}</p>
          <div className="">
              <img
                src={`http://localhost:4000${fetchAd.createdBy.image}`}
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="w-3/4 pt-3 mt-2">
              <p className="font-semibold">{`${fetchAd?.createdBy?.firstName? fetchAd?.createdBy?.firstName:"Nill"} ${fetchAd?.createdBy?.lastName?fetchAd?.createdBy?.lastName :"Nill"}`}</p>
              <p className="font-semibold text-sm text-gray-500"> ContactNumber : {fetchAd?.createdBy?.phone? fetchAd?.createdBy?.phone: "Nill"}</p>
              <p className="font-semibold text-sm text-gray-500"> Location : {fetchAd?.createdBy?.location? fetchAd?.createdBy?.location :"Nill"}</p>

            </div>
            </div>
           
        </div>
      </div>

    
      <div className="mt-6">
        <div className="bg-white p-6 rounded-md shadow-md mb-6">
          
          <div className="flex gap-4 mb-4">
          <div className="w-3/4 pt-3">
              <p className="font-semibold">PRICE: {fetchAd.price? fetchAd.price: "Nill" }</p>
              <p className="text-sm text-gray-500">TITLE :{fetchAd.title?fetchAd.title : "Nill"}</p>
            </div>
          
          </div>
        </div>

     
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <p className="text-sm text-gray-600">
            {fetchAd.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdsView;
