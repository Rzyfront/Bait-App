import { useState } from 'react';
import style from './Paginado.module.css';

const Paginado = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(6);

  return (
    <div className={style.container}>
      {page > 1 && <b className={style.atras} onClick={() => setPage(page - 1)}>ATRAS</b>}
      <span className={style.paginado}>{page}/{maxPage}</span>
      {page !== maxPage && <b className={style.next} onClick={() => setPage(page + 1)}>SIGUIENTE</b>}
    </div>
  );
};

export default Paginado;
