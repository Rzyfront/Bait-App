import './Reviews.css';
import { useEffect, useState } from 'react';
import '@smastrom/react-rating/style.css';
import { getReviews, cleanReviews } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import ReviewsCard from './ReviewsCard/ReviewsCard';
import FormatDate from './FormatDate/FormatDate';

function Reviews ({ localId, setPage, page }) {
  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state);
  const [order, setOrder] = useState('');

  const handleOrder = (e) => {
    const { value } = e.target;
    setOrder(value);
  };

  // useEffect(() => {
  //   if (order.length) {
  //     dispatch(getReviews(localId, page, order));
  //   };
  // }, [order]);

  useEffect(() => {
    if (order.length) {
      dispatch(getReviews(localId, page, order));
    } else {
      dispatch(getReviews(localId, page));
    }
    return () => {
      dispatch(cleanReviews());
    };
  }, [page, order]);
  console.log(reviews);
  return (
    <div className='Reviews animated-element'>
      <div className='TitleGroup'>
        <h2 className='Reviews-Title'>Reviews</h2>
        <div className='Selectors-Group'>
          <select name='' id='' className='Order-Rating' onChange={handleOrder}>
            <option defaultValue >Ordena por rating</option>
            <option value='DESC'>Mayor puntuación</option>
            <option value='ASC'>Menor puntuación</option>

          </select>

        </div>
      </div>
      <div className='Reviews-List'>
        {reviews.length > 0
          ? reviews?.map(({ User, rating, Image, comment, title, environment, food, qaPrice, service, createdAt }, index) => {
            const reviewDate = FormatDate(createdAt);
            return (
           <ReviewsCard
           index={index}
           key={index}
           User={User}
           title={title}
           comment={comment}
           Image={Image}
           rating={rating}
           environment={environment}
           food={food}
           qaPrice={qaPrice}
           service={service}
           reviewDate={reviewDate}
           />
            );
          })
          : <div className='NoReviews'>
            <p className='NoReviewsText'>No hay reseñas para mostrar, si visitáste este lugar dejá tu reseña.
            </p>
          </div>
      }
      </div>
      {reviews.length > 0
        ? <div className='Load-More'>
        <h4 className='Load' onClick={() => setPage(++page)}>Cargar más</h4>
       </div>
        : (page > 1) && <div className='Load-More'>
        <h4 className='Load' onClick={() => setPage(1)}>Atrás</h4>
       </div>}
    </div>
  );
}

export default Reviews;
