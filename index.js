const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { addNote, printNotes, removeNote, editNote } = require('./notes.controller');

yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Добавить заметку',
    builder: {
      title: {
        type: 'string',
        describe: 'Название заметки:',
        demandOption: true,
      },
    },
    handler({ title }) {
      addNote(title);
      console.log('Add command', title);
    },
  })
  .command({
    command: 'list',
    describe: 'Показать все заметки',
    async handler() {
      printNotes();
    },
  })
  .command({
    command: 'remove',
    describe: 'Удалить заметку по id',
    builder: {
      id: {
        type: 'string',
        describe: 'id заметки для удаления:',
        demandOption: true,
      },
    },
    async handler({ id }) {
      removeNote(id);
    },
  })
  .command({
    command: 'edit',
    describe: 'Редактировать заметку по id',
    builder: {
      id: {
        type: 'string',
        describe: 'id заметки для редактирования:',
        demandOption: true,
      },
      title: {
        type: 'string',
        describe: 'Название заметки:',
        demandOption: true,
      },
    },
    async handler({ id, title }) {
      editNote(id, title);
    },
  })
  .version('2.0.3')
  .parse();
