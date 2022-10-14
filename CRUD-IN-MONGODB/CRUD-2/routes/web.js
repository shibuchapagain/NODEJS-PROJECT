import express from 'express';
const router = express.Router();

import {homeController, formController, saveController} from '../controllers/homeController.js';

router.get('/', homeController);
router.get('/new', formController);
router.get('/save', saveController);

export default router;
