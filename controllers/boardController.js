import Board from '../models/Board.js';
import User from '../models/User.js';

export const watch = async (req, res) => {
  const { id } = req.params;
  // const video = await Board.findById(id).populate('owner');

  // if (video) {
  //return res.render('watch', { pageTitle: video.title, video });
  // }
  //return res.render('404', { pageTitle: 'Not Found Video' });
};

export const postUpload = async (req, res) => {
  const _id = req.user._id;
  const { title, contents } = req.body;
  try {
    const newBoard = await Board.create({
      title: title,
      contents: contents,
      owner: _id,
    });
    const user = await User.findById(_id);
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
