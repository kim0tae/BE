import jwt from 'jsonwebtoken';

//
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn: '1d' });
};

export const refreshToken = (token, payload) => {
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const payload = {
      decodeToken,
    };
    const newToken = generateToken(payload);
    return newToken;
  } catch (error) {
    return null;
  }
};
