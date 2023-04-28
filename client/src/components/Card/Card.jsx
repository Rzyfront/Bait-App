import { GoLocation } from 'react-icons/go';
import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import './Card.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { foco } from '../../redux/actions/ubication';
import { PopComent } from '../components';
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

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#343434',
    inactiveFillColor: '#3434343B'
  };

  return (
    <div className="Card animated-element" key={id}>
      <div className='Img-Card-Group'>
        <Link to={`/profile/${id}`} >
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
      </Link>
      </div>
      <div className="infoCard">
        <Link to={`/profile/${id}`} >
        <h2 className="placeName">{Name || 'No name'}</h2>
          <div className="RatingGroup">
            <p className="Rating">Rating: </p>
            <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating || 3} className='Stars-Cards' itemStyles={myStyles}/>
          </div>
          </Link>
        {location && (
          <div className="LocationGroup" onClick={handleFoco}>
            <p className="Location"><GoLocation className='locationico' /> {location.split(',').at(3) + ' ' + location.split(',').at(0) + location.split(',').at(1) }
            </p>
            <PopComent text={'Click para ir'} className='Go-To-Map'/>
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
