import mongoose from 'mongoose';

const Admin = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
});

export default mongoose.model('Admin', Admin);
