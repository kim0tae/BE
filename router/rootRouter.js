import express from 'express';
import cors from 'cors';
//
import { getJoin, postJoin, getLogin, postLogin } from '../controllers/userController.js';
import { protectorMiddleware } from '../src/middlewares.js';

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  return res.send({ page: 'home' });
});

rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);

export default rootRouter;
