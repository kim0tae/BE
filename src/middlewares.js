import jwt from 'jsonwebtoken';

export const authValidCheck = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ sucess: false, errorMessage: '유효하지 않는 토큰 정보입니다.' });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).send({ sucess: false, errorMessage: '' });
  }
};
