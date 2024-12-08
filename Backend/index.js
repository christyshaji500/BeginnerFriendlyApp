const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./Config/config'); 
const adRouter = require('./Routes/advertismentRoute'); 
const userRouter = require('./Routes/userRoutes'); 
const path = require('path');

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000"]; ; 

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);
app.use(express.json());

// Connect to DB
connectDB();

app.use('/api/ads', adRouter);
app.use('/api/users', userRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
