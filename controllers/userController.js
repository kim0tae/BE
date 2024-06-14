import User from '../models/User.js';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

// ============================================================================
export const getLogin = (req, res) => {};
export const postLogin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id, socialOnly: false });
  if (!user) {
    return res.status(400).send({ errorMessage: '사용자 정보를 확인해주세요.' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).send({ errorMessage: '사용자 정보를 확인해주세요.' });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.send({ success: true });
};
// ============================================================================
export const getJoin = (req, res) => {};

export const postJoin = async (req, res) => {
  const { id, email, password, mobile, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).send({ errorMessage: '패스워드가 일치하지 않습니다.' });
  }
  const exists = await User.exists({ $or: [{ id }, { email }] });
  if (exists) {
    return res.status(400).send({ errorMessage: 'id 또는 이메일이 이미 존재합니다.' });
  }
  await User.create({
    id,
    email,
    password,
    mobile,
  });
  return res.send({ success: true });
};
// ============================================================================
export const delUserInfo = (req, res) => {};
// ============================================================================

// ============================================================================
export const getChangePassword = (req, res) => {};
export const postChangePassword = async (req, res) => {};
// ============================================================================

// ============================================================================
export const getUserInfo = (req, res) => {
  return res.send(`${req.params.id}`);
};

export const postUserInfo = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).send({ sucess: false });
  }

  return res.send({ userInfo: user });
};
// ============================================================================

// ============================================================================
export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
// ============================================================================
