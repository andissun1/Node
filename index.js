require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { addNote, removeNote, getNotes, editNote } = require('./notes.controller');
const { addUser, loginUser } = require('./user.controller');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'pages');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/register', async (request, response) => {
  response.render('register', {
    title: 'Express App',
    error: undefined,
  });
});

app.get('/login', async (request, response) => {
  response.render('login', {
    title: 'Express App',
    error: undefined,
  });
});

app.post('/login', async (request, response) => {
  try {
    const token = await loginUser(request.body.email, request.body.password);
    response.cookie('token', token);
    response.redirect('/');
  } catch (error) {
    response.render('login', {
      title: 'Express App',
      error: error.message,
    });
  }
});

app.post('/register', async (request, response) => {
  try {
    await addUser(request.body.email, request.body.password);

    response.redirect('/login');
  } catch (error) {
    if (error.code === 11000) {
      response.render('register', {
        title: 'Express App',
        error: 'Email уже зарегистрирован',
      });
      return;
    }
    response.render('register', {
      title: 'Express App',
      error: error.message,
    });
  }
});

app.get('/logout', async (request, response) => {
  response.cookie('token', '', { httpOnly: true });

  response.redirect('/login');
});

app.use(auth);

app.get('/', async (request, response) => {
  response.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    userEmail: request.user.email,

    created: false,
    error: false,
  });
});

app.get('/:id', async (request, response) => {
  const note = await getNotes(request.params.id);
  response.json({ ...note });
});

app.post('/', async (request, response) => {
  try {
    await addNote(request.body.title, request.user.email);

    response.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      userEmail: request.user.email,
      created: true,
      error: false,
    });
  } catch (error) {
    console.error('Ошибка при создании');
    response.render('index', {
      title: 'Express App',
      userEmail: request.user.email,

      notes: await getNotes(),
      created: false,
      error: true,
    });
  }
});

app.put('/:id', async (request, response) => {
  try {
    const note = await editNote(request.params.id, request.body.title);
    response.json({ ...note });
  } catch (error) {
    console.error('Ошибка при создании');
    response.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      userEmail: request.user.email,

      created: false,
      error: error.message,
    });
  }
});

app.delete('/:id', async (request, response) => {
  try {
    await removeNote(request.params.id);
    response.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      userEmail: request.user.email,

      created: false,
      error: false,
    });
  } catch (error) {
    response.render('index', {
      title: 'Express App',
      notes: await getNotes(),
      userEmail: request.user.email,

      created: false,
      error: error.message,
    });
  }
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(port, (_) => {
    console.log(chalk.green(`Сервер запущен. Порт: ${port}`));
  });
});
