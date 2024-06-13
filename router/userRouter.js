import express from 'express';

const userRouter = express.Router();

userRouter.get('/:id', (req, res) => {
  console.log(req.params.id);
  return res.send(`${req.params.id}의 정보`);
});

export default userRouter;
