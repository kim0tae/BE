import express from 'express';
const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  return res.send({ pageTitle: 'hello world' });
});

export default rootRouter;
