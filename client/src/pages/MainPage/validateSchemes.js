export const initialState = {
  auth: { email: '', password: '' },
  register: { email: '', password: '', code: '' },
  client: { fullname: '', phone: '', message: '' },
};

export const schemes = {
  // Набор правил для входа
  auth: {
    email: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    password: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
  },
  // Набор правил для регистрации
  register: {
    fullname: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 40 символов', value: 40 },
    },
    phone: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    email: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    password: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
    repeatPassword: {
      isRequired: { message: 'Обязательное поле' },
      confirmPassword: { message: 'Пароли не совпадают', ref: 'password' },
    },
  },
  client: {
    fullname: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 40 символов', value: 40 },
    },
  },
};
