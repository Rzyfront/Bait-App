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

  useEffect(() => {
    dispatch(getReviews(localId, page));
    return () => {
      dispatch(cleanReviews());
    };
  }, [page]);
  return (
    <div className='Reviews animated-element'>
      <div className='TitleGroup'>
        <h2 className='Reviews-Title'>Reviews</h2>
        <div className='Selectors-Group'>
          <select name='' id='' className='Order-Rating'>
            <option value='1' defaultValue >Ordena por rating</option>
            <option value='1'>Mayor puntuación</option>
            <option value='2'>Menor puntuación</option>

          </select>

        </div>
      </div>
      <div className='Reviews-List'>
        {reviews.map(({ User, rating, Image, comment, title, environment, food, qaPrice, service, createdAt }, index) => {
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
        })}
      </div>
       <div className='Load-More'>
        <h4 className='Load' onClick={() => setPage(++page)}>Cargar más</h4>
       </div>
    </div>
  );
}

export default Reviews;
