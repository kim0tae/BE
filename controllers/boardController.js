import Board from '../models/Board.js';
import User from '../models/User.js';

export const watch = async (req, res) => {
  const { id } = req.params;
  const board = await Board.findById(id).populate('owner');

  if (board) {
    return res.status(200).send({ success: true, board });
  }
  return res.status(400).send({ success: false, errorMessage: '게시글을 정보를 찾을 수 없습니다.' });
};

export const home = async (req, res) => {
  const boards = await Board.find({}).sort({ createAt: 'asc' });
  if (boards) {
    return res.status(200).send({ success: true, boards });
  }
};

export const postUpload = async (req, res) => {
  const _id = req.user._id;
  const { title, contents } = req.body;
  try {
    const user = await User.findById(_id);
    const newBoard = await Board.create({
      title: title,
      contents: contents,
      owner: _id,
      author: user.id,
    });

    user.boards.push(newBoard.id);
    user.save();
    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res.status(400).render('upload', {
      success: false,
      errorMessage: error._message,
    });
  }
};
