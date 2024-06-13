import express from 'express';

const userRouter = express.Router();

userRouter.post('/join', (req, res) => {
  console.log(req.body);
  // 사용자 정보를 받아서 db에 데이터 적재해야함.
  res.status(200).json({ message: 'User information received', data: req.body });
});

userRouter.get('/:id', (req, res) => {
  console.log(req.params.id);
  return res.send(`${req.params.id}의 정보`);
});

export default userRouter;
