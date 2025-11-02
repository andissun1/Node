import { useState } from 'react';
import style from './Table.module.css';
import { TanstackTable } from './TanstackTable/TanstackTable';
import { useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useNavigate } from 'react-router';

export const Table = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(SERVER_URL + '/getData', {
      credentials: 'include',
      method: 'GET',
    })
      .then((res) => (res.status === 403 ? navigate('/auth') : res.json()))
      .then((res) => setData(res));
  }, []);

  if (!data) return <h2>Загрузка...</h2>;

  return (
    <div className={style.tablePage}>
      <h1>Заявки с формы</h1>
      <TanstackTable serverData={data} />
    </div>
  );
};
