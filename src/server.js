import express from 'express';
import rootRouter from '../router/rootRouter.js';
import userRouter from '../router/userRouter.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', rootRouter);
app.use('/users', userRouter);

export default app;
