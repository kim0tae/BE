import express from 'express';
import { getUserInfo, postUserInfo, getChangePassword, postChangePassword } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.route('/:id').get(getUserInfo).post(postUserInfo);

userRouter.route('/change-password').get(getChangePassword).post(postChangePassword);
export default userRouter;
