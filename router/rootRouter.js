import express from 'express';
const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  return res.send({ page: 'home' });
});

export default rootRouter;
