const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
} = require('./notes.controller');

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

app.post('/', async (request, response) => {
  await addNote(request.body.title);

  response.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.put('/:id', async (request, response) => {
  await editNote(request.params.id, request.body.title);

  response.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (request, response) => {
  // console.log(request.params.id);
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

/* -------------------Базовая настройка без фреймворка--------------------- 
const server = http.createServer(async (request, response) => {
  if (request.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'));
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    response.end(content);
  } else if (request.method === 'POST') {
    const body = [];
    response.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
    });

    request.on('data', (data) => {
      body.push(Buffer.from(data));
    });

    request.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ');
      addNote(title);

      response.end(`Название заметки: ${title}`);
    });
  }
}); */
