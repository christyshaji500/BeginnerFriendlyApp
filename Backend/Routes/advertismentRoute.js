const express = require('express');
const adRouter = express.Router();

const {verifyApiKey,verifyJwt} = require('../Middleware/authMiddleware')
const {createAd,getAllAdvertisements,getSpecificAdvertisements,deleteAdvertisement,deleteSpecificAdvertisment,getSpecificAdvertisementsForAuser,updateAdvertisment} = require('../Controller/AdController')
const upload = require('../Config/multer')

adRouter.post('/createAdvertisements', verifyApiKey, verifyJwt, upload.single('photo'), createAd);
adRouter.get('/getAllAdvertisments',getAllAdvertisements)
adRouter.get('/getSpecificAdvertisments/:id',getSpecificAdvertisements)
adRouter.get('/getSpecificAdvertismentsForAUser',verifyApiKey,verifyJwt,getSpecificAdvertisementsForAuser)
adRouter.put('/deleteAdvertisment',verifyApiKey,verifyJwt,updateAdvertisment)
// adRouter.delete('/deleteSpecificAdvertisment',verifyApiKey,verifyJwt,deleteSpecificAdvertisment)


module.exports = adRouter