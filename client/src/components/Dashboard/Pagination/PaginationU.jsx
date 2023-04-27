import { useState } from 'react';
import style from './Pagination.module.css';
import { useSelector } from 'react-redux';

const PaginadoU = ({ paginade }) => {
  const { totalPages } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);
  const hadlepage = (e) => {
    setPage(page + e);
    paginade(page + e);
  };

  return (
        <div className={style.container}>
            {page > 1 && <b className={style.atras} onClick={() => hadlepage(-1)}>ATRAS</b>}
            <span className={style.paginado}>{page}/{totalPages}</span>
            {totalPages && page !== totalPages && <b className={style.next} onClick={() => hadlepage(1)}>SIGUIENTE</b>}
        </div>
  );
};

export default PaginadoU;
