import express from 'express';
//
import { getJoin, postJoin, getLogin, postLogin } from '../controllers/userController.js';
import { home } from '../controllers/boardController.js';

const rootRouter = express.Router();

rootRouter.route('/').get(home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);

export default rootRouter;
