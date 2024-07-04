import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utility/jwtToken.js';

import jwt from 'jsonwebtoken';

// ============================================================================
export const getLogin = (req, res) => {};
export const postLogin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id, socialOnly: false });
  if (!user) {
    return res.status(400).send({ success: false, errorMessage: '사용자 정보를 확인해주세요.' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).send({ success: false, errorMessage: '사용자 정보를 확인해주세요.' });
  }
  try {
    const payload = {
      user,
    };
    const token = generateToken(payload);
    return res.status(200).cookie('token', token).send({ success: true, jwtToken: token, user });
  } catch (error) {
    return res.status(401).send({ success: false, errorMessage: '토큰 유효성 에러' });
  }
};
// ============================================================================
export const getJoin = (req, res) => {};

export const postJoin = async (req, res) => {
  const { id, email, password, mobile, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).send({ success: false, errorMessage: '패스워드가 일치하지 않습니다.' });
  }
  const exists = await User.exists({ $or: [{ id }, { email }] });
  if (exists) {
    return res.status(400).send({ success: false, errorMessage: 'id 또는 이메일이 이미 존재합니다.' });
  }
  const userInfo = await User.create({
    id,
    email,
    password,
    mobile,
  });

  try {
    const payload = {
      user: {
        userInfo,
      },
    };
    const ret = generateToken(payload);
    res.status(200).send({ success: true, jwtToken: ret, userInfo });
  } catch (error) {
    res.status(401).send({ success: false, errorMessage: '토큰 유효성 에러' });
  }
};
// ============================================================================
export const delUserInfo = async (req, res) => {
  const { id } = req.body;
  const user = await User.findOne({ id, socialOnly: false });
  if (user) {
    await User.deleteOne({ id });
    return res.status(200).send({ success: true });
  } else {
    return res.status(400).send({ success: false, errorMessage: '사용자가 존재하지 않습니다.' });
  }
};
// ============================================================================

// ============================================================================
export const getChangePassword = (req, res) => {};
export const postChangePassword = async (req, res) => {
  const _id = req.user._id;
  const {
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;

  const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
    return res.status(400).render('users/change-password', {
      pageTitle: 'Change Password',
      errorMessage: 'The current password is incorrect',
    });
  }

  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render('users/change-password', {
      pageTitle: 'Change Password',
      errorMessage: 'The password does not match the confirmation',
    });
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  user.save();
  req.session.user.password = user.password;

  return res.status(200).send({ success: true });
};
// ============================================================================

// ============================================================================
export const getUserInfo = (req, res) => {
  return res.send(`${req.params.id}`);
};

export const postUserInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).send({ success: false, errorMessage: '존재하지 않는 사용자입니다.' });
    }

    return res.send({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, errorMessage: error.message });
  }
};
// ============================================================================

// ============================================================================
