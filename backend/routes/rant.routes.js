import express from 'express'
import { createRant, getRant, deleteRant,  updateRant } from '../controllers/rant.controllers.js';
const router = express.Router();


router.post('/',createRant);
router.get('/',getRant);
router.delete('/:id',deleteRant);
router.put('/:id',updateRant);


export default router;