
import './Restaurant.css';
import photoDefault from '../../../assets/storePhoto.png';
const OneRestaurant = ({ name, image }) => {
  console.log(image);
  return <div className="Restaurantcard">
      {image && image.length ? <img src={image[0].url} alt='image' className='RestaurantImage' /> : <img src={photoDefault} alt='image' className='RestaurantImage' />}
    <h3>{name}</h3>
</div>;
};
export default OneRestaurant;
