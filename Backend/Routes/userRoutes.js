const express = require('express');
const userRouter = express.Router();

const {verifyApiKey,verifyJwt} = require('../Middleware/authMiddleware')
const {loginUser,registerUser,getUserProfile,updateUserProfile} = require('../Controller/userController')
const upload = require('../Config/multer')

userRouter.post('/auth/local/login',loginUser)
userRouter.post('/auth/local/register',registerUser)
userRouter.get('/getprofile',verifyApiKey,verifyJwt,getUserProfile)
userRouter.post('/updateprofile',verifyApiKey,verifyJwt,upload.single('photo'),updateUserProfile)



module.exports = userRouter
