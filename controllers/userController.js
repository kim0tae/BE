import User from '../models/User.js';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => {};

export const postJoin = async (req, res) => {
  const { name, email, password, mobile, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).render('join', {
      errorMessage: 'Password confirmation does not match.',
    });
  }
  const exists = await User.exists({ $or: [{ name }, { email }] });
  if (exists) {
    return res.status(400).render('join', {
      errorMessage: 'This username/email is already taken',
    });
  }

  await User.create({
    name,
    username,
    email,
    password,
    mobile,
  });
  return res.redirect('/login');
};

export const logout = (req, res) => {};
