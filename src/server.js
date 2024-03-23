import express from 'express';
import rootRouter from '../router/rootRouter.js';

const app = express();

app.use('/', rootRouter);

export default app;
