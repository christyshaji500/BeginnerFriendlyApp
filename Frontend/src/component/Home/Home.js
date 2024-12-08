import React, { useEffect, useState }  from 'react';
import axiosInstance from '../../config/Axios';
import BannerTitle from '../../assets/images/Heading 1.png'
import ExportHero from '../../assets/images/hero-1.jpg.png'
import ExportHero2 from '../../assets/images/Component 4.png'
import ExportHero3 from '../../assets/images/Container.png'
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const [fetchAd, setFetchAd] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getSavedAds = async () => {
      try {
        const response = await axiosInstance.get("/api/ads/getAllAdvertisments");
        console.log(">>>>>>>>>>>>>>>>>>>>>>>",response.data.data);
        
        setFetchAd(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSavedAds();
  }, []);

  const handleNavigate = (id)=>{
    console.log("id",id);
    
    navigate(`/adsview/${id}`)
  }

  return (
    <div className="">
     
      <div className="h-1/3 ">
      <div className='flex'>
        <div>
        <img
          src={BannerTitle}
          alt="Banner"
          // className="w-full h-full object-cover"
        />
        </div>

        <div className='flex'>
        <div>
        <img
          src={ExportHero2}
          alt="Banner"
          // className="w-full h-full object-cover"
        />
          </div>
          <div className='flex flex-col'>
          <div>
          <img
          src={ExportHero}
          alt="Banner"
          // className="w-full h-full object-cover"
        />
          </div>
          <div>
          <img
          src={ExportHero3}
          alt="Banner"
          // className="w-full h-full object-cover"
        />
          </div>
          </div>
          
        </div>

      </div> 
      </div>

   
      <div className="h-2/3 p-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Fresh Recommendations</h2>
        <div className="grid grid-cols-3 gap-4">
          
          {fetchAd.map((item,index)=>(
          <div key={index}
          onClick={()=>handleNavigate(item._id)}
           className="bg-white p-4 rounded-md shadow-md">
            <img
             src={`http://localhost:4000${item.image}`}
              alt="Recommendation 1"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <p className="font-bold text-xl">$ {item.price}</p>
          </div>
          ))}

         
        </div>
      </div>
    </div>
  );
};

export default Home;
