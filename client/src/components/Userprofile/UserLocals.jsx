import '../Dashboard/Restaurants/Restaurant.css';
import photoDefault from '../../assets/storePhoto.png';
import { useNavigate } from 'react-router-dom';
import { GrView } from 'react-icons/gr';

const UserLocals = ({ id, name, image }) => {
  const navigate = useNavigate();
  const userLocalNavigate = () => {
    navigate(`/profile/${id}`);
  };
  return (
    <div className="restaurant-card">
      {image && image.length
        ? <img src={image[0].url} alt='image' className='RestaurantImage' style={{ width: '120px' }} />
        : <img src={photoDefault} alt='image' className='RestaurantImage' style={{ width: '120px' }}/>}
      <div className='name-view-group'>
        <span>{name}</span>
        <button onClick={userLocalNavigate} className='btn-local-user'><GrView className='btn-local-icon'/></button>
      </div>
    </div>);
};
export default UserLocals;
