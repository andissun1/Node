import { NavLink } from 'react-router';
import style from './Header.module.css';

const links = [
  {
    link: '/table',
    text: 'Для сотрудников',
  },
  {
    link: '/',
    text: 'Записаться к врачу',
  },
];

export const Header = (props) => {
  return (
    <div className={style.header}>
      {links.map((item) => (
        <NavLink
          key={item.link}
          to={item.link}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? style.active : ''
          }
        >
          {item.text}
        </NavLink>
      ))}
    </div>
  );
};
