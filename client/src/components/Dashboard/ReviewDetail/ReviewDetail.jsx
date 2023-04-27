import style from '../Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { verifyReview } from '../../../redux/actions/admin';
const reviewImage = 'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
const imageDefault = 'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-580x580.jpg';

const ReseñaDetail = () => {
  const dispatch = useDispatch();
  const reviewDetail = useSelector((state) => state.adminReviewDetail);
  const [review, setReview] = useState(reviewDetail);
  useEffect(
    () => { setReview(reviewDetail); }, [reviewDetail]
  );
  const verifiedChange = ({ target }) => {
    const value = target.value;
    dispatch(verifyReview({ id: Number(review.id), verified: value }));
  };

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>{`Reseña de ${review?.User?.name} ${review?.User?.lastname}`}</h2>
        <div className={style.containerReview}>
        <div className={style.reseña}>
            <h3 className={style.tituloReseña}>{review?.title}</h3>
            <h4 className={style.contentReseña}>{review?.comment}</h4>
            <div className={style.userCard}>
            <img className={style.userIcon} src={review?.User?.Image || imageDefault}></img>
            <div className={style.nameAndUser}>
            <p className={style.name}>{`${review?.User?.name} ${review?.User?.lastname}`}</p>
            <p className={style.usernames}>@emailHere</p>
            </div>
            <div className={style.titleAndStars} style={{ marginLeft: '300px' }}>
            <p>Reseñas creadas: 283</p>
            <p>Alertas administrativas: 1</p>
            </div>
        </div>
            <div className={style.interactuar}>
                <button value="verified" className={style.botonAccept} onClick={verifiedChange}>Aceptar</button>
                <button value="archived" className={style.botonDenied} onClick={verifiedChange}>Rechazar</button>
            </div>
        </div>
        <div className={style.profiler}>
        <div className={style.pruebas}>
            <img src={review?.Image?.url || reviewImage } className={style.fotos}></img>
        </div>
        </div>
        </div>
    </div>
  );
};

export default ReseñaDetail;
