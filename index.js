const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { addNote, removeNote, getNotes, editNote } = require('./notes.controller');

const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'pages');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (request, response) => {
  response.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.get('/:id', async (request, response) => {
  const note = await getNotes(request.params.id);
  response.json({ ...note });
});

app.post('/', async (request, response) => {
  await addNote(request.body.title);

  response.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.put('/:id', async (request, response) => {
  const newNote = await editNote(request.params.id, request.body.title);
  response.json({ ...newNote });
});

app.delete('/:id', async (request, response) => {
  await removeNote(request.params.id);
  response.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, (params) => {
  console.log(chalk.green(`Сервер запущен. Порт: ${port}`));
});
