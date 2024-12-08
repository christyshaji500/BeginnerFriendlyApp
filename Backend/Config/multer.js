const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadFolder = 'uploads/'; 
  
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true }); 
      }
  
      cb(null, uploadFolder); 
    },
    filename: (req, file, cb) => {

      const userId = req?.user?.id || 'unknownUser'; 
      const uniqueName = `${userId}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
