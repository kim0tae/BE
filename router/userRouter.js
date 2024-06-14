import express from 'express';
import { getUserInfo, postUserInfo, getChangePassword, postChangePassword } from '../controllers/userController.js';
import { protectorMiddleware } from '../src/middlewares.js';

const userRouter = express.Router();

userRouter.route('/:id').get(getUserInfo).post(postUserInfo);
userRouter.route('/change-password').all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

export default userRouter;
