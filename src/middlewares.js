import jwt from 'jsonwebtoken';
//
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const authValidCheck = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({ sucess: false, errorMessage: '유효하지 않는 토큰 정보입니다.' });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decode.user.userInfo;
    next();
  } catch (error) {
    res.status(401).send({ sucess: false, errorMessage: '' });
  }
};
