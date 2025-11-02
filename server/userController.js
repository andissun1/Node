const user = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constatns');

async function addUser(form) {
  const passwordHash = await bcrypt.hash(form.password, 10);
  const preparedData = { ...form, password: passwordHash };
  delete preparedData.code;
  await user.create({ ...preparedData });
}

async function loginUser(email, password) {
  const result = await user.findOne({ email });

  if (!result) {
    throw new Error('Пользватель с такой почтой не найден');
  }

  const isPasswordCorrect = await bcrypt.compare(password, result.password);

  if (!isPasswordCorrect) {
    throw new Error('Неправильный пароль');
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '6h' });
}

module.exports = {
  addUser,
  loginUser,
};
