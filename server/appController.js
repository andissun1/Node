const form = require('./models/Form');

async function addForm(formData) {
  await form.create({ ...formData });
  console.log('Форма добавлена!');
}

async function getForms() {
  return await form.find();
}

module.exports = {
  addForm,
  getForms,
};
