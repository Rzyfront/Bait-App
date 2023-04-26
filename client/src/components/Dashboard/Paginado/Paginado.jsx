import { useState, useEffect } from 'react';
import style from './Paginado.module.css';
import { useSelector } from 'react-redux';

const Paginado = (props) => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  useEffect(() => {
    setMaxPage(props?.totalPages);
  }, [props.totalPages]);

  const moveInPagination = ({ target }) => {
    const value = target.value;
    if (value === 'back') {
      setPage(page - 1);
      props.setReviewsByPage(page - 1);
    };
    if (value === 'next') {
      setPage(page + 1);
      props.setReviewsByPage(page + 1);
    }
  };

  return (
    <div className={style.container}>
      {page > 1 && <button className={style.atras} value="back" onClick={moveInPagination}>ATRAS</button>}
      <span className={style.paginado}>{page}/{maxPage}</span>
      {page !== maxPage && <button className={style.next} value="next" onClick={moveInPagination}>SIGUIENTE</button>}
    </div>
  );
};

export default Paginado;
