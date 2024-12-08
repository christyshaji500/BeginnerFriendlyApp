const UserModel = require('../Model/UserSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');


dotenv.config();

const loginUser = async (req, res) => {
  const { name,email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ username: name }, { email: email }]
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User Details Not Founded'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET,{ expiresIn: '1h' } );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      jwt: token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, phone, location } = req.body;
  const apiKey = req.headers['x-api-key'];

  try {
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid or missing API key'
      });
    }

    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request: Missing required fields'
      });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this username or email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || '', 
      location: location || ''
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      jwt: token,
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        location: newUser.location
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
  const userId = req?.user?.id

  if(!userId){
    return res.status(400).json({
      success: false,
      message: 'User not found'
    });
  }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userProfile = {
      id: user._id.toString(),
      username: user.username || '',
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      location: user.location || ''
    };

    res.status(200).json({
      success: true,
      data: userProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {

    const userId = req.user.id; 
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  const { username, email, firstName, lastName, contactNumber, location } = req.body;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!req.file) {
      return res.status(400).json({ status: 400, message: "Image is required" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    
    const response = await UserModel.findByIdAndUpdate(userId, { $set: 
      { username:username,
        email:email,
        firstName:firstName,
        lastName:lastName,
        contactNumber:contactNumber,
        location:location,
        image:imagePath
      } 
      },
      { new: true })

    const updatedUser = await UserModel.findById(userId);

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: {
        id: updatedUser._id.toString(),
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        location: updatedUser.location
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed'
    })
  }

}

module.exports= {
    loginUser,
    registerUser,
    getUserProfile,
    updateUserProfile
}


