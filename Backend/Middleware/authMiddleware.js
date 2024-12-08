const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()


const API_KEY = process.env.API_KEY

const JWT_SECRET = process.env.JWT_SECRET

const verifyApiKey = (req, res, next)=>{

    const apiKey = req.headers['x-api-key'];

    if(!apiKey || apiKey !== API_KEY){
        return res.status(403).json({
            success: false,
            message: 'Forbidden: Invalid API Key'
          });
    }

    next()

}


const verifyJwt = (req,res,next)=>{
    const token  = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
          });
    }

    jwt.verify(token,JWT_SECRET,(err,decoded)=>{

        if (err) {
            return res.status(401).json({
              success: false,
              message: 'Unauthorized: Invalid token'
            });
          }

          req.user = decoded;

          next()
    })
}

module.exports = {
    verifyApiKey,
    verifyJwt
}