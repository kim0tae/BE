import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  socialFlag: {
    type: Boolean,
    default: false
  }
})

const HashPassword  = async () => {
  if (this.isModified('passsword')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
}

userSchema.pre('save', HashPassword);

const User = mongoose.model('User', userSchema);

export default User;