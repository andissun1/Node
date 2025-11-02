require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { addForm, getForms } = require('./appController');
const { addUser, loginUser } = require('./userController');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const cors = require('cors');

const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.options('/', cors());

// app.get('/', (req, res) => {});

app.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.status(200);
    res.cookie('token', token);
    res.send('Пользователь авторизован');
  } catch (error) {
    res.status(401);
    res.json(error.message);
  }
});

app.post('/register', async (req, res) => {
  if (req.body.code !== process.env.SECRET_CODE_FOR_REGISTRATION) {
    res.status(403);
    res.json('Ключ доступа отклонён');
    return;
  }

  try {
    await addUser(req.body);
    res.status(201).end();
    console.log('Пользователь добавлен');
  } catch (error) {
    if (error.code === 11000) {
      res.status(401);
      res.json('Логин занят. Попробуйте другой вариант.');
    }
    res.status(401);
    res.json(error.message);
  }
});

app.post('/', async (req, res) => {
  try {
    await addForm(req.body);
    res.status(201).end();
  } catch (error) {
    res.status(503).end();
  }
});

app.use(auth);

app.get('/getData', async (req, res) => {
  const result = await getForms();
  res.json(result);
});

mongoose
  .connect('mongodb://user:mongopass@localhost:27017/forms?authSource=admin')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на ${PORT} порту`);
    });
  });
