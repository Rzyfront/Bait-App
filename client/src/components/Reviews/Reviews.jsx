import './Reviews.css';
import { Rating as RatingStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

function Reviews ({ ReviewsList }) {
  return (
    <div className='Reviews animated-element'>
      <div className='TitleGroup'>
        <h2 className='Reviews-Title'>Reviews</h2>
        <div>
          <select name="" id="">
            <option value="1" defaultValue >Ordena</option>
            <option value="1">Mejores reseñas</option>
            <option value="2">Peores Reseñas</option>

          </select>
        </div>
      </div>
      <div className='Reviews-List'>
        {ReviewsList.map(({ User, rating, Image, comment, title }, index) => {
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
                  <h4>Opinion:</h4>
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
