import express from 'express';
import { getJoin, postJoin } from '../controllers/userController.js';
const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  return res.send({ page: 'home' });
});

rootRouter.route('/join').get(getJoin).post(postJoin);

export default rootRouter;
