import { GoLocation, GoVerified, GoUnverified } from 'react-icons/go';
import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import './Card.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { foco } from '../../redux/actions/ubication';
import { PopComent } from '../components';
;
function Card ({
  id,
  Name,
  Rating,
  location,
  verified,
  schedule,
  Characteristic,
  specialty,
  address,
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
  const properties = {
    big_group: 'Grupo grande',
    family_style: 'Familiar',
    live_music: 'Música',
    outdoor_seating: 'Aire libre',
    parking_lot: 'Estacionamiento',
    pet_friendly: 'Acepta mascotas',
    romantic: 'Romántico',
    table_service: 'Servicio de mesa',
    wifi: 'Wifi',
    work_friendly: 'Para trabajar'
  };

  const trueProperties = [];

  for (const [property, value] of Object.entries(Characteristic)) {
    if (value && properties[property]) {
      trueProperties.push(properties[property]);
    }
  }

  console.log(verified);

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
        {verified === 'verified'
          ? <GoVerified className='CardVerified'title='Verificado'/>
          : <GoUnverified className='CardUnverified' title='No verificado'/>
        }
        <Link to={`/profile/${id}`} >
        <h2 className="placeName">{Name || 'No name'}</h2>
          <div className="RatingGroup">
            <p className="Rating">Rating: </p>
            <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating || 0} className='Stars-Cards' itemStyles={myStyles}/>
          </div>
          </Link>
        {location && (
          <div className="LocationGroup" onClick={handleFoco}>
            <p className="Location" title='GeoLocalizacion'><GoLocation className='locationico' /> {location.split(',').splice(0, location.split(',').length - 2).join(',')}
            </p>
            <PopComent text={'Click para ir'} className='Go-To-Map'/>
          </div>
        )}
        {
        pathlocation.pathname.includes('/home') &&
        <div className='Card-Tags'>
          {specialty && <div className='Tag-Type'><p>{specialty}</p></div>}
          {
            trueProperties?.map((p, i) => {
              return <div key={i} className='Tag-Charact'><p>{p}</p></div>;
            })
          }

        </div>
        }
      </div>
    </div>
  );
}

export default Card;
