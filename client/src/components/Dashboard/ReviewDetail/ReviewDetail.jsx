import './reviewDetail.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { verifyReview } from '../../../redux/actions/admin';
import { Rating as RatingStar } from '@smastrom/react-rating';
import { LOWER_REVIEW_STATE, LOWER_ROLES } from '../dictionaries';
import ChartToxi from '../../../hooks/ChartToxi';
const reviewImage =
  'https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';
const imageDefault =
  'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-580x580.jpg';

const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };

const ReseñaDetail = ({ fn }) => {
  const dispatch = useDispatch();
  const reviewDetail = useSelector((state) => state.adminReviewDetail);
  const [review, setReview] = useState(reviewDetail);
  const [toggleImage, setToggleImage] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    setReview(reviewDetail);
    const grap = [
      {
        name: 'Tóxico',
        value: Math.ceil(reviewDetail.toxicity * 100),
        fill: '#e01e00'
      },
      {
        name: 'No Tóxico',
        value: 100 - Math.ceil(reviewDetail.toxicity * 100),
        fill: '#679436'
      }
    ];
    setData(grap);
  }, [reviewDetail]);
  const verifiedChange = async (e) => {
    const value = e.target.value;
    const response = await dispatch(
      verifyReview({ id: Number(review.id), verified: value })
    );
    if (response.success === true) {
      toast.success(
        `El nuevo estado de la reseña es:  ${LOWER_REVIEW_STATE[value]}.`,
        {
          position: toast.POSITION.TOP_CENTER
        }
      );
    } else {
      toast.error(`${response.message}`, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    setTimeout(() => fn(2, e), 3000);
  };

  const formatDate = (string) => {
    return new Date(string);
  };

  return (
    <div className='Modal-Review-Detail'>
      <ToastContainer className='notify' />
      <div className='Modal-Review-Detail-Date'>
        <p>{`Fecha de creación: ${formatDate(
          review.createdAt
        ).toLocaleDateString('es-ES', opciones)}`}</p>
        <p>{`Fecha de actualización: ${formatDate(
          review.updatedAt
        ).toLocaleDateString('es-ES', opciones)}`}</p>
      </div>

      <div className='Modal-Review-Detail-Data'>
        <div className='Modal-Review-Detail-Data-Information'>
          <h3 className='Title'>{review?.title.toUpperCase()}</h3>
          <div className='Modal-Review-Detail-Data-Description-container'>
            <p>{review?.comment}</p>
          </div>

          <div className='InfoGroup'>
            <p>Nivel de toxicidad: {Math.ceil(review?.toxicity * 100)}%</p>
          </div>
          <div className='InfoGroup'>
            <p>Estado: {LOWER_REVIEW_STATE[review?.verified]}.</p>
          </div>
          <div className='Info'>
            <div className='RatingGroup'>
              Rating de comida:
              <RatingStar
                readOnly
                style={{ maxWidth: 100 }}
                value={review?.food || 5}
              />
            </div>
            <div className='RatingGroup'>
              Rating de ambiente:
              <RatingStar
                readOnly
                style={{ maxWidth: 100 }}
                value={review?.environment || 5}
              />
            </div>
            <div className='RatingGroup'>
              Rating de precio/calidad:
              <RatingStar
                readOnly
                style={{ maxWidth: 100 }}
                value={review?.qaPrice || 5}
              />
            </div>
            <div className='RatingGroup'>
              Rating de servicio:
              <RatingStar
                readOnly
                style={{ maxWidth: 100 }}
                value={review?.service || 5}
              />
            </div>
            <div className='RatingGroup'>
              Rating promedio:
              <RatingStar
                readOnly
                style={{ maxWidth: 100 }}
                value={review?.rating || 5}
              />
            </div>
            <ChartToxi data={data} className='graphic' />
          </div>
        </div>

        <div className='Modal-Review-Detail-Data-2'>
          <div className='Modal-Review-Detail-Data-UserProfile'>
            <img
              className='ImageProfile'
              src={review?.User?.Image?.url || imageDefault}
            ></img>
            <div>
              <p>{`${review?.User?.name} ${review?.User?.lastname}`}</p>
              <p>{review?.User?.email}</p>
            </div>
            <div>
              <p>Rol: {LOWER_ROLES[review?.User?.role]}</p>
              <p>Edad: {review?.User?.age}</p>
            </div>
          </div>
          {toggleImage
            ? (
            <img
              className='ImageReview'
              src={review?.ticket?.url || reviewImage}
            ></img>
              )
            : (
            <img
              className='ImageReview'
              src={review?.Image?.url || reviewImage}
            ></img>
              )}
          <div className='Review-Detail-Button'>
            {review?.verified !== 'verified' && (
              <button
                value='verified'
                className='botonAccept'
                onClick={verifiedChange}
              >
                Aceptar
              </button>
            )}
            {review?.verified !== 'archived' && (
              <button
                value='archived'
                className='botonDenied'
                onClick={verifiedChange}
              >
                Rechazar
              </button>
            )}
            {review?.verified !== 'unVerified' && (
              <button
                value='unVerified'
                className='botonInvalid'
                onClick={verifiedChange}
              >
                Invalidar
              </button>
            )}
            {toggleImage
              ? (
              <button
              onClick={() => setToggleImage(!toggleImage)}
              className='btnToggleImageReview'
              >
                Ver imagen
              </button>
                )
              : (
                <button
                onClick={() => setToggleImage(!toggleImage)}
                className='btnToggleImageReview'
                >
                    Ver ticket
                  </button>
                )
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReseñaDetail;
