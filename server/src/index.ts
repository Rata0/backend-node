import 'dotenv/config';
import express from 'express';
import sequelize from './db';

const PORT = process.env.PORT || 3000;
console.log('PORT: ', PORT);

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server runs on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
