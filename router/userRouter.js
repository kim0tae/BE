import express from 'express';
import { postUserInfo, postChangePassword, delUserInfo, postFindID } from '../controllers/userController.js';
import { authValidCheck } from '../src/middlewares.js';

const userRouter = express.Router();

userRouter.route('/remove').post(delUserInfo);
userRouter.route('/:id([0-9a-f]{24})').post(postUserInfo);
userRouter.route('/find-id').post(postFindID);
userRouter.route('/change-password').all(authValidCheck).post(postChangePassword);

export default userRouter;
