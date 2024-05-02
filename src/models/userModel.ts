import { Schema, model } from 'mongoose';
import { User } from '../interface/user';

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
      },
      profile: {
        age: { type: Number },
        phone: { type: String },
        address: { type: String }
      },
    role: {
        type: String, 
        required: true,
        enum: ['Admin', 'User'], 
        default: 'User', // Set default role to 'user'
      },
  },
  {
    timestamps: true,
  }
);

const userModel = model<User>('User', userSchema);

export default userModel;
