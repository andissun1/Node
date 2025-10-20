const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { addNote, printNotes, removeNote } = require('./notes.controller');

yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Add new note list',
    builder: {
      title: {
        type: 'string',
        describe: 'Note title',
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
    describe: 'Print all notes',
    async handler() {
      printNotes();
    },
  })
  .command({
    command: 'remove',
    describe: 'Remove note by id',
    builder: {
      id: {
        type: 'string',
        describe: 'Note ID for delete',
        demandOption: true,
      },
    },
    async handler({ id }) {
      removeNote(id);
    },
  })
  .version('2.0.3')
  .parse();
