const Ad = require('../Model/AdSchema'); 
const User = require('../Model/UserSchema')
const path = require('path');


const createAd = async (req,res) => {
  try {
    const {adTitle,description,price} = req.body

    const createdBy = req?.user?.id
    
    if(!createdBy){
      return res.json({status:400,message:"Crated User is missing"})
  }

    if(!adTitle,!description,!price){
        return res.json({status:400,message:"required fields missing"})
    }

    if (!req.file) {
      return res.status(400).json({ status: 400, message: "Image is required" });
    }

    const file = req?.file

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    // const user = await User.findOne({ email: userEmail });
    const newAd = new Ad({
      title: adTitle,
      description: description,
      price: price,
      image:imagePath,
      createdBy: createdBy,
      isActive:true
    });
    await newAd.save();
    return res.json({status:200,message:"Ad Created"})
  } catch (error) {
    return res.json({status:500,message:"Internal Error Occured"})
  }
};

const getAllAdvertisements = async (req, res) => {
  try {
    // const {user} = req.body
    const ads = await Ad.find({isActive:true})
    if(!ads){
      return res.status(400).json({ status: 400, message: "No Ads Founded" });
    } 
    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch advertisements',
      error: error.message
    });
  }
};

const getSpecificAdvertisements = async (req, res) => {
  try {

    const adId = req.params.id
    const ads = await Ad.findOne({_id:adId}).populate('createdBy');  
    if(!ads){
      return res.status(400).json({ status: 400, message: "No Ads Founded" });
    }
    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch advertisements',
      error: error.message
    });
  }
};

const deleteSpecificAdvertisment = async (req, res) => {
  try {

    const {adId,user} = req.body
    const ads = await Ad.DeleteOne(adId).populate('createdBy', user);;
    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch advertisements',
      error: error.message
    });
  }
};

const deleteAdvertisement = async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedAd = await Ad.findByIdAndDelete(id);

    if (!deletedAd) {
      return res.status(404).json({
        success: false,
        message: 'Advertisement not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Advertisement deleted successfully',
      data: {
        id: deletedAd._id.toString(),
        title: deletedAd.title,
        price: deletedAd.price,
        description: deletedAd.description,
        image: deletedAd.image || ''
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete advertisement',
      error: error.message
    });
  }
};

const getSpecificAdvertisementsForAuser = async (req, res) => {
  try {

    const user= req.user.id
    const ads = await Ad.find({isActive:true}).populate('createdBy', user);
    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch advertisements',
      error: error.message
    });
  }
};

const deletAdvertisment = async (req, res) => {
  try {

    const {adId}= req.body
    const updatedAd = await Ad.findByIdAndUpdate(
      adId,
      { $set: { isActive: false } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message:"Item Deleted",
      data:updatedAd
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch advertisements',
      error: error.message
    });
  }
};

const updateAdvertisment = async (req, res) => {
  try {

    const {item}= req.body
    console.log("fff",item);
    
    const updatedAd = await Ad.findByIdAndUpdate(
      item,
      { $set: { isActive: false } },
      { new: true }
    );

    console.log(updatedAd);
    
    res.status(200).json({
      success: true,
      message:"Item Deleted",
      data:updatedAd
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch advertisements',
      error: error.message
    });
  }
};


module.exports = {
    createAd,
    getAllAdvertisements,
    getSpecificAdvertisements,
    deleteSpecificAdvertisment,
    deleteAdvertisement,
    getSpecificAdvertisementsForAuser,
    updateAdvertisment
}
