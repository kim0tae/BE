//
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
//
import rootRouter from '../router/rootRouter.js';
import userRouter from '../router/userRouter.js';
import boardRouter from '../router/boardRouter.js';

//
const app = express();
const logger = morgan('dev');
//

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use('/', rootRouter);
app.use('/board', boardRouter);
app.use('/users', userRouter);

export default app;
