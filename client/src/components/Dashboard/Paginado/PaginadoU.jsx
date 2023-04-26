import { useState, useEffect } from 'react';
import style from './Paginado.module.css';
import { useSelector } from 'react-redux';

const PaginadoU = ({ paginade, page }) => {
  const { totalPages } = useSelector((state) => state.users);
  //  const [page, setPage] = useState(page);
  const hadlepage = (e) => {
    // setPage(page + e);
    console.log(page + e);
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
