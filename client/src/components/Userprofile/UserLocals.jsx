import '../Dashboard/Restaurants/Restaurant.css';
import photoDefault from '../../assets/storePhoto.png';
import { useNavigate } from 'react-router-dom';

const UserLocals = ({ id, name, image, location, specialty, schedule }) => {
  const navigate = useNavigate();
  const userLocalNavigate = () => {
    navigate(`/profile/${id}`);
  };
  return (
    <div className="Restaurantcard">
      {image && image.length
        ? <img src={image[0].url} alt='image' className='RestaurantImage' />
        : <img src={photoDefault} alt='image' className='RestaurantImage' />}
      <div className='name'>
        <h6>{name}</h6>
        <h6>Ubicación: {location}</h6>
      </div>
      <div className='state'>
        <h6>Especialidad: {specialty}</h6>
        <h6>Horario: {schedule}</h6>
      </div>
      {<div className='state'>
          <button onClick={userLocalNavigate}>EXAMINAR</button>
      </div>}
    </div>);
};
export default UserLocals;
