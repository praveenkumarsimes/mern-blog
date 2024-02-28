import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

mongoose.set('strictQuery',false);
const dBConnection =async()=>{
 const conn = await mongoose.connect(process.env.MONGO_URI)
console.log("DB connect to :"+ conn.connection.host)
}


dBConnection().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000!');
  });
})
.catch((err) => {
  console.log(err);
});


const corsOptions = {
  origin: 'https://www.thaimeera.com', // Replace with your frontend domain
  credentials: true, // Allows cookies to be sent from the frontend
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// Increase the payload limit
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));



app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
