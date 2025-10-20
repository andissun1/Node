const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

const notes = [];

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Заметка добавлена!'));
}

async function getNotes(params) {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(noteID) {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  const checkedNotes = Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
  const newNotesArray = checkedNotes.filter((note) => note.id !== noteID);
  const deletedNote = checkedNotes.filter((note) => note.id === noteID);
  await fs.writeFile(notesPath, JSON.stringify(newNotesArray));
  console.log(chalk.bgGreen(`Заметка "${deletedNote[0].title}" была удалена!`));
}

async function printNotes(params) {
  const notes = await getNotes();

  console.log(chalk.bgGrey('Список заметок:'));
  notes.forEach((note) => {
    console.log(`${chalk.white(note.title)} || ${chalk.gray(`id: ${note.id}`)} `);
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
