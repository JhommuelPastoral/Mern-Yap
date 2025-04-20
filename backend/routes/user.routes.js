import express from 'express';
import { login, signUp, getProfile, logOut } from '../controllers/users.controller.js';
const userRoutes = express.Router();

userRoutes.post('/login', login);
userRoutes.post('/register', signUp)
userRoutes.post('/logout', logOut)
userRoutes.get('/profile', getProfile)

export default userRoutes;