import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  id: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  mobile: { type: String, required: true },
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
