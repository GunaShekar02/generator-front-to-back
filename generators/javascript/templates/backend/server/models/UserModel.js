import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name missing!"]
  }
});

export default mongoose.model('User', User);