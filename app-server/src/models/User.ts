import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String,
});

export default model('User', userSchema);
