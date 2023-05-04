import { useDispatch, useSelector } from 'react-redux';
import style from '../Dashboard.module.css';
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { getAllReviews, getReviewDetail } from '../../../redux/actions/admin';
import { Rating as RatingStar } from '@smastrom/react-rating';
import { IoMdArchive } from 'react-icons/io';

const imageDefault = 'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-580x580.jpg';

// import Reseña from './Reseña';
const Reseñas = ({ fn }) => {
  const dispatch = useDispatch();
  const { adminReviews } = useSelector(state => state);
  const [allReviews, setAllReviews] = useState(adminReviews);
  const [status, setStatus] = useState('unVerified');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllReviews({ page, verified: status }));
  }, [status, page]);

  useEffect(() => {
    setAllReviews(adminReviews);
  }, [adminReviews]);

  const redirectDetail = (e) => {
    const value = e.target.value;
    const detail = adminReviews.reviews.find(e => e.id === Number(value));
    dispatch(getReviewDetail(detail));
    fn(3, e);
  };

  const selectStatusReview = (e) => {
    const { value } = e.target;
    setStatus(value);
  };

  const paginade = (e) => {
    setPage(e);
  };

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>Reseñas</h2>
        <select
          value={status}
          name = "status"
          className="RatingOrder"
          onChange={selectStatusReview}
        >
          <option value="unVerified" >Sin verificar</option>
          <option value="archived">Archivados</option>
          <option value="verified" >Verificados</option>
        </select>
        <div className='table-responsive'>
        <table className='table'>
          <thead className='thead-restaurants'>
                <tr>
                    <th>Usuario</th>
                    <th>Titulo</th>
                    <th>Calificacion</th>
                    <th>Acciones</th>
                  </tr>
          </thead>
          <tbody>
          <tr>
      <td className='align-middle'>Edgar Vilchez</td>
      <td className='align-middle'>Comida asquerosa</td>
      <td className='align-middle'>-Aca deben ir las estrellas-</td>
            <td>
                <button className='res-icons deny'>
                  Revisar  <IoMdArchive />
                </button>
            </td>
    </tr>
          </tbody>
        </table>
      </div>
        {/* <div className={style.containerUserCard}>
            {
                allReviews?.reviews?.map((u) =>
                  <div className={style.userCard} key={u?.id}>
                    <img className={style.userIcon} src={u?.User?.Image
                      ?.url || imageDefault}></img>
                      <div className={style.nameAndUser}>
                        <p className={style.name}>{u?.Local?.name}</p>
                        <p className={style.usernames}>{u?.User?.name}</p>
                      </div>
                      <div className={style.nameAndUser}>
                        <p className={style.name}>{u?.title}</p>
                        <div className="RatingGroup">
                            <RatingStar readOnly style={{ maxWidth: 100 }} value={u?.rating || 5} />
                        </div>
                      </div>
                      <button className={style.buttonExaminar} value={u?.id} onClick={redirectDetail}>Examinar</button>
                  </div>
                )}
        </div> */}
       <Pagination paginade={paginade} page={page} totalPages={allReviews.totalPages} />
    </div>
  );
};

export default Reseñas;
