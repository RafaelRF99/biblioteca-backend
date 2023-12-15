import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3001;
const user = process.env['USER'];

app.listen(PORT, () => {
  console.log('Backend rodando...');
});

mongoose
  .connect(`mongodb+srv://${user}:aleatorio@cluster0.zm5webd.mongodb.net/`)
  .then(() => {
    app.listen(5000);
    console.log('Conectado ao BD Mongo!');
  })
  .catch((err) => console.log(err));
