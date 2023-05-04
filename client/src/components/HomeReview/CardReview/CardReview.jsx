import { GoLocation } from 'react-icons/go';
import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import './CardReview.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { foco } from '../../../redux/actions/ubication';
import { PopComent } from '../../components';
function CardReview ({
  id,
  Name,
  Rating,
  location,
  verified,
  schedule,
  Characteristic,
  address,
  Images,
  Price,
  lat,
  lng
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFoco = () => {
    const data = { lat, lng };
    dispatch(foco(data));
  };

  const redirectReview = () => {
    navigate(`/profile/${id}?review=true`);
  };

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#343434',
    inactiveFillColor: '#3434343B'
  };

  return (
    <div className="CardReview animated-element" key={id}>
      <div className='Img-Card-Group'>
      {Images.length > 0
        ? (
        <img src={Images[0].url} alt={Name} className="imgCard" width='350'/>
          )
        : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg"
          alt="imagen defaul"
          className="imgCard"
        />
          )}
      </div>
      <div className="infoCard">
        <h2 className="placeName">{Name || 'No name'}</h2>
          <div className="RatingGroup">
            <p className="Rating">Rating: </p>
            <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating || 0} className='Stars-Cards' itemStyles={myStyles}/>
          </div>
        {location && (
          <div className="LocationGroup" onClick={handleFoco}>
            {address && <p className='Address'>Direccion: {address}</p>}
            <p className="Location"><GoLocation className='locationico' /> {location.split(',').splice(0, location.split(',').length - 2).join(',')}
            </p>
            <PopComent text={'Click para ir'} className='Go-To-Map'/>
          </div>
        )}
        <br/>
        <button className="reviewButton" onClick={redirectReview}>Hacé tu reseña</button>
      </div>
    </div>
  );
}

export default CardReview;
