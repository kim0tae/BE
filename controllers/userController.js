import User from '../models/User.js';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

// ============================================================================
export const getLogin = (req, res) => {
  console.log('111');
};
export const postLogin = async (req, res) => {
  console.log('111');
  const { id, password } = req.body;
  const user = await User.findOne({ id, socialOnly: false });
  if (!user) {
    return res.status(400).send({
      errorMessage: 'An account with id does not exists.',
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).send({
      errorMessage: 'Wrong password.',
    });
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
    return res.status(400).send('/join', {
      errorMessage: 'Password confirmation does not match.',
    });
  }
  const exists = await User.exists({ $or: [{ id }, { email }] });
  if (exists) {
    return res.status(400).send('/join', {
      errorMessage: 'This username/email is already taken',
    });
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
