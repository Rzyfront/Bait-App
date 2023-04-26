
import style from './Paginado.module.css';
import { useSelector } from 'react-redux';

const PaginadoU = ({ paginade, page }) => {
  const { totalPages } = useSelector((state) => state.users);
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
