import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import router from './routes/rant.routes.js';
import chatRouter from './routes/chats.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// config 
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend
  credentials: true                // 🔥 allow cookies
}));

app.use('/api/rants', router);
app.use('/api/chats', chatRouter);
app.use('/api/users', userRoutes);

app.listen(5000, ()=>{
  console.log('Server is running')
  connectDb();
});
