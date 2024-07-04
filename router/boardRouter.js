import express from 'express';
import { postUpload } from '../controllers/boardController.js';
import { authValidCheck } from '../src/middlewares.js';

const boardRouter = express.Router();

//boardRouter.route('/:id([0-9a-f]{24})');

boardRouter.route('/upload').all(authValidCheck).post(postUpload);

export default boardRouter;
