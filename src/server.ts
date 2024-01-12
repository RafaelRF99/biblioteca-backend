import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'

import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3001;
const user = process.env['USER'];
const pass = process.env['PASS'];

app.use(routes)

// Rodar Backend
app.listen(port, () => {
  console.log('Backend rodando...', port);
});

// Ligação ao MongoDB
mongoose
  .connect(`mongodb+srv://${user}:${pass}@cluster0.zm5webd.mongodb.net/`)
  .then(() => {
    console.log('Conectado ao BD Mongo!');
  })
  .catch((err) => console.log(err));
