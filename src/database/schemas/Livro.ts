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
  description: {
    type: String,
    require: true,
  },
  local: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  bookCover: {
    type: String,
    require: true,
  },
  launch: {
    type: Date,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Livro', Livro);
