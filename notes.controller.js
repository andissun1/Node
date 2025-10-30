const chalk = require('chalk');
const Note = require('./models/Note');

async function addNote(title, owner) {
  await Note.create({ title, owner });
  console.log(chalk.bgGreen('Заметка добавлена!'));
}

async function getNotes(id) {
  if (id && id !== 'favicon.ico') {
    console.log(id);
    const response = await Note.findById(id);
    return response._doc;
  }
  const notes = await Note.find();

  return notes;
}

async function removeNote(noteID, owner) {
  const result = await Note.deleteOne({ _id: noteID, owner });
  console.log(result);

  if (result.deletedCount === 0) throw new Error('Нет прав на удаление');

  console.log(chalk.bgRedBright(`Заметка "${noteID}" была удалена!`));
}

async function editNote(id, title, owner) {
  const note = await Note.findOneAndUpdate(
    { _id: id, owner },
    { title },
    { returnDocument: 'after' }
  );

  if (!note) {
    throw new Error('Нет заметки для редактирования');
  }

  return note._doc;
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
