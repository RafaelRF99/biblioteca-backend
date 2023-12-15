import mongoose from 'mongoose';

const Livro = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
  },
  author: {
    type: String,
    require: true,
  },
  version: {
    type: String,
    require: true,
  },
  bookCover: {
    type: String,
    require: true,
  },
  lauch: {
    type: Date,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Livro', Livro);
