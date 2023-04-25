import './Reviews.css';
import { useEffect, useState } from 'react';
import { Rating as RatingStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { getReviews } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function Reviews ({ localId }) {
  const dispatch = useDispatch();
  const { reviews } = useSelector(state => state);
  let [page, setPage] = useState();

  useEffect(() => {
    dispatch(getReviews(localId, page));
  }, [page]);

  return (
    <div className='Reviews animated-element'>
      <div className='TitleGroup'>
        <h2 className='Reviews-Title'>Reviews</h2>
        <div>
          <select name='' id=''>
            <option value='1' defaultValue >Ordena</option>
            <option value='1'>Mayor puntuación</option>
            <option value='2'>Menor puntuación</option>

          </select>
          <button onClick={() => setPage(page++)}>Cargar más</button>
        </div>
      </div>
      <div className='Reviews-List'>
        {reviews.map(({ User, rating, Image, comment, title }, index) => {
          return (
            <div key={index} className='ReviewCard'>
              <div className='LeftInfo'>
                <h3>{title}</h3>
                <div className='RatingGroup'>
                  <h4>Rating:</h4>
                  <RatingStar
                    readOnly
                    style={{ maxWidth: 100 }}
                    value={rating}
                  />
                </div>
                <div className='OpinionGroup'>
                  <h4>Opinión:</h4>
                  <p>{comment}</p>
                </div>
              </div>
              <div className='RigthImg'>
                {Image
                  ? <img src={Image.url} alt='ImageDatabase'/>
                  : <img
                  src={
                    'https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg'
                  }
                  alt='default'
                /> }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
