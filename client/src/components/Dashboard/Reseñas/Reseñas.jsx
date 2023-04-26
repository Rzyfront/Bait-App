import { useDispatch, useSelector } from 'react-redux';
import style from '../Dashboard.module.css';
import Paginado from '../Paginado/Paginado';

import { useEffect, useState } from 'react';
import { getAllReviews, getReviewDetail } from '../../../redux/actions/admin';
import { Rating as RatingStar } from '@smastrom/react-rating';

const imageDefault = 'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-580x580.jpg';

// import Reseña from './Reseña';
const Reseñas = ({ fn }) => {
  const dispatch = useDispatch();
  const { adminReviews } = useSelector(state => state);
  const [allReviews, setAllReviews] = useState({});
  const [status, setStatus] = useState('unVerified');

  useEffect(() => {
    dispatch(getAllReviews({}));
  }, []);

  useEffect(() => {
    dispatch(getAllReviews({ page: 1, verified: status }));
  }, [status]);

  useEffect(() => {
    setAllReviews(adminReviews);
  }, [adminReviews]);

  const setReviewsByPage = (page) => {
    dispatch(getAllReviews({ page, verified: status }));
  };

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
        <div className={style.containerUserCard}>
            {
                allReviews?.reviews?.map((u) =>
                  <div className={style.userCard} key={u?.id}>
                      <img className={style.userIcon} src={u?.User?.Image || imageDefault}></img>
                      <div className={style.nameAndUser}>
                      <p className={style.name}>{u?.local}</p> { // incluir nombre del local
                      }
                      <p className={style.usernames}>{u?.User?.name}</p>
                      </div>
                      <div className={style.titleAndStars}>
                        <p className={style.name}>{u?.title}</p>
                        <div className="RatingGroup">
                            <RatingStar readOnly style={{ maxWidth: 100 }} value={u?.rating || 5} />
                        </div>
                      </div>
                      <button className={style.buttonExaminar} value={u?.id} onClick={redirectDetail}>Examinar</button>
                  </div>
                )}
        </div>
        <Paginado totalPages={allReviews?.totalPages} setReviewsByPage={setReviewsByPage}/>
    </div>
  );
};

export default Reseñas;
