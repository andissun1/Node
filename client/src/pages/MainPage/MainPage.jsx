import { useEffect, useState } from 'react';
import { Input } from '../../components/Input/Input';
import style from './MainPage.module.css';
import { initialState, schemes } from './validateSchemes';
import { redirect, useLocation, useNavigate } from 'react-router';
import { validator } from '../../utils';
import { SERVER_URL } from '../../constants';

export const MainPage = (props) => {
  const address = useLocation().pathname.replaceAll('/', '') || 'client';
  const [formData, setFormData] = useState(initialState[address]);
  const [error, setError] = useState({});
  const [info, setInfo] = useState(null);
  const isValid = Object.keys(error).length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialState[address]);
  }, [address]);

  useEffect(() => {
    const resultsOfvalidate = validator(formData, schemes[address]); // Валидация
    setError(resultsOfvalidate);
  }, [formData, address]);

  function redirectAction() {
    address === 'auth' ? navigate('/register') : navigate('/auth');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;

    switch (address) {
      case 'auth':
        await fetch(`${SERVER_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          credentials: 'include',
          body: JSON.stringify(formData),
        })
          .then((res) => {
            if (!res.ok) return res.json();

            setFormData(initialState[address]);
            navigate('/table');
          })
          .then((res) => {
            const message = res.replace('user validation failed:', '');
            setInfo(message);
          })
          .catch((error) => {
            console.log(error);

            setError({
              ...error,
              server:
                'Данные не получилось отправить. Попробуйте повторить немного позже.',
            });
          });
        console.log('Вход');
        break;
      case 'register':
        await fetch(`${SERVER_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            ...formData,
            registedAt: new Date().toLocaleDateString(),
          }),
        })
          .then((res) => {
            if (!res.ok) return res.json();

            setFormData(initialState[address]);
            setInfo(
              'Новый аккаунт создан. Сейчас вас перенаправим на страницу авторизации.'
            );
            setTimeout(() => {
              navigate('/auth');
              setInfo(null);
            }, 6000);
          })
          .then((res) => {
            const message = res.replace('user validation failed:', '');
            setInfo(message);
          })
          .catch((error) => {
            console.log(error);

            setError({
              ...error,
              server:
                'Данные не получилось отправить. Попробуйте повторить немного позже.',
            });
          });
        console.log('Регистрация', formData);
        break;
      case 'client':
        await fetch(`${SERVER_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ ...formData, date: new Date().toLocaleDateString() }),
        })
          .then((res) => {
            if (!res.ok) throw new Error('Беда!');
            setFormData(initialState[address]);
            setInfo('Данные отправлены. В течение суток с вами свяжется оператор.');
          })
          .catch(() => {
            setError({
              ...error,
              server:
                'Данные не получилось отправить. Попробуйте повторить немного позже.',
            });
          });

        break;
      default:
        break;
    }
  }

  const clientForm = (
    <>
      <Input
        name="fullname"
        value={formData.fullname}
        label="ФИО"
        onChange={handleChange}
        type="text"
        error={error?.fullname}
      />
      <Input
        name="phone"
        value={formData.phone}
        label="Номер телефона"
        onChange={handleChange}
        type="text"
        error={error?.phone}
      />
      <Input
        name="message"
        value={formData.message}
        label="Опишите вашу проблему"
        onChange={handleChange}
        type="textarea"
        error={error?.message}
      />
    </>
  );

  const authForm = (
    <>
      <Input
        name="email"
        value={formData.email}
        label="Email"
        onChange={handleChange}
        type="text"
        error={error?.email}
      />
      <Input
        name="password"
        value={formData.password}
        label="Пароль"
        onChange={handleChange}
        type="new-password"
        error={error?.password}
      />
    </>
  );

  const registerForm = (
    <>
      <Input
        name="email"
        value={formData.email}
        label="Email"
        onChange={handleChange}
        type="text"
        error={error?.email}
      />
      <Input
        name="password"
        value={formData.password}
        label="Пароль"
        onChange={handleChange}
        type="new-password"
        error={error?.password}
      />
      <Input
        name="code"
        value={formData.code}
        label="Код для регистрации нового сотрудника"
        onChange={handleChange}
        type="text"
        error={error?.code}
      />
    </>
  );

  let form = clientForm;
  if (address === 'auth') form = authForm;
  if (address === 'register') form = registerForm;

  return (
    <div className={style.mainPage}>
      {['auth', 'register'].includes(address) ? <h1>Вход</h1> : <h1>Запись к врачу</h1>}
      <form className={style.form} onSubmit={handleSubmit}>
        {form}
        {error?.server && <span>{error.server}</span>}
        {info && <span>{info}</span>}
        <button type="submit" className={style.submitButton}>
          Отправить
        </button>
        {address !== 'client' && (
          <button type="button" className={style.redirectButton} onClick={redirectAction}>
            {address === 'auth' ? 'Создать аккаунт' : 'У меня есть аккаунт'}
          </button>
        )}
      </form>
    </div>
  );
};
