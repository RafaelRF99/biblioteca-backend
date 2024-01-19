import mongoose from 'mongoose';

const Admin = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model('AdminBiblioteca', Admin);
