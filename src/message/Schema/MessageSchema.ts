import { Schema } from 'mongoose';

export const MessageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: {
      _id: String,
      username: String,
    },
    required: true,
  },
  receiver: {
    type: {
      _id: String,
      username: String,
    },
    required: true,
  },
});
