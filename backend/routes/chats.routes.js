import express from 'express';
import { createChat, getChats } from '../controllers/chats.controller.js';
const chatRouter = express.Router();

// router.get('/');
chatRouter.post('/', createChat);
chatRouter.get('/', getChats);

export default chatRouter;