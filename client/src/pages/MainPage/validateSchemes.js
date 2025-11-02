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
      isEmail: { message: 'Почта введена с ошибками' },
    },
    password: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 3 символов', value: 3 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
  },
  // Набор правил для регистрации
  register: {
    email: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
      isEmail: { message: 'Почта введена с ошибками' },
    },
    password: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 2 символов', value: 2 },
      max: { message: 'Не более 20 символов', value: 20 },
    },
  },
  client: {
    fullname: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 10 символов', value: 10 },
      max: { message: 'Не более 40 символов', value: 40 },
    },
    phone: {
      isRequired: { message: 'Обязательное поле' },
      min: { message: 'Должно быть более 4 символов', value: 4 },
      max: { message: 'Не более 12 символов', value: 12 },
    },
    message: {
      min: { message: 'Должно быть более 10 символов', value: 10 },
      max: { message: 'Не более 250 символов', value: 250 },
    },
  },
};
