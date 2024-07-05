import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  contents: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  author: { type: String, required: true },
});

const boardModel = mongoose.model('Board', boardSchema);

export default boardModel;
