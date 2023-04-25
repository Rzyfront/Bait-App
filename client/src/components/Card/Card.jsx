import { GoLocation } from 'react-icons/go';
import { Rating as RatingStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import './Card.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { foco } from '../../redux/actions/ubication';

function Card ({
  id,
  Name,
  Rating,
  location,

  verified,
  schedule,
  Characteristic,
  Images,
  Price,
  lat,
  lng
}) {
  const pathlocation = useLocation();
  const dispatch = useDispatch();

  const handleFoco = () => {
    const data = { lat, lng };
    dispatch(foco(data));
  };

  return (
    <div className="Card animated-element" key={id}>
      <Link to={`/profile/${id}`} >
      {Images.length > 0
        ? (
        <img src={Images[0].url} alt={Name} className="imgCard" />
          )
        : (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg"
          alt="imagen defaul"
          className="imgCard"
        />
          )}
      </Link>
      <div className="infoCard">
        <Link to={`/profile/${id}`} >
        <h2 className="placeName">{Name || 'No name'}</h2>

          <div className="RatingGroup">
            <p className="Rating">Rating: </p>
            <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating || 5} />
          </div>
          </Link>
        {location && (
          <div className="LocationGroup" onClick={handleFoco}>
            <p className="Location"></p>
            <GoLocation className='locationico'/>
            {location.split(',').at(-2)} {location.split(',').at(-3)}{location.split(',').at(-1)}

          </div>
        )}
        {Price && <p className="Price">${Price}</p>}
        {
        pathlocation.pathname.includes('/home') &&
        <div className='Card-Tags'>
          <div className='Tag-Type'><p>Vegana</p></div>
          <div className='Tag-Charact'><p>Pet</p></div>
        </div>
        }
      </div>
    </div>
  );
}

export default Card;
