import express from 'express';
import { login, signUp } from '../controllers/users.controller.js';
const userRoutes = express.Router();

userRoutes.get('/login', login);
userRoutes.post('/signUp', signUp)

export default userRoutes;