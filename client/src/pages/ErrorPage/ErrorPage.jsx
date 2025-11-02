import { TanstackTable } from '../Table/TanstackTable/TanstackTable';
import style from './ErrorPage.module.css';

export const ErrorPage = (props) => {
  return (
    <div className={style.ErrorPage}>
      <TanstackTable />
    </div>
  );
};
