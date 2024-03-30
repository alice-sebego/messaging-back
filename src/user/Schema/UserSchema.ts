import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  connected: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'noob',
  },
  messages: {
    type: [String],
    default: [],
  },
});