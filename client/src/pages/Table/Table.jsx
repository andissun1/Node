import { useState } from 'react';
import style from './Table.module.css';
import { TanstackTable } from './TanstackTable/TanstackTable';
import { useEffect } from 'react';
import { SERVER_URL } from '../../constants';
import { useNavigate } from 'react-router';

export const Table = (props) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(SERVER_URL + '/getData', {
      credentials: 'include',
      method: 'GET',
    })
      .then((res) => {
        console.log(res);

        if (res.status === 403) return navigate('/auth');
        return res.json();
      })
      .then((res) => setData(res));
  }, []);

  if (!data) return <h2>Загрузка...</h2>;

  console.log(data);

  return (
    <div className={style.tablePage}>
      <h1>Заявки с формы</h1>
      <TanstackTable serverData={data} />
    </div>
  );
};
