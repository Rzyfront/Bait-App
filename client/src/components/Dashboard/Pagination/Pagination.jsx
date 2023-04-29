
import style from './Pagination.module.css';

const PaginadoU = ({ paginade, page, totalPages }) => {
  const hadlepage = (e) => {
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
