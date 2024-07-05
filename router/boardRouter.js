import express from 'express';
import { postUpload, watch } from '../controllers/boardController.js';
import { authValidCheck } from '../src/middlewares.js';

const boardRouter = express.Router();

boardRouter.get('/:id([0-9a-f]{24})', watch);
//boardRouter.route('/:id([0-9a-f]{24})/edit').post(postUpload);
//boardRouter.route('/:id([0-9a-f]{24})/delete').post(postUpload);
boardRouter.route('/upload').all(authValidCheck).post(postUpload);

export default boardRouter;
