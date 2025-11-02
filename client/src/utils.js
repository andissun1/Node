// Валидация форм
const validationRules = {
  isRequired: (value) => {
    return Boolean(value.trim());
  },
  min: (value, limiter) => {
    return value.length > limiter;
  },
  max: (value, limiter) => {
    return value.length < limiter;
  },
  isEmail: (value) => {
    const result = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    return result;
  },
};

export function validator(allValues, scheme) {
  const errors = {};

  for (let inputName in allValues) {
    const rulesInSheme = scheme[inputName]; // Извлекаю правила из схемы по именам инпутов

    for (let rule in rulesInSheme) {
      const { message, value, ref } = rulesInSheme[rule]; // Извлекаю содержимое из пользовательской схемы

      const hasError =
        validationRules[rule] &&
        !validationRules[rule](allValues[inputName], value, allValues[ref]);

      if (hasError) {
        errors[inputName] = message;
        break;
      }
    }
  }

  return errors;
}
